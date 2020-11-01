const http = require('http');
const fs = require('fs');
var process = require('child_process');

const server_port = 8082;
const server_url = "http://127.0.0.1:" + server_port + "/";

async function reply_text(text, data) {
    return get_data(
        server_url +
        (data.message_type === "group"
            ? "send_group_msg?group_id=" + data.group_id
            : "send_private_msg?user_id=" + data.user_id)
        + "&message=" + encodeURIComponent(text)
    );
}
async function get_data(url) {
    var parsedData;
    await new Promise((resolve) => {
        if (url.startsWith("https"))
            https.get(url, (res) => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    parsedData = JSON.parse(rawData); console.log(JSON.stringify(parsedData));
                    resolve(parsedData);
                });
            });
        else
            http.get(url, (res) => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    parsedData = JSON.parse(rawData);
                    console.log(JSON.stringify(parsedData));
                    resolve(parsedData);
                });
            });
    });
    return parsedData;
}

const server = http.createServer(
    (req, res) => {
        var row_data = '';
        req.on('data', (chunk) => {
            row_data += chunk;
        })
        req.on('end', async () => {
            var fmtdata = (row_data) ? JSON.parse(row_data) : false;
            if (fmtdata && fmtdata.post_type == "message") {
                try {
                    var reply_text = await reply_from(fmtdata);
                    if (reply_text != "") {
                        return res.end(JSON.stringify({ "reply": reply_text }));
                    }
                } catch (error) { console.log(error); }
            }
            res.end();
        });
    }
)
server.listen(server_port);
async function reply_from(fmtdata) {
    if (fmtdata.post_type != "message") { return; }

    if (fmtdata.raw_message.startsWith("gb")) {
        var cmd = `/home/lede/gb "${fmtdata.raw_message.substr(2).trim()}"`;
        return process.exec(cmd, function (error, stdout, stderr) {
            console.log("error:" + error);
            console.log("stdout:" + stdout);
            console.log("stderr:" + stderr);
            reply_text(stdout, data);
        });

    }
}
