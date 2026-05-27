/**
 * @模块 index.js
 * @描述 QQ机器人主入口文件，创建HTTP服务器接收go-cqhttp的POST消息并回复
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

/* ==== 常量配置 ==== */

/** @type {number} 本服务监听端口 */
const this_port = 8082;
/** @type {string} go-cqhttp HTTP API 地址 */
const post_url = "http://127.0.0.1:5700/";

/**
 * 回复文本消息
 * @param {string} text - 回复内容
 * @param {object} fmtdata - 消息格式数据，包含message_type/group_id/user_id
 * @returns {Promise<object>} go-cqhttp返回的响应数据
 */
async function reply_text(text, fmtdata) {
    const url = `${post_url}${fmtdata.message_type === "group" ? `send_group_msg?group_id=${fmtdata.group_id}` : `send_private_msg?user_id=${fmtdata.user_id}`}&message=${encodeURIComponent(text)}`;
    console.log(`posturl:${url}`);
    return get_data(url);
}
/**
 * 发起HTTP/HTTPS GET请求并解析JSON响应
 * @param {string} url - 请求URL
 * @returns {Promise<object>} 解析后的JSON数据
 */
async function get_data(url) {
    let row_data = "";
    return new Promise((resolve) => {
        const handler = (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => { row_data += chunk; });
            res.on('end', () => {
                try {
                    resolve(row_data ? JSON.parse(row_data) : {});
                } catch (e) {
                    console.log("JSON.parse error:", e);
                    resolve({});
                }
            });
        };
        const req = url.startsWith("https")
            ? https.get(url, handler)
            : http.get(url, handler);
        req.on('error', (e) => {
            console.log("get_data error:", e.message);
            resolve({});
        });
    });
}

/* ==== HTTP服务器 ==== */

/** HTTP服务器实例，监听go-cqhttp上报的消息 */
const server = http.createServer(
    (req, res) => {
        let row_data = '', fmtdata;
        req.on('data', (chunk) => {
            row_data += chunk;
        })
        req.on('end', async () => {
            try {
                fmtdata = (row_data) ? JSON.parse(row_data) : false;
            } catch (e) {
                console.log("JSON.parse error on incoming message:", e);
                fmtdata = false;
            }
            if (fmtdata && fmtdata.post_type === "message") {
                try {
                    const reply_text = await reply_from(fmtdata);
                    if (reply_text !== "") {
                        return res.end(JSON.stringify({ "reply": reply_text }));
                    }
                } catch (error) { console.log(error); }
            }
            res.end();
        });
    }
)
server.listen(this_port);

/* ==== 全局错误处理 ==== */

/** 捕获未处理的Promise拒绝，防止进程崩溃 */
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection:', reason);
});

/** 捕获未捕获的同步异常，防止进程崩溃 */
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
});
/**
 * 根据消息内容生成回复
 * @param {object} fmtdata - 解析后的消息数据
 * @returns {Promise<string|void>} 回复文本或无回复
 */
async function reply_from(fmtdata) {
    if (fmtdata.post_type !== "message") { return; }

	if (fmtdata.raw_message.startsWith("gb")) {
		const input = fmtdata.raw_message
			.slice(2).trim()
			.replace(/&#91;/g, "[")
			.replace(/&#93;/g, "]");
		const cmd = `/home/lede/gb ${JSON.stringify(input)}`;
		return exec(cmd, (error, stdout, stderr) => {
            console.log(`error:${error}`);
            console.log(`stdout:${stdout}`);
            console.log(`stderr:${stderr}`);
            if (stderr !== "") reply_text(stderr, fmtdata);
            if (stdout !== "") reply_text(stdout, fmtdata);
        });

    }
}
