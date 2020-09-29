function card_to_unicode(t)
{
    var str2unicode = {};
    str2unicode["1z"] = String.fromCodePoint(126976);
    str2unicode["2z"] = String.fromCodePoint(126977);
    str2unicode["3z"] = String.fromCodePoint(126978);
    str2unicode["4z"] = String.fromCodePoint(126979);
    str2unicode["7z"] = String.fromCodePoint(126980);
    str2unicode["6z"] = String.fromCodePoint(126981);
    str2unicode["5z"] = String.fromCodePoint(126982);
    str2unicode["8z"] = String.fromCodePoint(127019); //牌背
    str2unicode["0z"] = " ";//空格
    var mjUnicode = 126983;
    for (let j=0,mjType=["m","s","p"];j<3;j++) {
        for (let i = 1; i < 10; i++, mjUnicode++) {
            str2unicode[i+mjType[j]]=String.fromCodePoint(mjUnicode);
        }
    }
    t = t.replace(/\s/g, "0z").replace(/[#＃]/g, "8z").replace(/[东東]/g, "1z").replace(/南/g, "2z").replace(/西/g, "z").replace(/北/g, "4z").replace(/白/g, "5z").replace(/[发發発]/g, "6z").replace(/中/g, "7z").replace(/(\d)(\d{0,8})(\d{0,8})(\d{0,8})(\d{0,8})(\d{0,8})(\d{0,8})(\d{8})(m|p|s|z)/g, "$1$9$2$9$3$9$4$9$5$9$6$9$7$9$8$9").replace(/(\d?)(\d?)(\d?)(\d?)(\d?)(\d?)(\d)(\d)(m|p|s|z)/g, "$1$9$2$9$3$9$4$9$5$9$6$9$7$9$8$9").replace(/(m|p|s|z)(m|p|s|z)+/g, "$1").replace(/^[^\d]/, "");
    var returnStr = "";
    for (let i = 0; i < t.length; i += 2) {
        let hai = t.substr(i, 2);
        if (hai == "0m" || hai == "0p" || hai == "0s") {
            returnStr += "" + str2unicode[hai.replace("0", "5")] + "";
        } else {
            returnStr += (typeof str2unicode[hai] == 'undefined') ? '' : str2unicode[hai];
        }
    }
    return returnStr;
}


function new_mountain()
{
	let mountain=[];
	for(let i=0;i<136;++i)
		mountain.push(i);
	return mountain;
}

function create_hand()
{
	if(px_dict[id]==null)
	{
		px_dict[id]={"mountain":new_mountain(),"hand":JSON.parse(JSON.stringify(basic_hand)),"kong":[],"hold":-1,"dora":[],"in_dora":[],"red_dora":[false,false,false],"hold_dora":false,"turn":0,"reached":false,"tsumo":false,"seat":random(0,3),"wind":random(0,3),"reach_turn":-1};
		return new_hand()+"\n"+show_hand()+"\n"+choice_hand();
	}
	return nickname+"的上次练习还没有结束哟~\n"+show_hand()+"\n"+choice_hand();
}

function recreate_hand()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	px_dict[id]=null;
	px_dict[id]={"mountain":new_mountain(),"hand":JSON.parse(JSON.stringify(basic_hand)),"kong":[],"hold":-1,"dora":[],"in_dora":[],"red_dora":[false,false,false],"turn":0,"reached":false,"tsumo":false,"seat":random(0,3),"wind":random(0,3),"reach_turn":-1};
		return nickname+"放弃了上次的练习哟~\n"+new_hand()+"\n"+show_hand()+"\n"+choice_hand();
}

function end_hand()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	let hand_string=show_hand();
	px_dict[id]=null;
	return nickname+"的练习结束了哟~\n"+"上次的最终结果是:"+hand_string;
}

function new_hand()
{
	for(let i=0;i<14;++i)
	{
		let random_choose=random(0,px_dict[id]["mountain"].length);
		if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
			px_dict[id]["red_dora"][Math.floor(px_dict[id]["mountain"][random_choose]/36)]=true;
		px_dict[id]["hand"][Math.floor(px_dict[id]["mountain"][random_choose]/36)][Math.floor(px_dict[id]["mountain"][random_choose]/4)%9]+=1;
		px_dict[id]["mountain"].splice(random_choose,1);
	}
	let dora=random(0,px_dict[id]["mountain"].length);
	px_dict[id]["dora"].push(Math.floor(px_dict[id]["mountain"][dora]/4));
	px_dict[id]["mountain"].splice(dora,1);
	return "新的手牌已作成！";
}

