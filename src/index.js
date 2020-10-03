const http = require('http');
const fs = require('fs');

const { registerFont, createCanvas, loadImage } = require('canvas')
registerFont('SourceHanSansSC-Regular-min.ttf', { family: 'SourceHanSansSC' })

/*
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
                    return res.end((reply_text == "") ? null :
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

jmm_bad_ID = setInterval(jmm_bad_func, 30000);

//clearInterval(jmm_bad_ID);

auto_restart_ID = setInterval(check_restart, 300000);

//clearInterval(auto_restart_ID);
//mikase_ID=setInterval(()=>{http.get("http://127.0.0.1:5700/send_group_msg?group_id=534360827&&message=投票 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色 咪咔色");},1000)
//clearInterval(mikase_ID);
*/
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


var xiangqi = {
    data: {
        0: [
            [3, 4, 5, 6, 7, 6, 5, 4, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 2, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [8, 0, 8, 0, 8, 0, 8, 0, 8],
            [0, 9, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [10, 11, 12, 13, 14, 13, 12, 11, 10]
        ]
    }
}


xiangqi.move = function (rowtext, group_id) {
    rowtext = rowtext.toUpperCase();
    var arr = rowtext.match(/([A-I])\s*(\d)\s*([A-I])\s*(\d)/);
    if (arr === null) { return "錯誤的輸入\n正確示例：\nyd a0a1"; }
    var fx = "ABCDEFGHI".indexOf(arr[1]),
        fy = arr[2],
        tx = "ABCDEFGHI".indexOf(arr[3]),
        ty = arr[4];
    if (!xiangqi.data.hasOwnProperty(group_id)) {
        xiangqi.data[group_id] = Array.from(xiangqi.data[0]);
    }
    var d = Array.from(xiangqi.data[group_id]);
    //console.log("xq\n", d);
    if (d[fy][fx] === 0) { return "這沒有棋子"; }
    if (d[ty][tx] === 0) {//目標是空位
        d[ty][tx] = d[fy][fx];
    } else {//目標有棋子
        var thisarr = (typeof d[fy][fx] == "number") ?
            [d[fy][fx]] : Array.from(d[fy][fx]);
        var from_is_red = thisarr[0] >= 8 ? true : false;
        var target = (typeof d[ty][tx] == "number") ?
            d[ty][tx] : d[ty][tx][0];
        if ((target >= 8 && from_is_red) ||
            (target < 8 && from_is_red === false)) {
            return "你不能吃掉你自己的棋子";
        }
        thisarr.push(target);
        thisarr[0] = (from_is_red) ? thisarr[0] - 7 : thisarr[0] + 7;
        thisarr = [...new Set(thisarr)];
        thisarr[0] = (from_is_red) ? thisarr[0] + 7 : thisarr[0] - 7;
        d[ty][tx] = thisarr;
    }
    d[fy][fx] = 0;
    xiangqi.data[group_id] = d;
    return xiangqi.show(group_id)
}

xiangqi.show = function (group_id) {
    const canvas = createCanvas(600, 600)
    const ctx = canvas.getContext('2d')
    if (!xiangqi.data.hasOwnProperty(group_id)) {
        xiangqi.data[group_id] = Array.from(xiangqi.data[0]);
    }
    var d = xiangqi.data[group_id];
    var names = [null,
        "卒", "砲", "車", "馬", "象", "士", "將",
        "兵", "炮", "俥", "傌", "相", "仕", "帥",
    ];
    //底色
    ctx.fillStyle = "rgb(223, 201, 162)"
    ctx.fillRect(0, 0, 600, 600);

    var start_x = 100,
        start_y = 75,
        inc = 50,
        text = 30,
        count_x = 9,
        count_y = 10,
        end_x = start_x + count_x * inc - inc,
        end_y = start_y + count_y * inc - inc;
    //特殊线条
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(start_x, end_y);//左下
    ctx.lineTo(start_x, start_y);//左上
    ctx.lineTo(start_x + 3 * inc, start_y);//3,0
    ctx.lineTo(start_x + 5 * inc, start_y + 2 * inc);//5,2
    ctx.lineTo(start_x + 3 * inc, start_y + 2 * inc);//3,2
    ctx.lineTo(start_x + 5 * inc, start_y);//5,0
    ctx.lineTo(end_x, start_y);//右上
    ctx.lineTo(end_x, end_y);//右下
    ctx.lineTo(start_x + 5 * inc, end_y);//5，9
    ctx.lineTo(start_x + 3 * inc, start_y + 7 * inc);//3，7
    ctx.lineTo(start_x + 5 * inc, start_y + 7 * inc);//5，7
    ctx.lineTo(start_x + 3 * inc, end_y);//3，9
    ctx.closePath();
    ctx.stroke();
    var han = "SourceHanSansSC";

    ctx.font = "25px " + han;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
        "楚　河　　　　　漢　界",
        (start_x + end_x) / 2, (start_y + end_y) / 2
    );
    var htxt = "ABCDEFGHIJKLMN";
    for (var i = 0; i < count_x; i++) {
        //横向文字
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(htxt[i], start_x + i * inc, end_y + text);
        ctx.textBaseline = "bottom";
        ctx.fillText(htxt[i], start_x + i * inc, start_y - text);

        //竖直线条
        ctx.beginPath();
        ctx.moveTo(start_x + i * inc, start_y);
        ctx.lineTo(start_x + i * inc, start_y + 4 * inc);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(start_x + i * inc, start_y + 5 * inc);
        ctx.lineTo(start_x + i * inc, end_y);
        ctx.closePath();
        ctx.stroke();
    }

    for (var i = 0; i < count_y; i++) {
        //竖向文字
        ctx.textBaseline = "middle";
        ctx.textAlign = "end";
        ctx.fillText(i, start_x - text, start_y + i * inc);
        ctx.textAlign = "start";
        ctx.fillText(i, end_x + text, start_y + i * inc);

        //横直线条
        ctx.beginPath();
        ctx.moveTo(start_x, start_y + i * inc);
        ctx.lineTo(end_x, start_y + i * inc);
        ctx.closePath();
        ctx.stroke();
    }

    //绘制棋子
    var word = [0, 0, 0, 1, 2, 2, 3, 3];
    var size = [26, 26, 22, 19, 19, 15, 15, 15];
    ctx.strokeStyle = "rgba(0,0,0,0.4)";
    ctx.lineWidth = 3;
    for (var yi = 0; yi < d.length; yi++) {
        var yarr = d[yi],
            this_y = start_y + yi * inc;
        for (var xi = 0; xi < yarr.length; xi++) {
            var this_x = start_x + xi * inc,
                thisdata = yarr[xi];
            if (thisdata == 0) continue;
            ctx.beginPath();

            ctx.fillStyle = (
                (typeof thisdata === "number" && thisdata >= 8) ||
                (typeof thisdata === "object" && thisdata[0] >= 8)
            ) ? 'darkred' : 'black';
            ctx.arc(this_x, this_y, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = 'white';
            ctx.font = "25px " + han;
            if (typeof thisdata === "object") {
                ctx.font = size[thisdata.length] + "px " + han;
                var txt = thisdata.map(function (x) { return names[x]; }).join("");
                if (thisdata.length >= 3) {
                    if (thisdata.length >= 7) {
                        ctx.font = size[2] + "px " + han;
                        ctx.fillText(names[thisdata[0]] + "全", this_x, this_y);
                        continue;
                    }

                    ctx.strokeText(txt.substr(0, word[thisdata.length]), this_x, this_y - 9);
                    ctx.strokeText(txt.substr(word[thisdata.length]), this_x, this_y + 9);
                    ctx.fillText(txt.substr(0, word[thisdata.length]), this_x, this_y - 9);
                    ctx.fillText(txt.substr(word[thisdata.length]), this_x, this_y + 9);
                } else {
                    ctx.fillText(txt, this_x, this_y);
                }
            } else {
                ctx.fillText(names[thisdata], this_x, this_y);
            }

        }
    }
    return "[CQ:image,file=base64://" + canvas.toDataURL().substr(22) + "]"
}

const server = http.createServer(
    (req, res) => {
        var data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', async () => {
            data = JSON.parse(data);
            if (data.post_type == "message") {
                try {
                    var reply_text = await reply_from(data);
                    return res.end(JSON.stringify({ "reply": reply_text })
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
server.listen(80);
async function reply_from(data) {
    if (data.post_type != "message") { return; }
    if (data.raw_message.startsWith("开始功能棋") ||
        data.raw_message.startsWith("開始功能棋")) {
        //if (data.sub_type != "group") { return "只能群聊" }
        xiangqi.data[data.group_id] = [
            [3, 4, 5, 6, 7, 6, 5, 4, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 2, 0],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [8, 0, 8, 0, 8, 0, 8, 0, 8],
            [0, 9, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [10, 11, 12, 13, 14, 13, 12, 11, 10]
        ];
        return xiangqi.show(data.group_id);
    }
    if (data.raw_message.startsWith("qp") ||
        data.raw_message.startsWith("棋盤") ||
        data.raw_message.startsWith("棋盘")) {
        return xiangqi.show(data.group_id);
    }
    if (data.raw_message.startsWith("yd") ||
        data.raw_message.startsWith("移动") ||
        data.raw_message.startsWith("移動")) {
        return xiangqi.move(data.raw_message, data.group_id);
    }
}