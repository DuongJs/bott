module.exports.config = {

    name: "agribank",

    version: "2.0.5",

    hasPermssion: 0,

    credits: "MintDaL",

    description: "Dành cho người dùng",

    commandCategory: "Dành cho người dùng",

    usages: "",

    cooldowns: 5

};

 

 

module.exports.run = async function ({ api, event, args, Currencies, Users }) {

    const { senderID, messageID, threadID } = event;

    const axios = require('axios');

    const checkBank = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/check?ID=${senderID}`)).data   

    const { createReadStream } = require(`fs-extra`);

    switch(args[0]) {

        case 'register':

        case '-r':

        case 'r': {

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/register?senderID=${senderID}&name=${encodeURI((await Users.getData(senderID)).name)}`)).data

            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);

            api.sendMessage('Mật khẩu ngân hàng của bạn là: ' + res.message.password, senderID);

            return api.sendMessage(`=== [ ${res.message.noti} ] ===\n???? Chủ tài khoản: ${res.message.name}\n???? STK: ${res.message.STK}\n???? Số dư: ${res.message.money}\n???? Password: đã được gửi đến bạn vui lòng check tin nhắn riêng ( hoặc tn spam )`, threadID, messageID)

        }

        

         case "find":

        case "-f": {

            if (checkBank.status == false) api.sendMessage("Bạn chưa có tài khoản trên ngân hàng!", threadID, messageID)

            if (args[1] != "stk" && args[1] != "id") {

                api.sendMessage("Vui lòng chọn đúng kiểu dữ kiện (stk/id)", threadID, messageID)

            }

            let { data } = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/find?type=${args[1].toUpperCase()}&${args[1].toUpperCase()}=${args[2]}`))

            const name = data.message.name

            const stk = data.message.data.STK

            const soDu = data.message.data.money

            return api.sendMessage(`=== [ MB BANK ] ===\n???? Chủ tài khoản: ${name}\n???? STK: ${stk}\n???? Số dư: ${soDu}$`, threadID, messageID)

        }

      case 'info':

      case '-i':

      case 'check':

      case '-c': {

        var a = event.senderID;

        if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản ngân hàng!', threadID, messageID);

        const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/find?type=ID&ID=${a}`)).data  

          return api.sendMessage(`=== [ BANK KING ] ===\n???? Chủ tài khoản: ${res.message.name}\n???? STK: ${res.message.data.STK}\n???? Số dư: ${res.message.data.money}$`, threadID, messageID)

      }

        case 'get':

        case 'rút': {

            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản ngân hàng!', threadID, messageID);

            if(!args[1]) return api.sendMessage('Vui lòng nhập: get [số tiền]', threadID, messageID);

            api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);

            return api.sendMessage('Vui lòng reply tin nhắn này và nhập mật khẩu ngân hàng để rút tiền!', senderID, (error, info) => 

                global.client.handleReply.push({

                    name: this.config.name,

                    type: 'getMoney',

                    messageID: info.messageID,

                    author: event.senderID,

                    money: args[1],

                    threadID: threadID

                })

            );

        }

         case 'top':

         case '-t':{

            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên ngân hàng!', threadID, messageID);

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/top`)).data  

            if(res.status == false) return api.sendMessage('Hiện tại chưa có dữ liệu!', threadID, messageID);

            var msg = res.message + '\n'

            for (let i of res.ranking) {

                msg += `${i.rank}. ${i.name} \n» ???? Số dư: ${i.money}$\n===========\n`

            }

            return api.sendMessage(msg, threadID, messageID);

        }

        case 'pay':

        case '-p': {

            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản ngân hàng!', threadID, messageID);

            if(!args[1] || !args[2] || !args[3]) return api.sendMessage('Vui lòng nhập đúng kiểu dữ liệu: pay stk [stk người nhận] [số tiền]', threadID, messageID);

            if(args[1] == 'stk') {

                api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);

                return api.sendMessage('Vui lòng reply tin nhắn này và nhập mật khẩu ngân hàng để chuyển tiền!', senderID, (error, info) => 

                    global.client.handleReply.push({

                        name: this.config.name,

                        type: 'paySTK',

                        messageID: info.messageID,

                        author: event.senderID,

                        STK: args[2],

                        money: args[3],

                        threadID: threadID

                    })

                );

            }

            if(args[1] == 'id') {

                if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản ngân hàng!', threadID, messageID);

                api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);

                return api.sendMessage('Vui lòng reply tin nhắn này và nhập mật khẩu ngân hàng để chuyển tiền!', senderID, (error, info) => 

                    global.client.handleReply.push({

                        name: this.config.name,

                        type: 'payID',

                        messageID: info.messageID,

                        author: event.senderID,

                        ID: args[2],

                        money: args[3],

                        threadID: threadID

                    })

                );

            }

            break;

        }

        case 'send':

        case 'gửi':

        case 'nạp': {

            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản ngân hàng!', threadID, messageID);

            if(!args[1]) return api.sendMessage('Vui lòng nhập số tiền cần nạp vào!\nsend [số tiền cần nạp]', threadID, messageID);

            var check = await checkMoney(senderID, args[1])

            if (check == false) return api.sendMessage('Tiền đâu mà nạp vô đây?', threadID, messageID);

            await Currencies.decreaseMoney(senderID, parseInt(args[1]))

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/send?senderID=${senderID}&money=${args[1]}`)).data  

            return api.sendMessage(`${res.message.noti}\n???? Chủ tài khoản: ${res.message.name}\n???? Số dư hiện tại: ${res.message.money}$`, threadID, messageID)

            break;

    }

        case 'password':

        case 'pw': {

            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản AGRIBANK!', threadID, messageID);

            var type = args[1];

            switch(type) {

                case 'get': {

                    const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/password?bka=${type}&dka=${senderID}`)).data 

                    api.sendMessage('Mật khẩu của bạn được gửi đến tin nhắn chờ', threadID, messageID);

                    return api.sendMessage(`Mật khẩu của bạn là: ${res.message.password}`, senderID);

                }

                case 'recovery':

                case 'new': {

                    api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);

                    return api.sendMessage('Vui lòng reply tin nhắn này để nhập mật khẩu mới!', senderID, (error, info) => 

                        global.client.handleReply.push({

                            name: this.config.name,

                            type: 'newPassword',

                            messageID: info.messageID,

                            author: event.senderID,

                            threadID: threadID

                        })

                    );

                }

                default: {

                    return api.sendMessage("Vui lòng sử dụng get (để lấy mật khẩu) hoặc new (để nhập mật khẩu mới)", threadID, messageID);

                }

            }

        }

        default: {

         const picture = (await axios.get(`https://i.imgur.com/5hkQ2CC.jpg`, { responseType: "stream"})).data

                           

        return api.sendMessage({body: "=== 「 AGRIBANK 」 ===\n--------\n» register » để đăng kí \n» info » để xem thông tin tài khoản bản thân\n» find » để tìm tài khoản ngân hàng \n» get » để rút tiền \n» top » để xem top người dùng \n» pay » để chuyển tiền \n» send » nạp tiền vào tài khoản \n» pw » lấy lại pass hoặc đổi password tài khoản ngân hàng của bạn\n---------",attachment: (picture)

     

    }, threadID, messageID);

        }

    }

async function checkMoney(senderID, maxMoney) {

    var i, w;

    i = (await Currencies.getData(senderID)) || {};

    w = i.money || 0

    if (w < parseInt(maxMoney)) return false;

    else return true;

  }

}

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {

    const axios = require('axios')

    const { senderID, messageID, threadID , body } = event;

    switch(handleReply.type) {

        case 'paySTK': {

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/pay?type=STK&senderID=${senderID}&STK=${handleReply.STK}&money=${handleReply.money}&password=${body}`)).data 

            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);

            api.sendMessage(`${res.message.noti}\n${res.message.data.message}`, threadID, messageID);

            return api.sendMessage(`${res.message.noti}\n\n${res.message.data.message}`, handleReply.threadID);

        }

        case 'payID': {

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/pay?type=ID&senderID=${senderID}&userID=${handleReply.ID}&money=${handleReply.money}&password=${body}`)).data 

            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);

            api.sendMessage(`${res.message.noti} ${res.message.data.message}`, threadID, messageID);

            return api.sendMessage(`${res.message.noti}\n\n${res.message.data.message}`, handleReply.threadID);

        }

        case 'getMoney': {

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/get?ID=${senderID}&money=${handleReply.money}&password=${body}`)).data  

            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);

            await Currencies.increaseMoney(senderID, parseInt(handleReply.money))

            api.sendMessage(`${res.message.noti}\n???? Chủ tài khoản: ${res.message.name}\n???? Số dư còn lại: ${res.message.money}`, threadID, messageID);

            return api.sendMessage(`${res.message.noti}\n???? Chủ tài khoản: ${res.message.name}\n???? Số dư còn lại: ${res.message.money}`, handleReply.threadID);

        }

        case 'newPassword': {

            const res = (await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/bank/password?bka=recovery&dka=${senderID}&fka=${body}`)).data  

            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);

            api.sendMessage(`${res.message.noti}\n???? Chủ tài khoản: ${res.message.name}`, handleReply.threadID);

            return api.sendMessage(`Thay đổi mật khẩu thành công!\nMật khẩu hiện tại: ${res.message.password}`, threadID, messageID)

        }

    }

                            }
