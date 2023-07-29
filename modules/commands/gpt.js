<!--
@Author  DC-Nam
*-->


<!DOCTYPE html >
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>📝 - Er7QH - gpt.js</title>
    <script src="//nams.live/sf/js/PrismJS@1.29.0.js" type="text/javascript" charset="utf-8"></script>
    <style type="text/css" media="all">
        body {
            height: 100vh;
            background: linear-gradient(65deg, #577fa3, #86a8d4, #b5dde9);
        }

        .infos {
            display: flex;
            margin-top: 2em;
            justify-content: space-between;
        }

        .infos button,
        .infos select {
            position: relative;
            display: inline-block;
            padding: 5px 10px;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            color: #fff;
            background-color: #4caf50;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 5px;
        }

        button {
            transition: all .3s ease;
        }

        button:before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }

        button:hover:before {
            left: 0;
        }

        button:active {
            transform: translateY(2px);
        }

        #noti {
            position: absolute;
            max-width: 70%;
            top: -100px;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
            padding: 10px 20px;
            background-color: #4caf50;
            color: #fff;
            border-radius: 5px;
            opacity: 0;
            pointer-events: none;
            transition: top .4s, opacity .4s;
            box-shadow: 0 4px 6px rgba(255, 0, 0, 0.1);
            word-wrap: break-word;
            z-index: 999;
        }

        #noti.show {
            top: 15px;
            opacity: 1;
            pointer-events: auto;
        }

        .view-code {
            margin-top: 5px;
            height: 85vh;
            overflow-y: scroll;
            padding: 3.3px;
            border-radius: 10px;
            background-color: #282C34;
        }

        pre {
            display: flex;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
        }

        .lines {
            color: #00D9FF;
            position: relative;
            padding: .3em;
            font-size: 10px;
            line-height: 1.5em;
            text-align: right;
            border-right: 1px solid #333;
        }


        code {
            color: #ffffff;
            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            overflow-x: auto;
            overflow-y: visible;
            padding: .3em;
            font-size: 10px;
            line-height: 1.5em;

        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
            color: #FF000B;
        }

        .token.punctuation {
            color: #999;
        }

        .token.namespace {
            opacity: 0.7;
        }

        .token.property {
            color: #E3FFC4;
        }

        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
            color: #FFA700;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
            color: #FFFE00;
        }

        .token.operator {
            color: #FF5AA2;
        }

        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
            color: #9a6e3a;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
            color: #FF5B00;
        }

        .token.function {
            color: #47D1FF;
        }

        .token.regex {
            color: #FF00D9;
        }

        .token.important,
        .token.variable {
            color: #e90;
        }

        .token.regex-delimiter {
            color: #DD4A68;
        }

        .token.important,
        .token.bold {
            font-weight: bold;
        }

        .token.italic {
            font-style: italic;
        }
    </style>
</head>
<body>
    <div id="noti">
    </div>
    <div class="infos">
        <div class="tools">
            <button onclick="copy_code()">copy</button><select id="language-code">
                <option value="">Language</option>
                <option value="language-javascript">JavaScript</option>
                <option value="language-html">HTML</option>
            </select>
        </div>
    </div>
    <div class="view-code">
        <pre>
            <div class="lines"></div>
            <code id="code" class="language-javascript">let axios = require(&#39;axios&#39;);
let fs = require(&#39;fs&#39;);

let suffix = &#39;?&#39;; // tương tự prefix nhưng có suffix cuối văn bản mới chạy noprefix.
let getToken = tex=&gt;tex.split(/&quot;/).find($=&gt;/^eyJ/.test($));
let getContent = tex=&gt;tex.split(/data\: /).filter($=&gt;/^\{&quot;i/.test($)).map($=&gt;$ = JSON.parse($.replace(/\n\n$/, &#39;&#39;))).map($=&gt;$.choices[0].delta.content || &#39;&#39;).join(&#39;&#39;);
let ask = (o, b, uri = encodeURIComponent(b))=&gt;axios.get(`https://gptgo.ai/?q=${uri}&amp;hl=vi&amp;hlgpt=vi#gsc.tab=0&amp;gsc.q=${uri}&amp;gsc.page=1`).then(res=&gt;axios.get(`https://gptgo.ai/action_ai_gpt.php?token=${getToken(res.data)}`).then(res=&gt;o.api.sendMessage(getContent(res.data), o.event.threadID, o.event.messageID))).catch(console.log);
let path = __dirname+&#39;/cache/status_gptgo.json&#39;;
let data = {};
let save = ()=&gt;fs.writeFileSync(path, JSON.stringify(data));
if (!fs.existsSync(path))save(); else data = require(path);

this.run = (o, t = o.event.threadID, s = data[t])=&gt;!o.args[0]?(data[t]=!!s?false: true, save(), o.api.sendMessage(`Đã ${s?&#39;tắt&#39;: &#39;bật&#39;} chat GPT (chỉ rep tin nhắn kết thúc bằng ký tự &quot; ? &quot;)`, t)): ask(o, o.event.args.slice(1).join(&#39; &#39;));
this.handleEvent = (o, b = o.event.body, suffixRegEx = RegExp(`\\${suffix}\$`), t = o.event.threadID)=&gt;(suffixRegEx.test(b)&amp;&amp;!!data[t]&amp;&amp;o.event.senderID!=o.api.getCurrentUserID())?ask(o, b.replace(suffixRegEx, &#39;&#39;)): &#39;&#39;;
this.config = {
  name: &#39;gpt&#39;,
  version: &#39;1.1.1&#39;,
  hasPermssion: 0,
  credits: &#39;DC-Nam&#39;,
  description: &#39;chat với GPT&#39;,
  commandCategory: &#39;AI&#39;,
  usages: &#39;[]&#39;,
  cooldowns: 3
};</code>
        </pre>
    </div>
</body>
<script type="text/javascript" charset="utf-8">
    /*
@Author  DC-Nam
*/
    let url = location.toString();
    let update_lines = ()=>document.querySelector('code').innerHTML.split('\n').forEach(($, i)=>document.querySelector('.lines').innerHTML += i+1+'<br>');
    let noti = msg=>(el = document.querySelector('#noti'), el.innerText = msg, class_add = 'show', el.classList.add(class_add), x = window._82Aki2, x?clearTimeout(x): '', window._82Aki2 = setTimeout(()=>el.classList.remove(class_add), msg.length*100));
    let copy_code = ()=>navigator.clipboard.writeText(document.querySelector('#code').textContent).then(()=>noti('Đã sao chép !')).catch(()=>(noti('Sao chép thất bại, bạn sẽ được chuyển hướng đến bản gốc'), setTimeout(()=>location.href = url.replace('note.view', 'note.raw'), 1000*2)));

    document.querySelector('#language-code').addEventListener('change', ()=>(document.querySelector('#code').className = document.querySelector('#language-code').value || 'language-default', Prism.highlightAll()));
    update_lines();
</script>
</html>