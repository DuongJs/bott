exports.config = {
  name: 'exec',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Run command shell',
  commandCategory: 'Hệ Thống',
  usages: '[command]',
  cooldowns: 3
};
exports.run = function(o) {
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
  let cmd = o.args.join(' ');

  require('child_process').exec(cmd, (err, stdout)=>send(stdout || err.toString()));
};