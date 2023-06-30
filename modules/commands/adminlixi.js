    module.exports.config = {
    name: "adminlixi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Horizon Lucius Synthesis I",
    description: "Lì Xì Say Xe =))",
    commandCategory: "Economy",
    usages: "",
    cooldowns: 5
    };
    var array = [];
    module.exports.run = async function ({ api,event,Users,Currencies,args }) {
    var x = global.data.allCurrenciesID;var out = (msg) => api.sendMessage(msg,event.threadID,event.messageID);
        let ix = ["5000","100000","105000","16000","100000","1000000","100000","1000270","1447475","15810232","19824751","99145117","1515454105","1581818481","151819818","151815485","1423153115","854826848","815814824184","4151845251","54418505"];
            let rxx = ix[Math.floor(Math.random() * ix.length)]; 
                let rxxi = global.data.allThreadID;var xs = false;
                    var mention = Object.keys(event.mentions);
                    switch (args[0]) {
                        case 'all': {
                            if (xs == true) return out("Lì xì r");
                            for (let ex of x) {
                                await Currencies.increaseMoney(ex, parseInt(rxx));
                                    array.push(ex);
                            }
                            for (let exs of rxxi) {
                                api.sendMessage(`Thông Báo\n: Nhóm Bạn Đã Được Admin Lì Xì trc năm mới vì hôm nay admin vui chúc mọi ng zui zẻ !\n Bấm ${global.config.PREFIX}money để kiểm tra số tiền hiện có nhé`,exs,(error,info) => {
                                    if (error) return;
                                });
                            }
                                xs = true;
                            return api.sendMessage("Thành Công !",event.threadID);
                        }
                            break;
                        case "user": {
                            if (xs == true) return out("Lì xì r");if(array.includes(args[1])) return out("NG Này Được Lì Xì Rồi !");array.push(args[1]);
                            if (isNaN(args[1])) return api.sendMessage("Vui Lòng Nhập ID Người Dùng !",event.threadID,event.messageID);
                                await Currencies.increaseMoney(parseInt(args[1]), parseInt(rxx));
                                    out("Đã Lì Xì Thành Công !");
                                        return api.sendMessage("ê m được lì xì kìa , chúc m may mắn nhé =)), số tiền m nhận được là : " +  rxx,parseInt(args[1]));
                        }
                            break;
                        case "thread": {
                            if (isNaN(args[1])) return api.sendMessage("Vui Lòng Nhập ID Nhóm !",event.threadID,event.messageID);
                                var xl = await api.getThreadInfo(args[1]);
                                    var sll = xl.participantIDs;var outlix = [];
                                        for (let cham of sll) {
                                                if(array.includes(cham)) return outlix.push(cham);
                                            await Currencies.increaseMoney(cham, parseInt(rxx)); 
                                        }
                                    out("Thành Công !, Số Người Ko Được Lì Xì Lần 2 Là : " + outlix.join(", "));
                                return api.sendMessage("Ê Nhóm M All Thành Viên Được Lì Xì Kìa =))",parseInt(args[1]));
                        }   
                            break;  
                        case  `${mention[0]}`: {    
                            if (isNaN(mention[0])) return out("Tag Sai R Kìa =))");array.push(mention[0]);
                            if(array.includes(mention[0])) return out("NG Này Được Lì Xì Rồi !");
                                else await Currencies.increaseMoney(mention[0], parseInt(rxx)); 
                                    return out ("UwU " + event.mentions[mention].replace("@", "") + " Bạn Đã Được Lì Xì Kìa 🐧, số tiền là :  " + rxx);
                        }
                    break;
                default: {
                        if(array.includes(event.senderID)) return out("Bạn Này Được Lì Xì Rồi !");array.push(event.senderID);
                    await Currencies.increaseMoney(event.senderID, parseInt(rxx)); 
                return out("====[ Success ]====\nNhận Lì Xì Thành Công !, số tiền là : " + rxx);
            }
        }
    };