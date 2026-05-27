/**
 * @模块 喵.js
 * @描述 定时发送色图消息的定时器模块
 */

const http = require('http');

/** @type {NodeJS.Timeout} 定时发送色图的定时器ID */
setuID = setInterval(() => { http.get("http://127.0.0.1:5700/send_private_msg?user_id=3507349275&&message=色图2()").on("error", ()=>{}) }, 300000);
//clearInterval(setuID);