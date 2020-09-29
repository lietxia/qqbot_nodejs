const http = require('http');
const fs = require('fs');
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
