const assets = require('@miraipr0ject/assets'),
	moment = require("moment-timezone"),
        mimeDB = require("mime-db"),
	crypto = require('crypto'),
	os = require("os") 
	axios = require('axios'), 
        fs = require('fs-extra'), 
	qs = require("qs");

function removeHomeDir(fullPath) {
	if (!fullPath || typeof fullPath !== "string")
		throw new Error('The first argument (fullPath) must be a string');
	while (fullPath.includes(process.cwd()))
		fullPath = fullPath.replace(process.cwd(), "");
	return fullPath;
}

function getPrefix(threadID) {
	if (!threadID || isNaN(threadID))
		throw new Error('The first argument (threadID) must be a number');
	threadID = String(threadID);
	let prefix = global.config.PREFIX;
	let p = (global.data.threadData.get(threadID) || {})
	if (p)
		prefix = p.PREFIX || prefix;
	return prefix;
}

function getTime(timestamps, format) {
	if (!format && typeof timestamps == 'string') {
		format = timestamps;
		timestamps = undefined;
	}
	return moment(timestamps).tz("Asia/Ho_Chi_Minh").format(format);
}

function getExtFromUrl(url = "") {
	if (!url || typeof url !== "string")
		throw new Error('The first argument (url) must be a string');
	const reg = /(?<=https:\/\/cdn.fbsbx.com\/v\/.*?\/|https:\/\/video.xx.fbcdn.net\/v\/.*?\/|https:\/\/scontent.xx.fbcdn.net\/v\/.*?\/).*?(\/|\?)/g;
	const fileName = url.match(reg)[0].slice(0, -1);
	return fileName.slice(fileName.lastIndexOf(".") + 1);
}

async function getStreamsFromAttachment(attachments) {
	const streams = [];
	for (const attachment of attachments) {
		const url = attachment.url;
		const ext = utils.getExtFromUrl(url);
		const fileName = `${Date.now()}.${ext}`;
		streams.push({
			pending: axios({
				url,
				method: "GET",
				responseType: "stream"
			}),
			fileName
		});
	}
	for (let i = 0; i < streams.length; i++) {
		const stream = await streams[i].pending;
		stream.data.path = streams[i].fileName;
		streams[i] = stream.data;
	}
	return streams;
}

async function getStreamFromURL(url = "", pathName = "", options = {}) {
	if (!options && typeof pathName === "object") {
		options = pathName;
		pathName = "";
	}
	try {
		if (!url || typeof url !== "string")
			throw new Error(`The first argument (url) must be a string`);
		const response = await axios({
			url,
			method: "GET",
			responseType: "stream",
			...options
		});
		if (!pathName)
			pathName = Date.now() + (response.headers["content-type"] ? '.' + utils.getExtFromMimeType(response.headers["content-type"]) : ".noext");
		response.data.path = pathName;
		return response.data;
	}
	catch (err) {
		throw err;
	}
}

function getExtFromMimeType(mimeType = "") {
	return mimeDB[mimeType] ? (mimeDB[mimeType].extensions || [])[0] || "unknow" : "unknow";
}

