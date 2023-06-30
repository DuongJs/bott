var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    module.exports.config = {
        name: "playgirl",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "Trankhuong",
        description: "Chơi gái",
        commandCategory: "Games",
        usages: "",
        cooldowns: 5
    };

    module.exports.onLoad = async function () {
        if (!existsSync(__dirname + '/cache/vang.jpg')) {
            request('https://i.imgur.com/McBY0Gn.jpg').pipe(createWriteStream(__dirname + '/cache/vang.jpg'));
        }
        if (!existsSync(__dirname + '/cache/xanh.jpg')) {
            request('https://i.imgur.com/6sYnSaW.jpg').pipe(createWriteStream(__dirname + '/cache/xanh.jpg'));
        }
        if (!existsSync(__dirname + '/cache/do.jpg')) {
            request('https://i.imgur.com/wyaldcd.jpg').pipe(createWriteStream(__dirname + '/cache/do.jpg'));
        }
        if (!existsSync(__dirname + '/cache/hong.jpg')) {
            request('https://i.imgur.com/UFBdiAx.jpg').pipe(createWriteStream(__dirname + '/cache/hong.jpg'));
        }
        if (!existsSync(__dirname + '/cache/trang.jpg')) {
            request('https://i.imgur.com/N3ZjMlY.jpg').pipe(createWriteStream(__dirname + '/cache/trang.jpg'));
        }
        if (!existsSync(__dirname + '/cache/den.jpg')) {
            request('https://i.imgur.com/dIEaX5W.jpg').pipe(createWriteStream(__dirname + '/cache/den.jpg'));
        }
        if (!existsSync(__dirname + '/cache/playgirl.gif')) {
            request('https://i.imgur.com/b8mAQik.gif').pipe(createWriteStream(__dirname + '/cache/playgirl.gif'));
        }
    };

    async function get(one,two,three) {
        var x1;
            switch (one) {
                case "vang": x1 = "💛";
                    break;
                case "xanh": x1 = '💙';
                    break;
                case "do": x1 = '❤️';
                    break;
                case "hong": x1 = '💗';
                    break;
                case "trang": x1 = '🤍';
                    break;
                case "den":x1 = '🖤';
            }
        var x2;
            switch (two) {
                case "vang": x2 = "💛";
                    break;
                case "xanh": x2 = '💙';
                    break;
                case "do": x2 = '❤️';
                    break;
                case "hong": x2 = '💗';
                    break;
                case "trang": x2 = '🤍';
                    break;
                case "den": x2 = '🖤';
            }
        var x3;
            switch (three) {
                case "vang": x3 = "💛";
                    break;
                case "xanh": x3 = '💙';
                    break;
                case "do": x3 = '❤️';
                    break;
                case "hong": x3 = '💗';
                    break;
                case "trang": x3 = '🤍';
                    break;
                case "den":x3 = '🖤';
            }
        var all = [x1, x2, x3];
    return full = all;
    }
var full = [];
    module.exports.run = async function({ api, event, args, Currencies }) { var out = (msg) => api.sendMessage(msg,event.threadID, event.messageID);
        const slotItems = ["vang", "xanh", "do", "hong", "trang", "den"];
            const moneyUser = (await Currencies.getData(event.senderID)).money;
                var moneyBet = parseInt(args[1]);
                    if (!args[0] || !isNaN(args[0])) return api.sendMessage("====== Game Playgirl ======\n\n~playgirl vàng or xanh • đỏ • hồng • trắng • đen & Số tiền muốn play!\n\n• 💛 • 💙 • ❤️ • 💗 • 🤍 • 🖤 •",event.threadID, event.messageID);
                    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("💵 Bạn chưa nhập số tiền muốn playgirl!", event.threadID, event.messageID);
                if (moneyBet > moneyUser) return api.sendMessage("💸 Bạn nghèo mà cũng play girl à!", event.threadID, event.messageID);
            if (moneyBet < 1000) return api.sendMessage("💵 Số tiền playgirl phải trên 1000.Vnđ!", event.threadID, event.messageID);
        var number = [], win = false;
    for (let i = 0; i < 3; i++) number[i] = slotItems[Math.floor(Math.random() * slotItems.length)];
        var itemm;
            var icon;
                switch (args[0]) {
                    case "đỏ":
                        case "Đỏ": itemm = "do";
                                icon = '❤️';
                            break;
                    case "hồng": 
                        case "Hồng": itemm = "hong";
                                icon = '💗';
                            break;
                    case "trắng":
                        case "Trắng": itemm = "trang";
                                icon = '🤍';
                            break;
                    case "đen":
                        case "Đen": itemm = "den";
                                icon = '🖤';
                            break;
                    case "vàng": 
                        case "Vàng": itemm = "vang";
                                icon = '💛';
                            break;
                    case "xanh":
                        case "Xanh": itemm = "xanh";
                                icon = '💙';
                            break;
                                default: return api.sendMessage("====== Game Playgirl ======\n\n~playgirl vàng or xanh • đỏ • hồng • trắng • đen & Số tiền muốn play!\n\n• 💛 • 💙 • ❤️ • 💗 • 🤍 • 🖤 •",event.threadID, event.messageID);
                }      
                await get(number[0],number[1],number[2]);
            api.sendMessage({body:"🌺 Đang tìm girl cho bạn play!",attachment: createReadStream(__dirname + "/cache/playgirl.gif")},event.threadID,async (error,info) => {
                await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                    api.unsendMessage(info.messageID);
                          await new Promise(resolve => setTimeout(resolve, 100));
    var array = [number[0],number[1],number[2]];
        var listimg = [];
           for (let string of array) {
               listimg.push(createReadStream(__dirname + `/cache/${string}.jpg`));
           }
        if (array.includes(itemm)) {
            var i = 0;
                if (array[0] == itemm) i+=1;
                    if (array[1] == itemm) i+=1;
                if (array[2] == itemm) i+=1;
            if (i == 1) {
                var mon = parseInt(args[1]) + 300;  
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s1")
                        return api.sendMessage({body:`😋 Bạn vừa play girl: ${full.join("•")}\n🥵 Bạn làm cho em ấy sung sướng được em ấy bo thêm ${mon}.Vnđ`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 2) {
                var mon = parseInt(args[1]) * 2; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s2")
                        return api.sendMessage({body:`😋 Bạn vừa play girl: ${full.join("•")}\n🥵 Bạn làm cho em ấy sung sướng được em ấy bo thêm ${mon}.Vnđ`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 3) {
                var mon = parseInt(args[1]) * 3; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log('s3')
                        return api.sendMessage({body:`😋 Bạn vừa play girl: ${full.join("•")}\n🥵 Bạn làm cho em ấy sung sướng được em ấy bo thêm ${mon}.Vnđ`,attachment: listimg},event.threadID, event.messageID);
            }
            else return api.sendMessage("⚡ Đã sảy ra lỗi thử lại sau!",event.threadID,event.messageID);
        } else  {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1])); console.log('s4')
            return api.sendMessage({body:`😋 Bạn vừa play girl: ${full.join("•")}\n😥 Bạn vì quá sung nên đã làm cho em ấy có bầu bạn phải bồi thường ${args[1]}.Vnđ!`,attachment: listimg},event.threadID, event.messageID);
        }
            } ,event.messageID);
    };
