function annihilateWar_function(order_string) {
	let order_option = "";
	let order_name = "";
	let order_detail = "";
	let order_plus = "";
	let i = 0;
	for (i = 0; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_option += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_name += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_detail += order_string[i];
	for (++i; i < order_string.length; ++i)
		if (order_string[i] == "," || order_string[i] == ";" || order_string[i] == "，" || order_string[i] == "；")
			break;
		else
			order_plus += order_string[i];
	if (order_option == "排行榜" && order_name == "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw排行榜();
	if (order_option == "重启服务器" && order_name == "" && order_detail == "" && order_plus == "" && masterlist.indexOf(id) >= 0)
		return (type == "group" ? "\n" : "") + annihilateWarInitialize();
	if (order_option == "帮助" && order_name == "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw_help_string;
	if (order_option == "环境" && order_name == "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw环境();
	if (order_option == "日志" && order_name == "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw日志();
	if (order_option == "创建" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw创建(order_detail, order_name);
	if (order_option == "删除" && order_name != "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw删除(order_name);
	if (order_option == "查看" && order_name != "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw查看(order_name);
	if (order_option == "位置" && order_name != "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw位置(order_name);
	if (order_option == "改变密度" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw改变密度(order_name, JSON.parse(order_detail));
	if (order_option == "提升幸运" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw提升幸运(order_name, JSON.parse(order_detail));
	if (order_option == "提升攻击力" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw提升攻击力(order_name, JSON.parse(order_detail));
	if (order_option == "提升防御力" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw提升防御力(order_name, JSON.parse(order_detail));
	if (order_option == "攻击" && order_name != "" && order_detail != "" && order_plus != "")
		return (type == "group" ? "\n" : "") + aw攻击(order_name, order_detail, JSON.parse(order_plus));
	if (order_option == "距离" && order_name != "" && order_detail != "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw距离(order_name, order_detail);
	if (order_option == "大灾变" && order_name != "" && order_detail == "" && order_plus == "")
		return (type == "group" ? "\n" : "") + aw大灾变(order_name);
	return "命令有问题呢~";
}

//函数库
///初始化
function annihilateWarInitialize() {
	annihilateWarLog = []
	annihilateWarUserDate = {}
	annihilateWarRubbishDate = []
	annihilateWarMatterDate = {}
	annihilatedMatterDate = {}
	spaceRadius = 10
	for (let i = 0; i < 500; i++) {
		createRubbish()
	}
}
///进程
function annihilateWarRun() {
	let log = ""
	for (let key in annihilateWarMatterDate) {
		let scope = randomPointInSpherome(annihilateWarMatterDate[key]["radius"]())
		annihilateWarMatterDate[key]["coordinate"][0] += scope[0]
		annihilateWarMatterDate[key]["coordinate"][1] += scope[1]
		annihilateWarMatterDate[key]["coordinate"][2] += scope[2]
		for (; !isPointInSpherome(annihilateWarMatterDate[key]["coordinate"][0], annihilateWarMatterDate[key]["coordinate"][1], annihilateWarMatterDate[key]["coordinate"][2], spaceRadius, 0, 0, 0);) {
			scope = randomPointInSpherome(annihilateWarMatterDate[key]["radius"]())
			annihilateWarMatterDate[key]["coordinate"][0] += scope[0]
			annihilateWarMatterDate[key]["coordinate"][1] += scope[1]
			annihilateWarMatterDate[key]["coordinate"][2] += scope[2]
		}
	}
	for (let i = 0; i < annihilateWarRubbishDate.length; i++) {
		let scope = randomPointInSpherome(annihilateWarRubbishDate[i]["radius"]() * 5)
		annihilateWarRubbishDate[i]["coordinate"][0] += scope[0]
		annihilateWarRubbishDate[i]["coordinate"][1] += scope[1]
		annihilateWarRubbishDate[i]["coordinate"][2] += scope[2]
		for (; !isPointInSpherome(annihilateWarRubbishDate[i]["coordinate"][0], annihilateWarRubbishDate[i]["coordinate"][1], annihilateWarRubbishDate[i]["coordinate"][2], spaceRadius, 0, 0, 0);) {
			scope = randomPointInSpherome(annihilateWarRubbishDate[i]["radius"]() * 5)
			annihilateWarMatterDate[key]["coordinate"][0] += scope[0]
			annihilateWarMatterDate[key]["coordinate"][1] += scope[1]
			annihilateWarMatterDate[key]["coordinate"][2] += scope[2]
		}
	}
	let matter = shuffle(Object.keys(annihilateWarMatterDate))
	annihilateWarRubbishDate = shuffle(annihilateWarRubbishDate)
	for (let i = 0; i < matter.length; i++) {
		if (annihilateWarMatterDate[matter[i]]["mass"] < 1) {
			continue
		}
		let t1 = annihilateWarMatterDate[matter[i]]["type"]
		let m1 = annihilateWarMatterDate[matter[i]]["mass"]
		let v1 = annihilateWarMatterDate[matter[i]]["volume"]()
		let r1 = annihilateWarMatterDate[matter[i]]["radius"]()
		let x1 = annihilateWarMatterDate[matter[i]]["coordinate"][0]
		let y1 = annihilateWarMatterDate[matter[i]]["coordinate"][1]
		let z1 = annihilateWarMatterDate[matter[i]]["coordinate"][2]
		let l1 = annihilateWarMatterDate[matter[i]]["luck"]
		for (let j = i + 1; j < matter.length; j++) {
			if (annihilateWarMatterDate[matter[j]]["mass"] < 1) {
				continue
			}
			let t2 = annihilateWarMatterDate[matter[j]]["type"]
			let m2 = annihilateWarMatterDate[matter[j]]["mass"]
			let v2 = annihilateWarMatterDate[matter[j]]["volume"]()
			let r2 = annihilateWarMatterDate[matter[j]]["radius"]()
			let x2 = annihilateWarMatterDate[matter[j]]["coordinate"][0]
			let y2 = annihilateWarMatterDate[matter[j]]["coordinate"][1]
			let z2 = annihilateWarMatterDate[matter[j]]["coordinate"][2]
			let l2 = annihilateWarMatterDate[matter[j]]["luck"]
			let iv = intersectionVolumeWith2Spheromes(r1, x1, y1, z1, r2, x2, y2, z2)
			if (iv != 0) {
				log += "\n" + t1 + matter[i] + "和" + t2 + matter[j] + "发生碰撞，"
				let im = Math.min(iv / v1 * m1, iv / v2 * m2)
				if (t1 == t2) {
					if (m1 > m2) {
						m1 += im + Math.random() * l1 / 10
						m2 -= Math.max(0, im - Math.random() * l2 / 10)
						log += matter[i] + "获得了" + matter[j] + "的" + im.toFixed(2) + "质量"
					}
					else if (m2 > m1) {
						m2 += im + Math.random() * l2 / 10
						m1 -= Math.max(0, im - Math.random() * l1 / 10)
						log += matter[j] + "获得了" + matter[i] + "的" + im.toFixed(2) + "质量"
					}
				}
				else {
					m1 -= Math.max(0, im - Math.random() * l1 / 10)
					m2 -= Math.max(0, im - Math.random() * l2 / 10)
					log += matter[i] + "和" + matter[j] + "都失去了" + im.toFixed(2) + "质量"
				}
				annihilateWarMatterDate[matter[i]]["mass"] = m1
				annihilateWarMatterDate[matter[j]]["mass"] = m2
			}
		}
	}
	for (let i = 0; i < matter.length; i++) {
		if (annihilateWarMatterDate[matter[i]]["mass"] < 1) {
			continue
		}
		let t1 = annihilateWarMatterDate[matter[i]]["type"]
		let m1 = annihilateWarMatterDate[matter[i]]["mass"]
		let v1 = annihilateWarMatterDate[matter[i]]["volume"]()
		let r1 = annihilateWarMatterDate[matter[i]]["radius"]()
		let x1 = annihilateWarMatterDate[matter[i]]["coordinate"][0]
		let y1 = annihilateWarMatterDate[matter[i]]["coordinate"][1]
		let z1 = annihilateWarMatterDate[matter[i]]["coordinate"][2]
		let l1 = annihilateWarMatterDate[matter[i]]["luck"]
		for (let j = 0; j < annihilateWarRubbishDate.length; j++) {
			if (annihilateWarRubbishDate[j]["mass"] < 1) {
				continue
			}
			let t2 = annihilateWarRubbishDate[j]["type"]
			let m2 = annihilateWarRubbishDate[j]["mass"]
			let v2 = annihilateWarRubbishDate[j]["volume"]()
			let r2 = annihilateWarRubbishDate[j]["radius"]()
			let x2 = annihilateWarRubbishDate[j]["coordinate"][0]
			let y2 = annihilateWarRubbishDate[j]["coordinate"][1]
			let z2 = annihilateWarRubbishDate[j]["coordinate"][2]
			let iv = intersectionVolumeWith2Spheromes(r1, x1, y1, z1, r2, x2, y2, z2)
			if (iv != 0) {
				//log+="\n"+t1+matter[i]+"和"+t2+"垃圾发生碰撞，"
				let im = Math.min(iv / v1 * m1, iv / v2 * m2)
				if (t1 == t2) {
					if (m1 > m2) {
						im = Math.min(im * 5, m2)
						m1 += im + Math.random() * l1 / 10
						m2 -= im
						//log+=matter[i]+"获得了"+im.toFixed(2)+"质量"
					}
					else if (m2 > m1) {
						m2 += im
						m1 -= Math.max(0, im - Math.random() * l1 / 10)
						//log+=matter[i]+"失去了"+im.toFixed(2)+"质量"
					}
				}
				else {
					m1 -= Math.max(0, im - Math.random() * l1 / 10)
					m2 -= im
					//log+=matter[i]+"失去了"+im.toFixed(2)+"质量"
				}
				annihilateWarMatterDate[matter[i]]["mass"] = m1
				annihilateWarRubbishDate[j]["mass"] = m2
			}
		}
	}
	for (let key in annihilateWarMatterDate) {
		let lv = annihilateWarMatterDate[key]["volume"]() - intersectionVolumeWith2Spheromes(spaceRadius, 0, 0, 0, annihilateWarMatterDate[key]["radius"](), annihilateWarMatterDate[key]["coordinate"][0], annihilateWarMatterDate[key]["coordinate"][1], annihilateWarMatterDate[key]["coordinate"][2])
		let lm = lv / annihilateWarMatterDate[key]["volume"]() * annihilateWarMatterDate[key]["mass"]
		if (lm > 1) {
			annihilateWarMatterDate[key]["mass"] -= lm
			log += "\n" + annihilateWarMatterDate[key]["type"] + key + "飞出了宇宙，失去了" + lm.toFixed(2) + "质量"
			annihilateWarMatterDate[key]["coordinate"] = randomPointInSpherome(spaceRadius)
		}
		if (Math.random() < 0.1 + annihilateWarMatterDate[key]["luck"] / 10000) {
			annihilateWarMatterDate[key]["action"]++
		}
		if (annihilateWarMatterDate[key]["mass"] <= 1) {
			annihilatedMatterDate[key] = annihilateWarMatterDate[key]
			log += "\n" + annihilatedMatterDate[key]["type"] + key + "湮灭了"
			delete annihilateWarMatterDate[key]
		}
	}
	let rubbishDeleteCount = 0
	for (let i = 0; i < annihilateWarRubbishDate.length; i++) {
		if (annihilateWarRubbishDate[i]["mass"] < 1) {
			annihilateWarRubbishDate.splice(i, 1)
			i--
			rubbishDeleteCount++
		}
	}
	if (rubbishDeleteCount > 0) {
		log += "\n清理了" + rubbishDeleteCount + "个垃圾"
	}
	if (Math.random() < 0.5) {
		createRubbish()
		log += "\n创建了1个垃圾"
	}
	if (log.length == 0) {
		log += "\n什么都没有发生"
	}
	annihilateWarLog.push(log)
	for (; annihilateWarLog.length > 10;) {
		annihilateWarLog.shift()
	}
	if (spaceRadius < Object.keys(annihilateWarMatterDate).length * 5 + 10) {
		spaceRadius += Math.random()
	}
	else if (spaceRadius > Object.keys(annihilateWarMatterDate).length * 5 + 10) {
		spaceRadius -= Math.random()
	}
	let log_list = annihilateWar_write_file();
	fs.writeFileSync('./annihilateWar_log.txt', log_list);
}

function annihilateWar_write_file() {
	return "spaceRadius=" + spaceRadius + ";\n" + "annihilateWarUserDate=" + JSON.stringify(annihilateWarUserDate) + ";\n" + "annihilateWarRubbishDate=" + JSON.stringify(annihilateWarRubbishDate) + ";\n" + "annihilateWarLog=" + JSON.stringify(annihilateWarLog) + ";\n" + "annihilateWarMatterDate=" + JSON.stringify(annihilateWarMatterDate) + ";\n" + "annihilatedMatterDate=" + JSON.stringify(annihilatedMatterDate) + ";";
}

///判断物质状态
function annihilateWarMatterState(rho) {
	if (rho >= 1000) {
		return "超固态"
	}
	else if (rho >= 175) {
		return "固态"
	}
	else if (rho >= 25) {
		return "液态"
	}
	else {
		return "气态"
	}
}
///创建宇宙垃圾
function createRubbish() {
	let type
	if (Math.random() > 0.5) {
		type = "正物质"
	}
	else {
		type = "反物质"
	}
	annihilateWarRubbishDate.push({
		"type": type,
		"mass": Math.random() * (500 - 50) + 50,
		"density": Math.random() * (150 - 1) + 1,
		"volume": function () {
			return this["mass"] / this["density"]
		},
		"radius": function () {
			return Math.pow(3 * this["volume"]() / 4 / Math.PI, 1 / 3)
		},
		"coordinate": randomPointInSpherome(spaceRadius),
	})
}
///三维空间内两点距离
function distance3D(x1, y1, z1, x2, y2, z2) {
	return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2), 1 / 2)
}
///球体积
function spheromeVolume(r) {
	return 4 / 3 * Math.PI * Math.pow(r, 3)
}
///球内随机点
function randomPointInSpherome(r) {
	let x = Math.random() * 2 * r - r
	let y = Math.random() * 2 * r - r
	let z = Math.random() * 2 * r - r
	for (; distance3D(0, 0, 0, x, y, z) > r;) {
		x = Math.random() * 2 * r - r
		y = Math.random() * 2 * r - r
		z = Math.random() * 2 * r - r
	}
	return [x, y, z]
}
///判断点是否在球内
function isPointInSpherome(x, y, z, rs, xs, ys, zs) {
	if (distance3D(x, y, z, x, y, z) > rs) {
		return false
	}
	else {
		return true
	}
}
///求两球体相交部分体积
function intersectionVolumeWith2Spheromes(r1, x1, y1, z1, r2, x2, y2, z2) {
	let centerDistance = distance3D(x1, y1, z1, x2, y2, z2)
	if (centerDistance >= r1 + r2) {
		return 0
	}
	else if (centerDistance <= Math.abs(r1 - r2)) {
		return spheromeVolume(Math.min(r1, r2))
	}
	else {
		let h1 = r2 * (1 - (Math.pow(r2, 2) + Math.pow(centerDistance, 2) - Math.pow(r1, 2)) / (2 * r2 * centerDistance))
		let h2 = r1 * (1 - (Math.pow(r1, 2) + Math.pow(centerDistance, 2) - Math.pow(r2, 2)) / (2 * r1 * centerDistance))
		return Math.PI / 3 * (3 * r2 - h1) * Math.pow(h1, 2) + Math.PI / 3 * (3 * r1 - h2) * Math.pow(h2, 2)
	}
}



//玩家函数
//帮助见另一个文件
//基础操作
function aw排行榜() {
	let str = "湮灭之战排行榜"
	let keys = Object.keys(annihilateWarMatterDate)
	keys.sort(function (a, b) { return annihilateWarMatterDate[b]["mass"] - annihilateWarMatterDate[a]["mass"] })
	for (let i = 0; i < keys.length; i++) {
		str += "\n" + (i + 1) + "：" + annihilateWarMatterDate[keys[i]]["type"] + keys[i] + " 质量" + Math.abs(annihilateWarMatterDate[keys[i]]["mass"].toFixed(2))
	}
	return str
}

function aw创建(type, name) {
	switch (type) {
		case "正物质":
		case "正":
		case "z":
			type = "正物质"
			break
		case "反物质":
		case "反":
		case "f":
			type = "反物质"
			break
		default: return "请输入正确的物质类型！"
	}
	if (annihilateWarMatterDate[name]) {
		return name + "已经被占用了！"
	}
	if (annihilateWarUserDate[id]) {
		annihilateWarUserDate[id].push(name)
	}
	else {
		annihilateWarUserDate[id] = [name]
	}
	spaceRadius += 10 * Math.random()
	annihilateWarMatterDate[name] = {
		"master": id,						//玩家QQ
		"type": type,						//类型：正物质/反物质
		"mass": 10000,						//质量：初始10000
		"density": 100,						//密度：初始100，每一行动力可以改变1，不可小于1
		"volume": function () {					//体积：计算得到
			return this["mass"] / this["density"]
		},
		"radius": function () {					//半径：计算得到
			return Math.pow(3 * this["volume"]() / 4 / Math.PI, 1 / 3)
		},
		"state": function () {					//状态：根据密度得到
			return annihilateWarMatterState(this["density"])
		},
		"attack": 10,						//攻击力：初始10，每一行动力可以增加1
		"defense": 0,						//防御力：初始0，每一行动力可以增加1
		"luck": 0,						//幸运：初始0，每一行动力可以增加1，最大5000
		"action": 100,						//行动力：初始100
		"coordinate": randomPointInSpherome(spaceRadius),	//坐标：随机生成
	}
	for (let i = 0; i < 100; i++) {
		createRubbish()
	}
	let log = "\n" + type + name + "生成了"
	annihilateWarLog.push(log)
	for (; annihilateWarLog.length > 10;) {
		annihilateWarLog.shift()
	}
	return "成功创建" + name + "\n" + aw查看(name)
}
function aw查看(name) {
	let str = ""
	if (annihilateWarMatterDate[name]) {
		str += annihilateWarMatterDate[name]["type"] + name + "的情况\n"
		str += "质量：" + Math.abs(annihilateWarMatterDate[name]["mass"].toFixed(2)) + "\n"
		str += "密度：" + annihilateWarMatterDate[name]["density"] + "\n"
		str += "体积：" + Math.abs(annihilateWarMatterDate[name]["volume"]().toFixed(2)) + "\n"
		str += "半径：" + Math.abs(annihilateWarMatterDate[name]["radius"]().toFixed(2)) + "\n"
		str += "状态：" + annihilateWarMatterDate[name]["state"]() + "\n"
		str += "攻击力：" + annihilateWarMatterDate[name]["attack"] + "\n"
		str += "防御力：" + annihilateWarMatterDate[name]["defense"] + "\n"
		str += "幸运：" + annihilateWarMatterDate[name]["luck"] + "\n"
		str += "行动力：" + annihilateWarMatterDate[name]["action"]
	}
	else if (annihilatedMatterDate[name]) {
		str += annihilatedMatterDate[name]["type"] + name + "已经湮灭了\n"
		str += "质量：" + Math.abs(annihilatedMatterDate[name]["mass"].toFixed(2)) + "\n"
		str += "密度：" + annihilatedMatterDate[name]["density"] + "\n"
		str += "体积：" + Math.abs(annihilatedMatterDate[name]["volume"]().toFixed(2)) + "\n"
		str += "半径：" + Math.abs(annihilatedMatterDate[name]["radius"]().toFixed(2)) + "\n"
		str += "状态：" + annihilatedMatterDate[name]["state"]() + "\n"
		str += "攻击力：" + annihilatedMatterDate[name]["attack"] + "\n"
		str += "防御力：" + annihilatedMatterDate[name]["defense"] + "\n"
		str += "幸运：" + annihilatedMatterDate[name]["luck"] + "\n"
		str += "行动力：" + annihilatedMatterDate[name]["action"]
	}
	else {
		str += "没有找到物质" + name + "！"
	}
	return str
}

function aw删除(name) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	let log = "\n" + annihilateWarMatterDate[name]["type"] + name + "消失了"
	delete annihilateWarMatterDate[name]
	annihilateWarLog.push(log)
	for (; annihilateWarLog.length > 10;) {
		annihilateWarLog.shift()
	}
	return "删除成功，" + name + "消失了！"
}

function aw环境() {
	let str = "当前宇宙环境"
	str += "\n宇宙半径：" + spaceRadius.toFixed(2)
	str += "\n物质数量：" + Object.keys(annihilateWarMatterDate).length
	str += "\n垃圾数量：" + annihilateWarRubbishDate.length
	return str
}

function aw日志() {
	let str = "湮灭之战日志"
	for (let i = 0; i < annihilateWarLog.length; i++) {
		str += "\n----------" + annihilateWarLog[i]
	}
	return str
}
function aw距离(name1, name2) {
	if (!annihilateWarMatterDate[name1]) {
		return "没有找到物质" + name1 + "！"
	}
	if (!annihilateWarMatterDate[name2]) {
		return "没有找到物质" + name2 + "！"
	}
	let r1 = annihilateWarMatterDate[name1]["radius"]()
	let x1 = annihilateWarMatterDate[name1]["coordinate"][0]
	let y1 = annihilateWarMatterDate[name1]["coordinate"][1]
	let z1 = annihilateWarMatterDate[name1]["coordinate"][2]
	let r2 = annihilateWarMatterDate[name2]["radius"]()
	let x2 = annihilateWarMatterDate[name2]["coordinate"][0]
	let y2 = annihilateWarMatterDate[name2]["coordinate"][1]
	let z2 = annihilateWarMatterDate[name2]["coordinate"][2]
	let str = annihilateWarMatterDate[name1]["type"] + name1 + "到" + annihilateWarMatterDate[name2]["type"] + name2
	str += "\n球心距离为" + distance3D(x1, y1, z1, x2, y2, z2).toFixed(2)
	str += "\n最短距离为" + (distance3D(x1, y1, z1, x2, y2, z2) - (r1 + r2)).toFixed(2)
	return str
}

function aw位置(name) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	let str = annihilateWarMatterDate[name]["type"] + name + "位于"
	let x = annihilateWarMatterDate[name]["coordinate"][0]
	let y = annihilateWarMatterDate[name]["coordinate"][1]
	let z = annihilateWarMatterDate[name]["coordinate"][2]
	str += "\nX=" + x.toFixed(2)
	str += "\nY=" + y.toFixed(2)
	str += "\nZ=" + z.toFixed(2)
	str += "\n距离宇宙中心" + distance3D(0, 0, 0, x, y, z).toFixed(2)
	str += "\n物质半径：" + annihilateWarMatterDate[name]["radius"]().toFixed(2)
	str += "\n宇宙半径：" + spaceRadius.toFixed(2)
	return str
}



//数值操作
function aw改变密度(name, delta) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (Math.floor(delta) != delta) {
		return "请输入整数！"
	}
	if (Math.abs(delta) > annihilateWarMatterDate[name]["action"]) {
		return "行动力不足！"
	}
	if (annihilateWarMatterDate[name]["density"] + delta <= 0) {
		return "密度必须大于0！"
	}
	annihilateWarMatterDate[name]["density"] += delta
	annihilateWarMatterDate[name]["action"] -= Math.abs(delta)
	return annihilateWarMatterDate[name]["type"] + name + "的密度变为了" + annihilateWarMatterDate[name]["density"] + "！\n剩余行动力" + annihilateWarMatterDate[name]["action"]
}
function aw提升攻击力(name, delta) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (delta <= 0 || Math.floor(delta) != delta) {
		return "请输入正整数！"
	}
	if (delta > annihilateWarMatterDate[name]["action"]) {
		return "行动力不足！"
	}
	annihilateWarMatterDate[name]["attack"] += delta
	annihilateWarMatterDate[name]["action"] -= delta
	return annihilateWarMatterDate[name]["type"] + name + "的攻击力变为了" + annihilateWarMatterDate[name]["attack"] + "！\n剩余行动力" + annihilateWarMatterDate[name]["action"]
}

function aw提升防御力(name, delta) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (delta <= 0 || Math.floor(delta) != delta) {
		return "请输入正整数！"
	}
	if (delta > annihilateWarMatterDate[name]["action"]) {
		return "行动力不足！"
	}
	annihilateWarMatterDate[name]["defense"] += delta
	annihilateWarMatterDate[name]["action"] -= delta
	return annihilateWarMatterDate[name]["type"] + name + "的防御力变为了" + annihilateWarMatterDate[name]["defense"] + "！\n剩余行动力" + annihilateWarMatterDate[name]["action"]
}
function aw提升幸运(name, delta) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (delta <= 0 || Math.floor(delta) != delta) {
		return "请输入正整数！"
	}
	if (delta > annihilateWarMatterDate[name]["action"]) {
		return "行动力不足！"
	}
	if (annihilateWarMatterDate[name]["luck"] + delta > 5000) {
		return "幸运不能超过5000！"
	}
	annihilateWarMatterDate[name]["luck"] += delta
	annihilateWarMatterDate[name]["action"] -= delta
	return annihilateWarMatterDate[name]["type"] + name + "的幸运变为了" + annihilateWarMatterDate[name]["luck"] + "！\n剩余行动力" + annihilateWarMatterDate[name]["action"]
}

//事件操作
function aw攻击(name1, name2, times) {
	if (!annihilateWarMatterDate[name1]) {
		return "没有找到物质" + name1 + "！"
	}
	if (annihilateWarMatterDate[name1]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (!annihilateWarMatterDate[name2]) {
		return "没有找到物质" + name2 + "！"
	}
	if (name1 == name2) {
		return "不能攻击自己！"
	}
	if (times <= 0 || Math.floor(times) != times) {
		return "请输入正整数！"
	}
	if (times > annihilateWarMatterDate[name1]["action"]) {
		return "行动力不足！"
	}
	if (times * 10 >= annihilateWarMatterDate[name1]["mass"] - 1) {
		return "质量不足！"
	}
	let r1 = annihilateWarMatterDate[name1]["radius"]()
	let x1 = annihilateWarMatterDate[name1]["coordinate"][0]
	let y1 = annihilateWarMatterDate[name1]["coordinate"][1]
	let z1 = annihilateWarMatterDate[name1]["coordinate"][2]
	let l1 = annihilateWarMatterDate[name1]["luck"]
	let atk1 = annihilateWarMatterDate[name1]["attack"]
	let r2 = annihilateWarMatterDate[name2]["radius"]()
	let x2 = annihilateWarMatterDate[name2]["coordinate"][0]
	let y2 = annihilateWarMatterDate[name2]["coordinate"][1]
	let z2 = annihilateWarMatterDate[name2]["coordinate"][2]
	let l2 = annihilateWarMatterDate[name2]["luck"]
	let def2 = annihilateWarMatterDate[name2]["defense"]
	let d = distance3D(x1, y1, z1, x2, y2, z2) - (r1 + r2)
	let hit = 0
	let hitrate = 1 - d / (spaceRadius * 2)
	for (let i = 0; i < times; i++) {
		annihilateWarMatterDate[name1]["mass"] -= 10
		if (Math.random() < hitrate + l1 / 10000 - l2 / 10000) {
			hit++
			if (annihilateWarMatterDate[name1]["type"] == annihilateWarMatterDate[name2]["type"]) {
				annihilateWarMatterDate[name2]["mass"] += atk1
			}
			else {
				annihilateWarMatterDate[name2]["mass"] -= Math.max(1, atk1 - def2)
			}
		}
	}
	let str = ""
	str += annihilateWarMatterDate[name1]["type"] + name1 + "自损" + times * 10 + "质量，攻击" + annihilateWarMatterDate[name2]["type"] + name2 + "共" + times + "次，命中" + hit + "次，"
	if (annihilateWarMatterDate[name1]["type"] == annihilateWarMatterDate[name2]["type"]) {
		str += "为其增加了" + (hit * atk1) + "质量"
	}
	else {
		str += "使其减少了" + (hit * Math.max(1, atk1 - def2)) + "质量"
	}
	let log = "\n" + str
	annihilateWarLog.push(log)
	for (; annihilateWarLog.length > 10;) {
		annihilateWarLog.shift()
	}
	return str
}

function aw大灾变(name) {
	if (!annihilateWarMatterDate[name]) {
		return "没有找到物质" + name + "！"
	}
	if (annihilateWarMatterDate[name]["master"] != id) {
		return name + "不是你的物质！"
	}
	if (annihilateWarMatterDate[name]["action"] < 1000) {
		return "行动力不足！\n大灾变需要1000点行动力！"
	}
	annihilateWarMatterDate[name]["action"] -= 1000
	for (let key in annihilateWarMatterDate) {
		if (key == name) {
			continue
		}
		annihilateWarMatterDate[key]["mass"] -= annihilateWarMatterDate[key]["mass"] * 0.8
	}
	let log = "\n" + annihilateWarMatterDate[name]["type"] + name + "发动了大灾变"
	annihilateWarLog.push(log)
	for (; annihilateWarLog.length > 10;) {
		annihilateWarLog.shift()
	}
	return name + "：大灾变！"
}


//杂项
function shuffle(arr) {
	let tmpa = []
	for (; arr.length > 0;) {
		tmpa.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0])
	}
	return tmpa
}
