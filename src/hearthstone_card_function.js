function 炉石卡牌(name,nocardmark=true){
	let json=hscl[name]
	let rstr=""
	if(json){
		rstr+=json["法力值"]+" "+name+" "+hsClass(json["职业"])+" "+hsCardType(json["卡牌类型"])+" "+hsRare(json["稀有度"])+" "+json["扩展包"]+"\n"+json["效果"]
		switch(json["卡牌类型"]){
			case 1:rstr+="\n"+json["攻击力"]+"\/"+json["生命值"];break
			case 3:rstr+="\n"+json["攻击力"]+"\/"+json["耐久度"];break
			case 4:rstr+="\n"+json["护甲"]+"护甲";break
			default:break
		}
		if(json["类型"]){
			rstr+="\n*"+json["类型"]+"*"
		}
		rstr+="\n"+"----------\n"+json["背景"]
	}
	else{
		let keys=Object.keys(hscl)
		let maybecards=[]
		if(nocardmark){
			rstr+="没有找到"+name+"\uff0c如果确定遗漏\uff0c请联系天凤夕子添加。"
		}
		for(let i=0;i<keys.length;i++){
			if(keys[i].indexOf(name)!=-1&&keys[i]!=hscnn[name]){
				maybecards.push(keys[i])
			}
		}
		if(maybecards.length>1){
			maybecards=shuffle(maybecards)
		}
		if(hscnn[name]){
			if(hscnn[name].length>1){
				hscnn[name]=shuffle(hscnn[name])
			}
			maybecards=hscnn[name].concat(maybecards)
		}
		if(maybecards.length>0&&nocardmark){
			rstr+="\n你可能要找："
		}
		if(maybecards.length==1){
			if(nocardmark){
				rstr+="\n"
			}
			return rstr+炉石卡牌(maybecards[0],false)
		}
		if(type=="group"){
			for(let i=0;i<Math.min(maybecards.length,5);i++){
				if(nocardmark||i!=0){
					rstr+="\n"
				}
				rstr+=maybecards[i]
			}
			if(maybecards.length>5){
				rstr+="\n等"+maybecards.length+"张卡牌\uff08为避免刷屏\uff0c请私聊查看全部\uff09"
			}
		}
		else{
			for(let i=0;i<maybecards.length;i++){
				if(nocardmark||i!=0){
					rstr+="\n"
				}
				rstr+=maybecards[i]
			}
		}
	}
	return rstr
}

function 添加炉石卡牌绰号(name,nickname){
	if(hscnn[nickname]){
		hscnn[nickname].push(name)
	}
	else{
		hscnn[nickname]=[name]
	}
	return "现在"+name+"又叫做"+nickname+"了！"
}

function hsClass(id){
	switch(id){
		case 0:return"中立"
		case 1:return"德鲁伊"
		case 2:return"猎人"
		case 3:return"法师"
		case 4:return"圣骑士"
		case 5:return"牧师"
		case 6:return"潜行者"
		case 7:return"萨满祭司"
		case 8:return"术士"
		case 9:return"战士"
		case 10:return"恶魔猎手"
		case 101:return"中立(污手党)"
		case 102:return"中立(暗金教)"
		case 103:return"中立(玉莲帮)"
		default:return""
	}
}
function hsCardType(id){
	switch(id){
		case 1:return"随从"
		case 2:return"法术"
		case 21:return"法术"
		case 3:return"武器"
		case 4:return"英雄"
		default:return""
	}
}
function hsRare(id){
	switch(id){
		case 0:return"基本"
		case 1:return"普通"
		case 2:return"稀有"
		case 3:return"史诗"
		case 4:return"传说"
		default:return""
	}
}

function shuffle(arr){
	let tmpa=[]
	for(;arr.length>0;){
		tmpa.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0])
	}
	return tmpa
}