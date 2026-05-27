/**
 * @模块 mirai_index.js
 * @描述 Mirai框架的HTTP服务器入口，监听80端口接收消息数据
 */

const http = require('http');
const fs = require('fs');

/** HTTP服务器实例，监听80端口接收消息 */
const server = http.createServer(
	(req, res) => {
		let data = '';
		req.on('data', (chunk) => {
			data += chunk;
		})
		req.on('end', async () => {
			console.log(data);
			res.end();
		})
	}
)

server.listen(80);
