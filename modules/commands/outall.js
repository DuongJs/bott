module.exports.config = {
  name: "outall",
  version: "1.0.0", 
  hasPermssion: 3,
  credits: "Mirai",
  description: "out all box",
  commandCategory: "Hệ thống admin-bot",
  usages: "outall [Text]",
  cooldowns: 5,
};
module.exports.run = async ({ api, event, args }) => {
  return api.getThreadList(100, null, ["INBOX"], (err, list) => {
    if (err) throw err;
    list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
      api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
    api.sendMessage(' ᴆᴀ̃ ᴏᴜᴛ ᴀʟʟ ʙᴏx ᴛʜᴀ̀ɴʜ ᴄᴏ̂ɴɢ', event.threadID);
  });
}