function choice_hand()
{
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~";
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_turns)
		return "流局了呢~\n"+px_more_turns()+"\n("+z_crr[px_dict[id]["wind"]]+"場"+z_crr[px_dict[id]["seat"]]+"家)还剩"+(max_turns+px_dict[id]["dora"].length-px_dict[id]["turn"])+"巡~";
	let str="";
	if(px_dict[id]["reached"])
		str="立直中，请摸切";
	else
		str="请选择切牌";
	if(kongable(px_dict[id]["hand"],px_dict[id]["hold"]))
		str+="或开杠";
	if(!px_dict[id]["reached"]&&reachable(px_dict[id]["hand"],px_dict[id]["hold"]))
		str+="或立直";
	if(tsumoable(px_dict[id]["hand"],px_dict[id]["hold"]))
		str+="或自摸";
	return str+"~\n("+z_crr[px_dict[id]["wind"]]+"場"+z_crr[px_dict[id]["seat"]]+"家)还剩"+(max_turns+px_dict[id]["dora"].length-px_dict[id]["turn"])+"巡~";
}

function parse_card(card_number)
{
	if(card_number<0||card_number>33)
		return [-1,-1];
	return [Math.floor(card_number/9),card_number%9];
}

function px_kong(card_name)
{
	if(invalid_card_name(card_name))
		return "这是个什么东西呀？";
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	let card_number=((card_name[0]=='0')?4:(card_name[0]-'1'));
	let card_color=mpsz.indexOf(card_name[1]);
	let kong_list=konglist();
	if(kong_list.indexOf(card_color*9+card_number)<0)
		return "不能用这张牌开杠呢~";
	px_dict[id]["kong"].push(card_color*9+card_number);
	px_dict[id]["hand"][card_color][card_number]=0;
	let random_choose=random(0,px_dict[id]["mountain"].length);
	px_dict[id]["hold"]=Math.floor(px_dict[id]["mountain"][random_choose]/4);
	if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
		px_dict[id]["hold_dora"]=true;
	else
		px_dict[id]["hold_dora"]=false;
	px_dict[id]["mountain"].splice(random_choose,1);
	let new_dora=random(0,px_dict[id]["mountain"].length);
	px_dict[id]["dora"].push(Math.floor(px_dict[id]["mountain"][new_dora]/4));
	return nickname+"杠了"+card_name+"\n"+show_hand()+"\n"+choice_hand();
}

function hold_kongable(hand,hold,reached)
{
	if(hold<0)
		return false;
	if(hand[Math.floor(hold/9)][hold%9]<3)
		return false;
	if(reached)
	{
		let reached_hand=JSON.parse(JSON.stringify(hand));
		reached_hand[Math.floor(hold/9)][hold%9]=0;
		return JSON.stringify(paili_13(reached_hand))==JSON.stringify(paili_13(hand));
	}
	return true;
}

function konglist()
{
	if(px_dict[id]["reached"]&&hold_kongable(px_dict[id]["hand"],px_dict[id]["hold"],true))
		return [px_dict[id]["hold"]];
	let kong_list=[];
	if(hold_kongable(px_dict[id]["hand"],px_dict[id]["hold"],false))
		kong_list.push(px_dict[id]["hold"]);
	for(let i=0;i<4;++i)
		for(let j=0;j<((i==3)?7:9);++j)
			if(px_dict[id]["hand"][i][j]==4)
				kong_list.push(i*9+j);
	return kong_list;
}

function kongable()
{
	return konglist().length>0;
}

function reachable(hand,hold)
{
	if(px_dict[id]["reached"])
		return false;
	if(hold<0)
		return santen(hand)<=1;
	let check_hold=parse_card(hold);
	let check_hand=JSON.parse(JSON.stringify(hand));
	check_hand[check_hold[0]][check_hold[1]]+=1;
	return santen(check_hand)<=1;
}

function tsumoable(hand,hold)
{
	if(hold<0)
		return santen(hand)<=0;
	let check_hold=parse_card(hold);
	let check_hand=JSON.parse(JSON.stringify(hand));
	check_hand[check_hold[0]][check_hold[1]]+=1;
	return santen(check_hand)<=0;
}

function px_more_turns()
{
	return "不过你可以选择再来一巡哦~(详情输入\"mj切牌帮助\"查看帮助)";
}

function invalid_card_name(name)
{
	if(name[0]-'0'<0||name[0]-'0'>9)
		return true;
	if(mpsz.indexOf(name[1])<0)
		return true;
	if(name[2]!=null)
		return true;
	if(name=="8z"||name=="9z"||name=="0z")
		return true;
	return false;
}

