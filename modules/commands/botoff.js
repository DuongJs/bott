module.exports.config = {
	name: "botoff",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "Tắt Bot.",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("done",event.threadID, () =>process.exit(0))