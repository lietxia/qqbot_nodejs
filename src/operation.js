hscl_cost2 = {};
for (let i in hscl)
	if (hscl[i]["卡牌类型"] == 1 && hscl[i]["法力值"] == 2)
		hscl_cost2[i] = hscl[i];
fs.writeFileSync('./hscl_cost2.js', "hscl_cost2=" + JSON.stringify(hscl_cost2));