function one_more_turn(card_name)
{
	if(invalid_card_name(card_name))
		return "这是个什么东西呀？";
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length<max_turns)
		return "还没有流局了呢~\n"+show_hand(id)+"\n请正常切牌哟~";
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_possible_turns)
		return "够了啦，别再来啦，就这么流局吧~\n"+show_hand();
	if(px_dict[id]["reached"])
		return "立直后不自摸只能摸切哦~\n"+show_hand()+"\n"+choice_hand();
	let card_number=((card_name[0]=='0')?4:(card_name[0]-'1'));
	let card_color=mpsz.indexOf(card_name[1]);
	if(card_name[0]!='0'||px_dict[id]["red_dora"][card_color]||px_dict[id]["hold_dora"])
	{
		if((JSON.stringify([card_color][card_number])==JSON.stringify(parse_card(px_dict[id]["hold"])))&&(card_name[0]!='0'||px_dict[id]["hold_dora"]))
			return change_hold_card()+"\n"+show_hand()+"\n"+choice_hand();
		if(px_dict[id]["hand"][card_color][card_number]>0)
			return change_hand_card(card_color,card_number,card_name[0]=='0')+"\n"+show_hand()+"\n"+choice_hand();
	}
	return "没有找到这张牌呢~"+"\n"+show_hand()+"\n"+choice_hand();
}

function one_more_pass()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length<max_turns)
		return "还没有流局了呢~\n"+show_hand()+"\n请正常摸切哟~";
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_possible_turns)
		return "够了啦，别再来啦，就这么流局吧~\n"+show_hand();
	if(px_dict[id]["turn"]==0)
		return "第一巡不能摸切哦~\n"+show_hand()+"\n"+choice_hand();
	return change_hold_card()+"\n"+show_hand()+"\n"+choice_hand();
}

function px_pass()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_turns)
		return "已经流局了呢~\n"+show_hand()+"\n"+px_more_turns();
	if(px_dict[id]["turn"]==0)
		return "第一巡不能摸切哦~\n"+show_hand()+"\n"+choice_hand();
	return change_hold_card()+"\n"+show_hand()+"\n"+choice_hand();
}

function px_turn(card_name)
{
	if(invalid_card_name(card_name))
		return "这是个什么东西呀？";
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_turns)
		return "已经流局了呢~\n"+show_hand()+"\n"+px_more_turns();
	if(px_dict[id]["reached"])
		return "立直后不自摸只能摸切哦~\n"+show_hand()+"\n"+choice_hand();
	let card_number=((card_name[0]=='0')?4:(card_name[0]-'1'));
	let card_color=mpsz.indexOf(card_name[1]);
	if(card_name[0]!='0'||px_dict[id]["red_dora"][card_color]||px_dict[id]["hold_dora"])
	{
		if((JSON.stringify([card_color,card_number])==JSON.stringify(parse_card(px_dict[id]["hold"])))&&(card_name[0]!='0'||px_dict[id]["hold_dora"]))
			return change_hold_card()+"\n"+show_hand()+"\n"+choice_hand();
		if(px_dict[id]["hand"][card_color][card_number]>0)
			return change_hand_card(card_color,card_number,card_name[0]=='0')+"\n"+show_hand()+"\n"+choice_hand();
	}
	return "没有找到这张牌呢~"+"\n"+show_hand()+"\n"+choice_hand();
}
d
function px_reach(card_name)
{
	if(invalid_card_name(card_name))
		return "这是个什么东西呀？";
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_turns)
		return "已经流局了呢~\n"+show_hand()+px_more_turns();
	if(px_dict[id]["reached"])
		return "已经立直了呢~\n"+show_hand()+choice_hand();
	let card_number=((card_name[0]=='0')?4:(card_name[0]-'1'));
	let card_color=mpsz.indexOf(card_name[1]);
	if(card_name[0]!='0'||px_dict[id]["red_dora"][card_color]||px_dict[id]["hold_dora"])
	{
		if((JSON.stringify([card_color,card_number])==JSON.stringify(parse_card(px_dict[id]["hold"])))&&(card_name[0]!='0'||px_dict[id]["hold_dora"]))
			return change_hold_card_reach()+"\n"+show_hand()+"\n"+choice_hand();
		if(px_dict[id]["hand"][card_color][card_number]>=0)
			return change_hand_card_reach(card_color,card_number,card_name[0]=='0')+"\n"+show_hand()+"\n"+choice_hand();
	}
	return "没有找到这张牌呢~"+"\n"+show_hand()+"\n"+choice_hand();
}

