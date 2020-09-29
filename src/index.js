const http = require('http');
const fs = require('fs');
function read(f) {
    return fs.readFileSync(f).toString();
}
function include(f) {
    eval.apply(global, [read(f)]);
}
include('basic_settings.js');
include('reply_setting.js');
include('special_event.js');
include('blacklist.js');
include('welcome.js');
include('屏蔽词库.js');
include('help.js');
include('jrrp.js');
include('time.js');
include('留言板.js');
include('留言内容.js');
include('hearthstone_function.js');
include('hearthstone_card.js');
include('hearthstone_card_nickname.js');
include('hearthstone_card_function.js');
include('炉石随机DIY数据库_Version_1.5.js');
include('炉石随机DIY函数库_Version_1.5.js');
include('majsoul_function.js');
include('majsoul_character.js');
include('清一色和牌型.js');
include('向听判断.js');
include('牌理分析.js');
include('切牌练习.js');
include('和牌牌理.js');
include('特殊牌型.js');
include('培养皿.js');
include('培养皿帮助.js');
include('培养皿辅助函数.js');
include('色彩收集.js');
include('色彩收集帮助.js');
include('色彩收集颜色名.js');
include('cell_war_log.js');
include('rgbc_log.js');
include('guai.js');
include('save_server.js');
include('接龙.js');
include('接龙词.js');
include('music.js');
include('musiclist.js');
include('musicrecord.js');
include('masterlist.js');
include('linear_algebra.js');
include('hscl_cost2.js');
include('hscl_cost2_name.js');
include('calculator_base.js');
include('integer_calculator.js');
include('rational_calculator.js');
include('algebraic_calculator.js');
include('rational_polynomial_calculator.js');
include('calculator_function.js');
include('setu.js');
include('setu_list.js');
include('setu_usage.js');
include('三麻上分模拟.js');
include('sm_player_status.js');
include('sm_server_result.js');
include('姬萌萌破坏.js');
include('疯狂背古诗.js');
include('abb.js');
include('策略上分.js');
include('古文献.js');
include('24dot.js');
include('fibonaci.js');
include('置换分类.js');
include('the_kth_number.js');

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
                    return res.end((reply == "") ? null :
                        JSON.stringify({
                            "reply": reply_text,
                            "at_sender": at_from(data)
                        })
                    )
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