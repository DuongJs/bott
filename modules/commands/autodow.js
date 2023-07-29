let axios = require('axios');
let fs = require('fs');

let isURL = u=>/^http(|s):\/\//.test(u);

this.handleEvent = async function(o) {
    try {
        let str = o.event.body;
        let send = msg=>o.api.sendMessage(msg, o.event.threadID);
        let head = app=>`<--| ${app.toUpperCase()} - TỰ ĐỘNG TẢI |-->\n\n`;

        if (isURL(str)) {
           
            if (/fb|facebook/.test(str))infoPostFb(str).then(async json=> {
                json.attachment = json.attachment.filter($=>!!$);
                let body = `${head('facebook')}- Tiêu Đề: ${json.message}`;
                let fil = type=>json.attachment.filter($=>$.__typename == type);
                let photo = fil('Photo');
                let video = fil('Video');

                let attachment = [];
                for (let i of photo)try {
                    let img = i.photo_image || i.image || {};
                    attachment.push(await streamURL(img.uri || img.uri, 'jpg'));
                }catch {
                    continue;
                };
                if (attachment.length > 0)await send({
                    body, attachment,
                });

                for (let i of video)try {
                    send({
                        body, attachment: await streamURL(i.playable_url_quality_hd || i.playable_url, 'mp4'),
                    });
                }catch {
                    continue;
                };
            });

           
            else if (/tiktok/.test(str))infoPostTT(str).then(async json=>send({
                body: `${head('tiktok')}- Tiêu Đề: ${json.title}`, attachment: await streamURL(json.play, 'mp4'),
            }));
        };
    }catch(e) {
        console.log('Error', e)};
};
this.run = ()=> {}; this.config = {
    name: 'autodown',
    version: '1',
    hasPermssion: 0,
    credits: 'Công Nam',
    description: 'z',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 3
};


function streamURL(url, type) {
    return axios.get(url, {
        responseType: 'arraybuffer',
    }).then(res=> {
        let path = __dirname+`/cache/${Date.now()}.${type}`;

        fs.writeFileSync(path, res.data);
        setTimeout(p=>fs.unlinkSync(p), 1000*60, path);
        return fs.createReadStream(path);
    });
};

function infoPostTT(url) {
    return axios({
        method: 'post',
        url: `https://tikwm.com/api/`,
        data: {
            url,
        },
        headers: {
            'content-type': 'application/json',
        },
    }).then(res=>res.data.data);
};

function infoPostFb(url) {
    return axios.get(`https://duongkum999.codes/fb/info-post?url=${url}`).then(res=>res.data);
};