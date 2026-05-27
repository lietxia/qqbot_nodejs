/**
 * @模块 monitor.js
 * @描述 群组信息监控服务，监听80端口并查询go-cqhttp API获取群组信息
 */

const http = require('http');

/** HTTP服务器实例，监听80端口接收请求 */
server = http.createServer(
    (req, res) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            console.log(get_data("http://127.0.0.1:5700/get_group_info?group_id=" + (function(){try{return JSON.parse(data)}catch(e){return{}}}()).group_id));
            res.end()
        })
    }
)

/**
 * 通过HTTP GET请求获取数据
 * @param {string} url - 请求的URL地址
 * @returns {void} 打印返回的JSON数据到控制台
 */
get_data = (url) => {
    return http.get(url, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                let parsedData; try { parsedData = JSON.parse(rawData); } catch(e) { console.log("monitor JSON error:", e); return; }
                console.log(parsedData);
                return parsedData;
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

server.listen(80);