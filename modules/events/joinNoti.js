module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`👉 ${global.config.PREFIX} 👈 💖 ${(!global.config.BOTNAME) ? "Bot Cre By SuHao" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`⫸ Kết nối thành công 99,9% ⫷
Bot by 【Văn Ťħuận】
●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●
 ▷ RULE BOT ◁
📱 Bot  online 24/24 nha
⬆️ Spam bot = Ban tạm thời
🔇 Hạn chế spam 🔞+...
🚫 Không biết dùng bot thì dùng /callad (tin nhắn) để liên hệ vs admin thanks❤️
💓 Thanks các bạn đã thuê bot của mình 💖<3
●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●
❛━━･❪ Prefix [ / ] ❫･━━❜
📲 Mọi thắc mắc liên hệ Admin!
⚡https://www.facebook.com/RqzaX040`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinMp4");
			const pathGif = join(path,`joinbox.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "🇻🇳 💗𝙃𝙚𝙡𝙡𝙤 𝙘𝙤𝙣 𝙫𝙤̛̣ {name}💗.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} 𝙘𝙪̉𝙖 𝙣𝙝𝙤́𝙢!. 𝙏𝙪̛𝙤̛𝙣𝙜 𝙩𝙖́𝙘 𝙣𝙝𝙞𝙚̂̀𝙪 𝙫𝙖̀𝙤 𝙣𝙝𝙖 𝙠𝙝𝙤̂𝙣𝙜 𝙡𝙖̀ 𝙖̆𝙣 𝙠𝙞𝙘𝙠 đ𝙖̂́𝙮 ♥" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
        }