const http = require('http');
const fs = require('fs');
eval("" +
    fs.readFileSync(__dirname + '/basic_settings') +
    fs.readFileSync(__dirname + '/reply_setting') +
    fs.readFileSync(__dirname + '/special_event') +
    fs.readFileSync(__dirname + '/blacklist') +
    fs.readFileSync(__dirname + '/welcome') +
    fs.readFileSync(__dirname + '/屏蔽词库') +
    fs.readFileSync(__dirname + '/help') +
    fs.readFileSync(__dirname + '/jrrp') +
    fs.readFileSync(__dirname + '/time') +
    fs.readFileSync(__dirname + '/留言板') +
    fs.readFileSync(__dirname + '/留言内容') +
    fs.readFileSync(__dirname + '/hearthstone_function') +
    fs.readFileSync(__dirname + '/hearthstone_card') +
    fs.readFileSync(__dirname + '/hearthstone_card_nickname') +
    fs.readFileSync(__dirname + '/hearthstone_card_function') +
    fs.readFileSync(__dirname + '/炉石随机DIY数据库_Version_1.5') +
    fs.readFileSync(__dirname + '/炉石随机DIY函数库_Version_1.5') +
    fs.readFileSync(__dirname + '/majsoul_function') +
    fs.readFileSync(__dirname + '/majsoul_character') +
    fs.readFileSync(__dirname + '/清一色和牌型') +
    fs.readFileSync(__dirname + '/向听判断') +
    fs.readFileSync(__dirname + '/牌理分析') +
    fs.readFileSync(__dirname + '/切牌练习') +
    fs.readFileSync(__dirname + '/和牌牌理') +
    fs.readFileSync(__dirname + '/特殊牌型') +
    fs.readFileSync(__dirname + '/培养皿') +
    fs.readFileSync(__dirname + '/培养皿帮助') +
    fs.readFileSync(__dirname + '/培养皿辅助函数') +
    fs.readFileSync(__dirname + '/色彩收集') +
    fs.readFileSync(__dirname + '/色彩收集帮助') +
    fs.readFileSync(__dirname + '/色彩收集颜色名') +
    fs.readFileSync(__dirname + '/cell_war_log') +
    fs.readFileSync(__dirname + '/rgbc_log') +
    fs.readFileSync(__dirname + '/guai') +
    fs.readFileSync(__dirname + '/save_server') +
    fs.readFileSync(__dirname + '/接龙') +
    fs.readFileSync(__dirname + '/接龙词') +
    fs.readFileSync(__dirname + '/music') +
    fs.readFileSync(__dirname + '/musiclist') +
    fs.readFileSync(__dirname + '/musicrecord') +
    fs.readFileSync(__dirname + '/masterlist') +
    fs.readFileSync(__dirname + '/linear_algebra') +
    fs.readFileSync(__dirname + '/hscl_cost2') +
    fs.readFileSync(__dirname + '/hscl_cost2_name') +
    fs.readFileSync(__dirname + '/calculator_base') +
    fs.readFileSync(__dirname + '/integer_calculator') +
    fs.readFileSync(__dirname + '/rational_calculator') +
    fs.readFileSync(__dirname + '/algebraic_calculator') +
    fs.readFileSync(__dirname + '/rational_polynomial_calculator') +
    fs.readFileSync(__dirname + '/calculator_function') +
    fs.readFileSync(__dirname + '/setu') +
    fs.readFileSync(__dirname + '/setu_list') +
    fs.readFileSync(__dirname + '/setu_usage') +
    fs.readFileSync(__dirname + '/三麻上分模拟') +
    fs.readFileSync(__dirname + '/sm_player_status') +
    fs.readFileSync(__dirname + '/sm_server_result') +
    fs.readFileSync(__dirname + '/姬萌萌破坏') +
    fs.readFileSync(__dirname + '/疯狂背古诗') +
    fs.readFileSync(__dirname + '/abb') +
    fs.readFileSync(__dirname + '/策略上分') +
    fs.readFileSync(__dirname + '/古文献') +
    fs.readFileSync(__dirname + '/24dot') +
    fs.readFileSync(__dirname + '/fibonaci') +
    fs.readFileSync(__dirname + '/置换分类') +
    fs.readFileSync(__dirname + '/the_kth_number')
)
const server = http.createServer(
    (req, res) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', async () => {
            console.log(data);
            data = JSON.parse(data);
            if (data.post_type == "message") {
                try {
                    reply_text = await reply_from(data);
                    event_url = await special_event_url(data);
                    return res.end(JSON.stringify({ "reply": reply_text, "at_sender": at_from(data) }));
                } catch (error) {
                    console.log(error);
                    res.end();
                }

            }
            res.end();
        });
    }
)

//else await get_data(await special_event_url(data));

get_data = async (url) => {
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

server.listen(80);
restart_time = Date.now();
//clearInterval(server_saved);
//server_saved=setInterval(save_server,60000);
//clearInterval(cell_turn_move);
//cell_turn_move=setInterval(do_turn_cell,5000);
//https://cqhttp.cc/docs/
//sm_match_ID=setInterval(sm匹配,Math.ceil((sm_match_speed*1000)/sm_rank_list.length));
//clearInterval(sm_match_ID);
//sm_clear_ID=setInterval(sm_clear_log,600000);
//clearInterval(sm_clear_ID);
//sm_clear_ID=setInterval(sm_restart,60000);
//clearInterval(sm_clear_ID);

//jmm_bad_ID = setInterval(jmm_bad_func, 30000);

//clearInterval(jmm_bad_ID);

//auto_restart_ID = setInterval(check_restart, 300000);

//clearInterval(auto_restart_ID);
//mikase_ID=setInterval(()=>{http.get("http://127.0.0.1:5700/send_group_msg?group_id=534360827&&message=投票 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色");},1000)
//clearInterval(mikase_ID);