function px_tsumo()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand();
	if(tsumoable(px_dict[id]["hand"],px_dict[id]["hold"]))
	{
		px_dict[id]["tsumo"]=true;
		if(px_dict[id]["reached"])
			for(let i=0;i<px_dict[id]["dora"].length;++i)
		{
			let random_choose=random(0,px_dict[id]["mountain"].length);
			px_dict[id]["in_dora"].push(Math.floor(px_dict[id]["mountain"][random_choose]/4));
			px_dict[id]["mountain"].splice(random_choose,1);
		}
		return "恭喜"+nickname+"自摸啦！\n"+show_hand();
	}
	return "还不能自摸哦~\n"+show_hand()+"\n"+choice_hand();
}

function px_result(id)
{
	let dora=0,red_dora=px_dict[id]["red_dora"][0]+px_dict[id]["red_dora"][1]+px_dict[id]["red_dora"][2],in_dora=0;
	for(let i=0;i<px_dict[id]["dora"].length;++i)
	{
		let cor_dora=dora_correspond(px_dict[id]["dora"][i]);
		dora+=px_dict[id]["hand"][Math.floor(cor_dora/9)][cor_dora%9];
		if(px_dict[id]["hold"]==cor_dora)
			dora+=1;
	}
	for(let i=0;i<px_dict[id]["in_dora"].length;++i)
	{
		let cor_dora=dora_correspond(px_dict[id]["in_dora"][i]);
		in_dora+=px_dict[id]["hand"][Math.floor(cor_dora/9)][cor_dora%9];
		if(px_dict[id]["hold"]==cor_dora)
			in_dora+=1;
	}
	return paili_count(px_dict[id]["hand"],px_dict[id]["hold"],dora,red_dora,in_dora,0,[],[],px_dict[id]["kong"],true,px_dict[id]["seat"],px_dict[id]["wind"],px_dict[id]["reached"],px_dict[id]["reach_turn"]==0,px_dict[id]["turn"]==(px_dict[id]["reach_turn"]+1),px_dict[id]["turn"]-px_dict[id]["dora"].length==max_turns,false,false,px_dict[id]["turn"]==0);
}

function dora_correspond(card)
{
	if(card<27&&card>=0)
		return (card%9==8)?(card-8):(card+1);
	switch(card)
	{
		case 27:return 28;
		case 28:return 29;
		case 29:return 30;
		case 30:return 27;
		case 31:return 32;
		case 32:return 33;
		case 33:return 31;
		default:return -1;
	}
}

function px_check_hand()
{
	if(px_dict[id]==null)
		return "请开始练习切牌~";
	if(px_dict[id]["tsumo"])
		return nickname+"已经自摸了哦~\n"+show_hand()+"\n共使用了"+px_dict[id]["turn"]+"巡~";
	if(px_dict[id]["turn"]-px_dict[id]["dora"].length>=max_turns)
		return "已经流局了呢~\n"+show_hand()+"\n";;
	return show_hand()+"\n"+choice_hand();
}

function change_hand_card(color,number,red_dora)
{
	let random_choose=random(0,px_dict[id]["mountain"].length);
	if(px_dict[id]["hold"]>=0)
	{
		let hold_card=parse_card(px_dict[id]["hold"]);
		px_dict[id]["hand"][hold_card[0]][hold_card[1]]+=1;
		if(px_dict[id]["hold_dora"])
			px_dict[id]["red_dora"][hold_card[0]]=true;
	}
	px_dict[id]["hand"][color][number]-=1;
	px_dict[id]["turn"]+=1;
	if(red_dora)
		px_dict[id]["red_dora"][color]=false;
	px_dict[id]["hold"]=Math.floor(px_dict[id]["mountain"][random_choose]/4);
	if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
		px_dict[id]["hold_dora"]=true;
	else
		px_dict[id]["hold_dora"]=false;
	px_dict[id]["mountain"].splice(random_choose,1);
	return nickname+"切出了"+card_to_unicode((number+1)+mpsz[color]);
}

