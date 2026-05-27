/**
 * @模块 music.js
 * @描述 音乐点播模块，支持随机播放、添加和删除歌曲
 */

const fs = require('fs');

/**
 * 点播音乐(随机或指定ID)
 * @param {string} order_string - 音乐ID，为空则随机
 * @returns {string} CQ音乐消息
 */
function music(order_string) {
	if (order_string === "") {
		let random_music = random(0, musiclist.length);
		while (musiclist[random_music] === group_music[group_id])
			random_music = random(0, musiclist.length);
		order_string = musiclist[random_music];
		group_music[group_id] = order_string;
		console.log(order_string);
	}
	fs.writeFileSync('./games/musicrecord.js', "group_music=" + JSON.stringify(group_music));
	return "[CQ:music,type=163,id=" + order_string + "]";
}

/**
 * 添加音乐到歌单
 * @param {string} order_string - 音乐ID
 * @returns {string} 添加结果
 */
function add_music(order_string) {
	musiclist.push(order_string);
	fs.writeFileSync('./games/musiclist.js', "musiclist=" + JSON.stringify(musiclist));
	return order_string + "号音乐已加入歌单~";
}

/**
 * 从歌单移除音乐
 * @param {string} order_string - 音乐ID
 * @returns {string} 移除结果
 */
function delete_music(order_string) {
	if (musiclist.indexOf(order_string) < 0)
		return "歌曲不存在呢~";
	musiclist.splice(musiclist.indexOf(order_string), 1);
	fs.writeFileSync('./games/musiclist.js', "musiclist=" + JSON.stringify(musiclist));
	return order_string + "号音乐已移除歌单~";
}