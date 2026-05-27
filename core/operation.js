/**
 * @模块 operation.js
 * @描述 炉石传说卡牌数据预处理，筛选法力值为2的卡牌并写入文件
 */

const fs = require('fs');

/** 筛选法力值为2的卡牌集合 */
hscl_cost2 = {};
for (let i in hscl)
if (hscl[i]["卡牌类型"] === 1 && hscl[i]["法力值"] === 2)
hscl_cost2[i] = hscl[i];
fs.writeFileSync('./games/hscl_cost2.js', "hscl_cost2=" + JSON.stringify(hscl_cost2));