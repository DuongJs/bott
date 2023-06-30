module.exports.config = {
    name: "tanlientuc",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "...",
    description: "Tag liên tục người bạn tag trong 5 lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "group",
    usages: "chuilientuc @mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage(" tang một người bạn muốn tán ", event.threadID);
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a(" này cậu ơi");
setTimeout(() => {a({body: "tớ muốn nói với cậu một điều cậu ghe ghe nhá thương cậu lắm♥️" + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "cho hỏi cậu đã có ai chưa nếu chưa thì để tớ chăm sóc cậu nhé♥️" + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "hy vọng cậu đồng ý tuy tớ k biết nói sao để nói hết tâm sự trong lòn nhưng tớ muốn ở bên cặu mỗi khi cậu buồn 🖤" + " " + name, mentions: arraytag})}, 7000);
setTimeout(() => {a({body: "liệu cậu có thể để tớ sánh bước cùng được không ạ♥️ tớ tớ muốn ở bên cậu lắm=))) " + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "nếu cậu cảm thấy mệt quá thì về bên tớ tớ sẵn lòng yêu thương cậu " + " " + name, mentions: arraytag})}, 12000);
setTimeout(() => {a({body: "cậu à tớ thương cậu lỡ yêu cậu mất rồi tớ không biết làm sao cả cậu chỉ tớ đk k🥺" + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: " tớ muốn yêu cậu và cùng cậu đi trên quãng đường phía trước=)))♥️" + " " + name, mentions: arraytag})}, 17000);
setTimeout(() => {a({body: "nắng kia có làm câu say hay là cậu say tớ đi say nắng mệt lắm say tớ nè tớ sẽ yêu thương cậu:33" + " " + name, mentions: arraytag})}, 20000);
setTimeout(() => {a({body: "pascal để viết phương trình còn tớ thì viết chuyện tình đôi ta♥️" + " " + name, mentions: arraytag})}, 23000);
setTimeout(() => {a({body: "cậu ghe tiếp nè sẽ không khiến cậu thất vọng đâu♥️" + " " + name, mentions: arraytag})}, 25000);
setTimeout(() => {a({body: "Gọi cậu là google bỏi vì cậu có tất cả những thứ tớ tìm kiếm♥️" + " " + name, mentions: arraytag})}, 28500);
setTimeout(() => {a({body: "tớ Biết yêu là ngu nhưng thôi kệ đúng gu là được🙄🥺" + " " + name, mentions: arraytag})}, 31000);
setTimeout(() => {a({body: "Xuân qua hạ tới thu tàn Đông rồi lạnh quá thì về dùm tớ♥️♥️" + " " + name, mentions: arraytag})}, 36000);
setTimeout(() => {a({body: "Gọi cậu là SuGAR còn tớ là CANDY Bởi vì ai cũng biết CANDY CRUSH SUGAR♥️♥️😗😘" + " " + name, mentions: arraytag})}, 39000);
setTimeout(() => {a({body: "Con bò thì thích cỏ Con chó thì thích xương Còn tớ thì đưa nhiên Thích có mỗi mình câu🥺🥺" + " " + name, mentions: arraytag})}, 40000);
setTimeout(() => {a({body: "Nếu tình yêu là vé số tớ mong chúng mình chúng số phu thê🙆‍♂️❤️" + " " + name, mentions: arraytag})}, 65000);
setTimeout(() => {a({body: "cuộc đời hàng ngàn cám dỗ cậu chỉ cần đến bên tớ tớ sẽ là bến đỗ cho cậu♥️" + " " + name, mentions: arraytag})}, 70000);
setTimeout(() => {a({body: "tớ làm cơn gió Cậu có thích k^^Bảy sắc cầu vòng Lm ny tớ nhé♥️" + " " + name, mentions: arraytag})}, 75000);
setTimeout(() => {a({body: "Nhìn xa tớ thấy lờ mờTưởng rằng say nắng ai ngờ say cậu♥️ " + " " + name, mentions: arraytag})}, 80000);
setTimeout(() => {a({body: "Thuốc phiện  còn có trại để cai chứ tớ yêu cậu thì chỉ có đầu thai mới hết thôi♥️" + " " + name, mentions: arraytag})}, 85000);
setTimeout(() => {a("Một nụ cười bằng 10 thang thuốc bổCòn câu cười sụp đổ con tym tôi♥️")} , 90000);
setTimeout(() => {a({body: "Cậu có mỗi chân không khi cứ lượn mãi trong tâm trí tớ" + " " + name, mentions: arraytag})}, 95000);
setTimeout(() => {a({body: "mình hứa sẽ yêu thương cậu như chính bản thân mình vậy :<" + " " + name, mentions: arraytag})}, 100000);
setTimeout(() => {a({body: "cậu làm ny tớ nhé tớ hứa sẽ bên cậu mà tớ k thất hứa đâu muốn bên cậu lắm =) " + " " + name, mentions: arraytag})}, 105000);
setTimeout(() => {a("cậu đcậu đồng ý làm người yêu tớ nhớ mãi yêu cậu♥️ yêu bae=^^")} , 110000);


  
}