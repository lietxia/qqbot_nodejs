/**
 * @模块 setu.js
 * @描述 色图模块，支持随机色图、东方色图、添加/删除色图、色图统计等功能
 */

const fs = require('fs');

/**
 * 随机获取色图
 * @returns {Promise<string>} CQ图片消息或提示
 */
async function setu() {
	if (type === "group") {
		if (limited_setu[group_id]) {
			if (limited_setu[group_id][0] === Math.floor((time + 8 * 3600) / 86400))
				limited_setu[group_id][1]++;
			else
				limited_setu[group_id] = [Math.floor((time + 8 * 3600) / 86400), 1];
		}
		else
			limited_setu[group_id] = [Math.floor((time + 8 * 3600) / 86400), 1];
		/*if(group_id!=701548657&&group_id!=116758839&&group_id!=916143619&&group_id!=218332534&&limited_setu[group_id][1]>=7)
			return "本群今日\"setu\"机会已经用完啦，明天再来吧~";
		else*/
		if (random_bool(0)) {
			let jmm_json = await get_data("https://img.paulzzh.tech/touhou/random?type=json");
			return img(jmm_json.jpegurl, 0);
		}
		return random_bool(0.5) ? img("http://api.mtyqx.cn/tapi/random.php", 0) : img("http://api.mtyqx.cn/api/random.php", 0);

		/*random_bool(0.5)?img("https://img.paulzzh.tech/touhou/random",0):();*/
	}
	else
		return "不许私藏色图~[CQ:face,id=178]";
}

/**
 * 获取东方Project色图
 * @returns {Promise<string>} CQ图片消息或提示
 */
async function jmmsetu() {
	if (type === "group") {
		if (limited_setu[group_id]) {
			if (limited_setu[group_id][0] === Math.floor((time + 8 * 3600) / 86400))
				limited_setu[group_id][1]++;
			else
				limited_setu[group_id] = [Math.floor((time + 8 * 3600) / 86400), 1];
		}
		else
			limited_setu[group_id] = [Math.floor((time + 8 * 3600) / 86400), 1];
		/*if(group_id!=701548657&&group_id!=116758839&&group_id!=916143619&&group_id!=218332534&&limited_setu[group_id][1]>=7)
			return "本群今日\"setu\"机会已经用完啦，明天再来吧~";
		else*/
		if (1) {
			//return "东方setu功能崩溃啦……";
			let jmm_json = await get_data("https://img.paulzzh.tech/touhou/random?type=json");
			return img(jmm_json.jpegurl, 0);
		}
		return random_bool(0.5) ? img("http://api.mtyqx.cn/tapi/random.php", 0) : img("http://api.mtyqx.cn/api/random.php", 0);

		/*random_bool(0.5)?img("https://img.paulzzh.tech/touhou/random",0):();*/
	}
	else
		return "不许私藏色图~[CQ:face,id=178]";
}

/*https://blog.csdn.net/weixin_30374009/article/details/101388917?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase*/

/**
 * 生成CQ图片消息
 * @param {string} url - 图片URL
 * @param {number} [cache=1] - 是否使用缓存(1=是,0=否)
 * @returns {string} CQ图片消息字符串
 */
img = (url, cache = 1) => {
	cache = cache ? 1 : 0
	console.log(url);
	return `[CQ:image,cache=${cache},file=${encodeURI(url)}]`
}


/**
 * 添加色图到色图库
 * @param {string} order_string - CQ图片消息或图片URL
 * @returns {string} 添加结果
 */
function add_setu(order_string) {
	if (order_string.length === 0) {
		setu_adder.push(id);
		return "[CQ:at,qq=" + id + "]进入色图模式啦~";
	}
	if (order_string.startsWith("[CQ:image,file=")) {
		let end_place = order_string.indexOf("]");
		setu_list.push(order_string.slice(0, end_place + 1));
		fs.writeFileSync('./games/setu_list.js', "setu_list=" + JSON.stringify(setu_list));
		return order_string.slice(0, end_place + 1) + "\n加入色图库啦~"
	}
	else if (order_string.startsWith("http")) {
		setu_list.push("[CQ:image,file=" + order_string + "]");
		fs.writeFileSync('./games/setu_list.js', "setu_list=" + JSON.stringify(setu_list));
		return "[CQ:image,file=" + order_string + "]" + "\n加入色图库啦~"
	}
	else
		return "";
}

/**
 * 从色图库删除色图
 * @param {string} order_string - CQ图片消息
 * @returns {string} 删除结果
 */
function delete_setu(order_string) {
	if (!order_string.startsWith("[CQ:image,file="))
		return "";
	let end_place = order_string.indexOf("]");
	let setu_place = setu_list.indexOf(order_string.slice(0, end_place + 1));
	if (setu_place < 0)
		return "没有找到这张图呢~";
	let setu_name = setu_list[setu_place];
	setu_list.splice(setu_place, 1);
	fs.writeFileSync('./games/setu_list.js', "setu_list=" + JSON.stringify(setu_list));
	return setu_name + "\n移出色图库啦~"
}

/**
 * 退出色图添加模式
 * @returns {string} 退出结果
 */
function end_setu() {
	let adder_place = setu_adder.indexOf(id);
	if (adder_place < 0)
		return "你还没有进入色图模式哦~";
	setu_adder.splice(adder_place, 1);
	return "[CQ:at,qq=" + id + "]退出色图模式啦~";
}

/**
 * 从色图库随机获取一张色图(含频率限制)
 * @returns {string} CQ图片消息或限制提示
 */
function check_setu() {
	if (type === "group") {
		if (restricted_setu[group_id]) {
			if ((Date.now() - restricted_setu[group_id]) < 1000 * 60 * 60)
				return "每个群每小时只能获得一张色图~";
			else
				restricted_setu[group_id] = Date.now();
		}
		else
			restricted_setu[group_id] = Date.now();
		if (setu_usage[group_id])
			setu_usage[group_id]++;
		else
			setu_usage[group_id] = 1;
	}
	fs.writeFileSync('./games/setu_usage.js', "setu_usage=" + JSON.stringify(setu_usage) + "\n" + "limited_setu=" + JSON.stringify(limited_setu) + "\n" + "restricted_setu=" + JSON.stringify(restricted_setu));
	return setu_list[random(0, setu_list.length)];
}

/**
 * 统计色图使用情况
 * @returns {string} 使用统计信息
 */
function statistic_setu() {
	fs.writeFileSync('./games/setu_usage.js', "setu_usage=" + JSON.stringify(setu_usage) + "\n" + "limited_setu=" + JSON.stringify(limited_setu) + "\n" + "restricted_setu=" + JSON.stringify(restricted_setu));
	return "当前的色图使用情况:\n" + JSON.stringify(restricted_setu) + "\n当前的setu使用情况:\n" + JSON.stringify(limited_setu);
}

function delete_newest_setu() {
	let setu_name = setu_list.pop();
	fs.writeFileSync('./games/setu_list.js', "setu_list=" + JSON.stringify(setu_list));
	return setu_name + "\n移出色图库啦~"
}

function newest_setu(m = 0) {
	let setu_string = "最近" + 3 + "张色图:\n";
	for (let i = m + 1; i <= m + 3; ++i)
		setu_string += setu_list[setu_list.length - i].slice(1) + "\n" + setu_list[setu_list.length - i] + "\n";
	return setu_string;
}