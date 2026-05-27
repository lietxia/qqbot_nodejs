/**
 * @模块 save_server.js
 * @描述 服务器数据持久化保存，将游戏状态数据写入本地JS文件
 */

const fs = require('fs');

/**
 * 保存服务器运行数据到本地文件
 * @returns {boolean} 始终返回true
 */
function save_server() {
	fs.writeFileSync('./games/cell_war_log.js', cell_write_file());
	fs.writeFileSync('./games/sm_player_status.js', sm_player_status());
	return true;
}