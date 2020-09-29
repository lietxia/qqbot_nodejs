const http = require('http');
const fs = require('fs');
require("./basic_settings");
require("./reply_setting");
require("./special_event");
require("./blacklist");
require("./welcome");
require("./屏蔽词库");
require("./help");
require("./jrrp");
require("./time");
require("./留言板");
require("./留言内容");
require("./hearthstone_function");
require("./hearthstone_card");
require("./hearthstone_card_nickname");
require("./hearthstone_card_function");
require("./炉石随机DIY数据库_Version_1.5");
require("./炉石随机DIY函数库_Version_1.5");
require("./majsoul_function");
require("./majsoul_character");
require("./清一色和牌型");
require("./向听判断");
require("./牌理分析");
require("./切牌练习");
require("./和牌牌理");
require("./特殊牌型");
require("./培养皿");
require("./培养皿帮助");
require("./培养皿辅助函数");
require("./色彩收集");
require("./色彩收集帮助");
require("./色彩收集颜色名");
require("./cell_war_log");
require("./rgbc_log");
require("./guai");
require("./save_server");
require("./接龙");
require("./接龙词");
require("./music");
require("./musiclist");
require("./musicrecord");
require("./masterlist");
require("./linear_algebra");
require("./hscl_cost2");
require("./hscl_cost2_name");
require("./calculator_base");
require("./integer_calculator");
require("./rational_calculator");
require("./algebraic_calculator");
require("./rational_polynomial_calculator");
require("./calculator_function");
require("./setu");
require("./setu_list");
require("./setu_usage");
require("./三麻上分模拟");
require("./sm_player_status");
require("./sm_server_result");
require("./姬萌萌破坏");
require("./疯狂背古诗");
require("./abb");
require("./策略上分");
require("./古文献");
require("./24dot");
require("./fibonaci");
require("./置换分类");
require("./the_kth_number");
const server = http.createServer(
    (req, res) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', async () => {
            console.log(data);
            data = JSON.parse(data);
            reply_text = await reply_from(data);
            event_url = await special_event_url(data);
            if (data.post_type == "message")
                res.end(JSON.stringify({ "reply": reply_text, "at_sender": at_from(data) }));
            else
				/*await get_data(event_url)*/res.end();
        })
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