function change_hand_card_reach(color,number,red_dora)
{
	let random_choose=random(0,px_dict[id]["mountain"].length);
	let check_reach_cards=JSON.parse(JSON.stringify(px_dict[id]["hand"]));
	check_reach_cards[color][number]-=1;
	if(px_dict[id]["hold"]>=0)
	{
		let hold_card=parse_card(px_dict[id]["hold"]);
		check_reach_cards[hold_card[0]][hold_card[1]]+=1;
	}
	if(santen(check_reach_cards)>1)
		return nickname+"不能切这张牌立直哦~";
	px_dict[id]["hand"][color][number]-=1;
	if(px_dict[id]["hold"]>=0)
	{
		let hold_card=parse_card(px_dict[id]["hold"]);
		px_dict[id]["hand"][hold_card[0]][hold_card[1]]+=1;
		if(px_dict[id]["hold_dora"])
			px_dict[id]["red_dora"][hold_card[0]]=true;
	}
	px_dict[id]["reach_turn"]=px_dict[id]["turn"];
	px_dict[id]["turn"]+=1;
	if(red_dora)
		px_dict[id]["red_dora"][color]=false;
	px_dict[id]["hold"]=Math.floor(px_dict[id]["mountain"][random_choose]/4);
	if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
		px_dict[id]["hold_dora"]=true;
	else
		px_dict[id]["hold_dora"]=false;
	px_dict[id]["mountain"].splice(random_choose,1);
	px_dict[id]["reached"]=true;
	return nickname+"切出了"+card_to_unicode((number+1)+mpsz[color])+"立直";
}

function change_hold_card()
{
	let random_choose=random(0,px_dict[id]["mountain"].length);
	let hold_card=parse_card(px_dict[id]["hold"]);
	px_dict[id]["turn"]+=1;
	px_dict[id]["hold"]=Math.floor(px_dict[id]["mountain"][random_choose]/4);
	if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
		px_dict[id]["hold_dora"]=true;
	else
		px_dict[id]["hold_dora"]=false;
	px_dict[id]["mountain"].splice(random_choose,1);
	return nickname+"切出了"+card_to_unicode((hold_card[1]+1)+mpsz[hold_card[0]]);
}

function change_hold_card_reach()
{
	if(santen(px_dict[id]["hand"])>1)
		return nickname+"不能切这张牌立直哦~";
	let random_choose=random(0,px_dict[id]["mountain"].length);
	let hold_card=parse_card(px_dict[id]["hold"]);
	px_dict[id]["reach_turn"]=px_dict[id]["turn"];
	px_dict[id]["turn"]+=1;
	px_dict[id]["hold"]=Math.floor(px_dict[id]["mountain"][random_choose]/4);
	if(px_dict[id]["mountain"][random_choose]<108&&px_dict[id]["mountain"][random_choose]%36==16)
		px_dict[id]["hold_dora"]=true;
	else
		px_dict[id]["hold_dora"]=false;
	px_dict[id]["mountain"].splice(random_choose,1);
	px_dict[id]["reached"]=true;
	return nickname+"切出了"+card_to_unicode((hold_card[1]+1)+mpsz[hold_card[0]])+"立直";
}

function show_hand()
{
	let hand_string="";
	let dora_string="";
	let kong_string="";
	for(let i=0;i<4;++i)
		for(let j=0;j<((i==3)?7:9);++j)
			for(let k=0;k<px_dict[id]["hand"][i][j];++k)
				hand_string+=((j==4&k==0&&px_dict[id]["red_dora"][i])?0:(j+1))+mpsz[i];
	for(let i=0;i<px_dict[id]["dora"].length;++i)
		dora_string+=((px_dict[id]["dora"][i]%9)+1)+mpsz[Math.floor(px_dict[id]["dora"][i]/9)];
	for(let i=0;i<px_dict[id]["kong"].length;++i)
		kong_string+="#"+((px_dict[id]["kong"][i]%9)+1)+mpsz[Math.floor(px_dict[id]["kong"][i]/9)]+((px_dict[id]["kong"][i]%9)+1)+mpsz[Math.floor(px_dict[id]["kong"][i]/9)]+"#";
	return nickname+"的手牌是:\n"+card_to_unicode(hand_string)+" "+card_to_unicode((px_dict[id]["hold"]<0)?"":(((px_dict[id]["hold"]%9)+1)+mpsz[Math.floor(px_dict[id]["hold"]/9)]))+" "+card_to_unicode(kong_string)+"\n宝牌指示牌有:"+card_to_unicode(dora_string)+((px_dict[id]["reached"]&&px_dict[id]["tsumo"])?"\n里宝指示牌有:"+in_dora():"")+"\n"+((px_dict[id]["tsumo"])?px_result(id):"");
}

function in_dora()
{
	let in_dora_string="";
	for(let i=0;i<px_dict[id]["in_dora"].length;++i)
		in_dora_string+=(px_dict[id]["in_dora"][i]%9+1)+mpsz[Math.floor(px_dict[id]["in_dora"][i]/9)];
	return card_to_unicode(in_dora_string);
}