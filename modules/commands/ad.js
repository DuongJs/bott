module.exports.config = {
  name: "ad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "Kiểm tra thông tin admin bot.",
  commandCategory: "Thông tin adminbot",
  usages: "adm",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
  "https://i.imgur.com/3gdw4mg.jpg"
  ];
  var callback = () => api.sendMessage({body:`★ Admin BOT ★
 🐧Tên: Võ Văn Ťħuận\n🎂Ngày sinh: 27/06/2004\n😎Chiều cao x cân nặng: 1m7 x 49kg\n💒Quê quán: Bình Định\n🏢Nơi sống: Bình Định\n📢Sở thích: Ngắm gái, chơi game,...\n😶‍🌫️Tính cách: bth`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };
