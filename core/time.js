/**
 * @模块 time.js
 * @描述 时间相关功能，包含报时、夸奖计数等
 */

const fs = require('fs');

/**
 * 格式化当前时间为中文日期时间字符串
 * @returns {string} 格式化的时间字符串，如"2024年1月1日12点30分0秒"
 */
function 报时() {
	time += 32 * 3600;
	let second = time % 1000;
	let minute = Math.floor(time / 60);
	let hour = Math.floor(minute / 60);
	let day = Math.floor(hour / 24);
	let year = 1970;
	let month = 1;
	hour %= 24;
	minute %= 60;
	second %= 60;
	for (year = 1970; day > (year % 4 === 0 ? 366 : 365); ++year)
		day -= (year % 4 === 0 ? 366 : 365);
	for (month = 1; day > (year % 4 === 0 ? month_special[month - 1] : month_general[month - 1]); ++month)
		day -= (year % 4 === 0 ? month_special[month - 1] : month_general[month - 1]);
	time -= 32 * 3600;
	return year + "年" + month + "月" + day + "日" + hour + "点" + minute + "分" + second + "秒";
}

/**
 * 增加今日被夸次数并返回夸奖回复
 * @returns {string} 夸奖回复文本
 */
function count_guai() {
	if (Math.floor((time + 8 * 3600) / 86400) != guai_count[1])
		guai_count = [1, Math.floor((time + 8 * 3600) / 86400)];
	else
		++guai_count[0];
	if (type === "group")
		jmm_bad = group_id;
	const jmm_bad_timer = setTimeout(() => { jmm_bad = false }, 30000);
	fs.writeFileSync('./games/guai.js', "guai_count=" + JSON.stringify(guai_count));
	return "呐呐呐~\n" + "[CQ:image,file=https://i0.hdslb.com/bfs/album/d095daebeb1fed37b7ae8eb71fb29c5a0dd0848c.jpg]";
}

/**
 * 查询今日被夸次数
 * @returns {string} 被夸次数信息
 */
function how_guai() {
	if (Math.floor((time + 8 * 3600) / 86400) != guai_count[1])
		guai_count = [0, Math.floor((time + 8 * 3600) / 86400)];
	if (guai_count[0] === 0)
		return "小夕子今天还没有被夸过呐……" + "[CQ:face,id=9]";
	return "小夕子今天被夸了" + guai_count[0] + "次呐~";
}