function getAvatar(uid) {
    return `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
}

async function downloadFile(url, path) {
	const { createWriteStream } = require('fs-extra');
	const axios = require('axios');
	const response = await axios({
		method: 'GET',
		responseType: 'stream',
		url
	});

	const writer = createWriteStream(path);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

function throwError(command, threadID, messageID) {
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	return global.client.api.sendMessage(global.getText("utils", "throwError", ((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX), command), threadID, messageID);
}

async function findUid(link) {
	const response = await axios.post("https://id.traodoisub.com/api.php", qs.stringify({ link }));
	const uid = response.data.id;
	if (!uid) {
		const err = new Error(response.data.error);
		for (const key in response.data)
			err[key] = response.data[key];
		if (err.error == "Vui lòng thao tác chậm lại") {
			err.name = "SlowDown";
			err.error = "Please wait a few seconds";
		}
		else if (err.error == "Vui lòng nhập đúng link facebook") {
			err.name = "InvalidLink";
			err.error = "Please enter the correct facebook link";
		}
		else if (err.error == "Không thể lấy được dữ liệu vui lòng báo admin!!!") {
			err.name = "CannotGetData";
			err.error = "Unable to get data, please report to admin!!!";
		}
		else if (err.error == "Link không tồn tại hoặc chưa để chế độ công khai!") {
			err.name = "LinkNotExist";
			err.error = "Link does not exist or is not set to public!";
		}
		throw err;
	}
	return uid;
}

async function shortenURL(url) {
	try {
		const result = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
		return result.data;
	}
	catch (err) {
		let error;
		if (err.response) {
			error = new Error();
			Object.assign(error, err.response.data);
		}
		else
			error = new Error(err.message);
	}
}

function cleanAnilistHTML(text) {
	text = text
		.replace('<br>', '\n')
		.replace(/<\/?(i|em)>/g, '*')
		.replace(/<\/?b>/g, '**')
		.replace(/~!|!~/g, '||')
		.replace("&amp;", "&")
		.replace("&lt;", "<")
		.replace("&gt;", ">")
		.replace("&quot;", '"')
		.replace("&#039;", "'");
	return text;
}

async function getContent(url) {
	try {
		const axios = require("axios");
		const response = await axios({
			method: 'GET',
			url
		});
		const data = response;
		return data;
	} catch (e) { return console.log(e); };
}

function randomString(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length || 5;
	for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

function homeDir() {
	var returnHome, typeSystem;
	const home = process.env["HOME"];
	const user = process.env["LOGNAME"] || process.env["USER"] || process.env["LNAME"] || process.env["USERNAME"];

	switch (process.platform) {
		case "win32": {
			returnHome = process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
			typeSystem = "win32"
			break;
		}
		case "darwin": {
			returnHome = home || (user ? '/Users/' + user : null);
			typeSystem = "darwin";
			break;
		}
		case "linux": {
			returnHome =  home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
			typeSystem = "linux"
			break;
		}
		default: {
			returnHome = home || null;
			typeSystem = "unknow"
			break;
		}
	}

	return [typeof os.homedir === 'function' ? os.homedir() : returnHome, typeSystem];
}

function convertTime(miliSeconds, replaceSeconds = "s", replaceMinutes = "m", replaceHours = "h", replaceDays = "d", replaceMonths = "M", replaceYears = "y", notShowZero = false) {
	if (typeof replaceSeconds == 'boolean') {
		notShowZero = replaceSeconds;
		replaceSeconds = "s";
	}
	const second = Math.floor(miliSeconds / 1000 % 60);
	const minute = Math.floor(miliSeconds / 1000 / 60 % 60);
	const hour = Math.floor(miliSeconds / 1000 / 60 / 60 % 24);
	const day = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 % 30);
	const month = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 % 12);
	const year = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 / 12);
	let formattedDate = '';

	const dateParts = [
		{ value: year, replace: replaceYears },
		{ value: month, replace: replaceMonths },
		{ value: day, replace: replaceDays },
		{ value: hour, replace: replaceHours },
		{ value: minute, replace: replaceMinutes },
		{ value: second, replace: replaceSeconds }
	];

	for (let i = 0; i < dateParts.length; i++) {
		const datePart = dateParts[i];
		if (datePart.value)
			formattedDate += datePart.value + datePart.replace;
		else if (formattedDate != '')
			formattedDate += '00' + datePart.replace;
		else if (i == dateParts.length - 1)
			formattedDate += '0' + datePart.replace;
	}

	if (formattedDate == '')
		formattedDate = '0' + replaceSeconds;

	if (notShowZero)
		formattedDate = formattedDate.replace(/00\w+/g, '');

	return formattedDate;
}
//-------------------//
module.exports = {
  getStreamFromURL, 
  getStreamsFromAttachment, 
  getExtFromUrl, 
  getTime, 
  getExtFromMimeType,
  getPrefix,  
  removeHomeDir, 
  convertTime, 
  getAvatar, 
  downloadFile, 
  throwError, 
  findUid, 
  shortenURL, 
  cleanAnilistHTML, 
  getContent, 
  randomString, 
  homeDir
}

module.exports.assets = {
	async font (name) {
		if (!assets.font.loaded) await assets.font.load();
		return assets.font.get(name);
	},
	async image (name) {
		if (!assets.image.loaded) await assets.image.load();
		return assets.image.get(name);
	},
	async data (name) {
		if (!assets.data.loaded) await assets.data.load();
		return assets.data.get(name);
	}
}

module.exports.AES = {
	encrypt (cryptKey, crpytIv, plainData) {
		var encipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(crpytIv));
        var encrypted = encipher.update(plainData);
		encrypted = Buffer.concat([encrypted, encipher.final()]);
		return encrypted.toString('hex');
	},
	decrypt (cryptKey, cryptIv, encrypted) {
		encrypted = Buffer.from(encrypted, "hex");
		var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(cryptIv, 'binary'));
		var decrypted = decipher.update(encrypted);
	
		decrypted = Buffer.concat([decrypted, decipher.final()]);
	
		return String(decrypted);
	},
	makeIv () { return Buffer.from(crypto.randomBytes(16)).toString('hex').slice(0, 16); }
}
