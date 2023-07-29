this.config = {
    name: 'addcmt',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: 'm',
    commandCategory: 'Tiện ích',
    usages: '[link post]',
    cooldowns: 3
}

let axios = require('axios');

let getComment = url=>axios.get('https://duongkum999.codes/fb/info_post?clude=display_comments.0&url='+url).then(res=>res.data.display_comments.edges.map($=>({
    author: $?.node?.author || {}, body: $?.node?.body?.text || '',
}))).catch(()=>false);

this.run = async(o)=> {
    let tid = o.event.threadID;
    let add = id=>new Promise((resolve, reject)=>o.api.addUserToGroup(id, tid, err=>err?reject(err): resolve(true)));
    let send = msg=>o.api.sendMessage(msg, tid, o.event.messageID);
    let url = o.args[0]; if (!url)return send(`Chưa nhập liên kết bài đăng.`);
    let ppID = o.event.participantIDs;
    let comment = await getComment(url);

    if (!comment)return send(`Không thể lấy thông tin bình luận bài viết.`);

    let filterComment = comment.filter($=>!!$ && !ppID.includes($.author.id));
    let allUID = filterComment.map($=>$.author.id);

    if (filterComment.length > 0)add(allUID).then(()=>send(`Thêm thành công ${filterComment.length}/${comment.length} người dùng!`)).catch(async err=> {
        if (allUID.length == 1)return send(err.errorDescription);

        let successCount = 0;
        for (let id of allUID)try {
            await new Promise(resolve=>setTimeout(resolve, 1000*5));
            await add(id);
            ++successCount;
        } catch (e) {
            continue;
        };

        send(`Thêm thành công ${successCount}/${comment.length} người dùng vào nhóm`);
    });
};