const http = require('http');
const fs = require('fs');
eval("" +
    fs.readFileSync(__dirname + '/basic_settings.js') +
    fs.readFileSync(__dirname + '/reply_setting.js') +
    fs.readFileSync(__dirname + '/special_event.js') +
    fs.readFileSync(__dirname + '/blacklist.js') +
    fs.readFileSync(__dirname + '/welcome.js') +
    fs.readFileSync(__dirname + '/屏蔽词库.js') +
    fs.readFileSync(__dirname + '/help.js') +
    fs.readFileSync(__dirname + '/jrrp.js') +
    fs.readFileSync(__dirname + '/time.js') +
    fs.readFileSync(__dirname + '/留言板.js') +
    fs.readFileSync(__dirname + '/留言内容.js') +
    fs.readFileSync(__dirname + '/hearthstone_function.js') +
    fs.readFileSync(__dirname + '/hearthstone_card.js') +
    fs.readFileSync(__dirname + '/hearthstone_card_nickname.js') +
    fs.readFileSync(__dirname + '/hearthstone_card_function.js') +
    fs.readFileSync(__dirname + '/炉石随机DIY数据库_Version_1.5.js') +
    fs.readFileSync(__dirname + '/炉石随机DIY函数库_Version_1.5.js') +
    fs.readFileSync(__dirname + '/majsoul_function.js') +
    fs.readFileSync(__dirname + '/majsoul_character.js') +
    fs.readFileSync(__dirname + '/清一色和牌型.js') +
    fs.readFileSync(__dirname + '/向听判断.js') +
    fs.readFileSync(__dirname + '/牌理分析.js') +
    fs.readFileSync(__dirname + '/切牌练习.js') +
    fs.readFileSync(__dirname + '/和牌牌理.js') +
    fs.readFileSync(__dirname + '/特殊牌型.js') +
    fs.readFileSync(__dirname + '/培养皿.js') +
    fs.readFileSync(__dirname + '/培养皿帮助.js') +
    fs.readFileSync(__dirname + '/培养皿辅助函数.js') +
    fs.readFileSync(__dirname + '/色彩收集.js') +
    fs.readFileSync(__dirname + '/色彩收集帮助.js') +
    fs.readFileSync(__dirname + '/色彩收集颜色名.js') +
    fs.readFileSync(__dirname + '/cell_war_log.js') +
    fs.readFileSync(__dirname + '/rgbc_log.js') +
    fs.readFileSync(__dirname + '/guai.js') +
    fs.readFileSync(__dirname + '/save_server.js') +
    fs.readFileSync(__dirname + '/接龙.js') +
    fs.readFileSync(__dirname + '/接龙词.js') +
    fs.readFileSync(__dirname + '/music.js') +
    fs.readFileSync(__dirname + '/musiclist.js') +
    fs.readFileSync(__dirname + '/musicrecord.js') +
    fs.readFileSync(__dirname + '/masterlist.js') +
    fs.readFileSync(__dirname + '/linear_algebra.js') +
    fs.readFileSync(__dirname + '/hscl_cost2.js') +
    fs.readFileSync(__dirname + '/hscl_cost2_name.js') +
    fs.readFileSync(__dirname + '/calculator_base.js') +
    fs.readFileSync(__dirname + '/integer_calculator.js') +
    fs.readFileSync(__dirname + '/rational_calculator.js') +
    fs.readFileSync(__dirname + '/algebraic_calculator.js') +
    fs.readFileSync(__dirname + '/rational_polynomial_calculator.js') +
    fs.readFileSync(__dirname + '/calculator_function.js') +
    fs.readFileSync(__dirname + '/setu.js') +
    fs.readFileSync(__dirname + '/setu_list.js') +
    fs.readFileSync(__dirname + '/setu_usage.js') +
    fs.readFileSync(__dirname + '/三麻上分模拟.js') +
    fs.readFileSync(__dirname + '/sm_player_status.js') +
    fs.readFileSync(__dirname + '/sm_server_result.js') +
    fs.readFileSync(__dirname + '/姬萌萌破坏.js') +
    fs.readFileSync(__dirname + '/疯狂背古诗.js') +
    fs.readFileSync(__dirname + '/abb.js') +
    fs.readFileSync(__dirname + '/策略上分.js') +
    fs.readFileSync(__dirname + '/古文献.js') +
    fs.readFileSync(__dirname + '/24dot.js') +
    fs.readFileSync(__dirname + '/fibonaci.js') +
    fs.readFileSync(__dirname + '/置换分类.js') +
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