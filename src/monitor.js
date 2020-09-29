const http = require('http');

server = http.createServer(
	(req, res)=>{
		let data = '';
		req.on('data', (chunk)=>{
			data += chunk;
		})
		req.on('end', ()=>{
			console.log(get_data("http://127.0.0.1:5700/get_group_info?group_id="+JSON.parse(data).group_id));
			res.end()
		})
	}
)

get_data=(url)=>{
    return http.get(url, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
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