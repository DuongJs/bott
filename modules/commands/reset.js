module.exports.config = {
	name: "reset",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Khánh Milo",
	description: "Khởi động lại bot",
	commandCategory: "admin",
	cooldowns: 5,
	dependencies: {
		"eval": ""
	}
};

module.exports.run = async ({ api, event, args, client, utils }) => {
    const eval = require("eval");
    const permission = ["100035731083424"];                  
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
    return api.sendMessage("Đợi t đi ĩa tý quay lại :3", event.threadID, () => eval("module.exports = process.exit(1)", true), event.messageID);

   }
