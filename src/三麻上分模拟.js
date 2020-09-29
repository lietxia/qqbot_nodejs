function sm_function(order_string)
{
	let order_section=[""],section_itt=0;
	for(let i=0;i<order_string.length;++i)
		if((order_string[i]==" ")||(order_string[i]==",")||(order_string[i]=="，")||(order_string[i]=="；")||(order_string[i]==";"))
			order_section[++section_itt]="";
		else
			order_section[section_itt]+=order_string[i];
	for(let i=2;i<order_section.length;++i)
	{
		if(order_section[i]=="")
		{
			order_section.splice(i--,1);
			continue;
		}
		order_section[i]=parse_if_number(order_section[i]);
		if(typeof(order_section[i])!="number")
			return "";
	}
	switch(order_section[0])
	{
		case "创建":switch(order_section.length)
			{
				case 2:return 创建sm玩家(order_section[1]);
				case 3:return 创建sm玩家(order_section[1],order_section[2]);
				case 4:return 创建sm玩家(order_section[1],order_section[2],order_section[3]);
				case 5:return 创建sm玩家(order_section[1],order_section[2],order_section[3],order_section[4]);
				case 6:return 创建sm玩家(order_section[1],order_section[2],order_section[3],order_section[4],order_section[5]);
				default:return "";
			}
		case "查看":if(order_section.length!=2)return "";if(order_section[1]=="排行榜")return 查看sm排名();return 查看sm玩家(order_section[1]);
		case "牌谱":if(order_section.length!=2)return "";return 牌谱sm玩家(order_section[1]);
		case "删除":if(order_section.length!=2)return "";return 删除sm玩家(order_section[1]);
		case "帮助":if(order_section.length>1)return "";return sm_player_help;
		case "重启":if(order_section.length>1)return "";if(ownerlist.indexOf(id)<0)return "只有世界上最可爱的天凤夕子可以重启~";return sm_restart();
		case "清理":if(order_section.length>1)return "";if(ownerlist.indexOf(id)<0)return "只有世界上最可爱的天凤夕子可以清理~";return sm_clear_log();
		case "速率":if(order_section.length>2)return "";if(ownerlist.indexOf(id)<0)return "只有世界上最可爱的天凤夕子可以调匹配速率~";sm_match_speed=order_section[1];clearInterval(sm_match_ID);sm_match_ID=setInterval(sm匹配,Math.ceil((sm_match_speed*1000)/sm_rank_list.length));return "现在平均每过"+sm_match_speed+"秒会全员匹配一次~";
		case "历史":if(order_section.length>2)return "";if(order_section.length==2)return server_results(order_section[1]);else return server_results();
		default:return "";
	}
}

sm_player_help=`三麻上分模拟指令:
sm创建 ID -> 创建新账号
sm查看 ID -> 查看账号
sm查看 排行榜 -> 查看前10名
sm牌谱 ID -> 查看该账号的对战记录
sm删除 ID -> 删除你的账号
sm历史 -> 查看服务器历次魂天名单和数据
sm帮助 -> 查看此帮助
p.s. 四项基础数值可以在创建时按照顺序输入调整，数值必须在10-90之间(第三项不能超过80)，数值之和必须是240~
p.p.s 每次服务器出现10个魂天后会重启，保留之前账号的倾向从初心0pt重新开始冲分~
p.p.p.s 模拟的具体过程可能有微调，每次重启后环境可能都不一样~`

function server_results(n=1)
{
	return "最近第"+n+"次服务器记录:\n"+sm_server_result[sm_server_result.length-n]+"\n一共有"+sm_server_result.length+"次记录~"
}

function 牌谱sm玩家(ID,n=5)
{
	if(sm_player_status_dict[ID]?false:true)
		return "没有这个玩家~";
	if(sm_player_log_list[ID]?false:true)
		return "该玩家没有对战记录~";
	let result_str=ID+"的最近"+n+"次战果:";
	for(let i=sm_player_log_list[ID].length-1;i>=sm_player_log_list[ID].length-n;--i)
		if(i<0)
			result_str+="\n未记录";
		else if(sm_all_log_list[sm_player_log_list[ID][i]])
			result_str+="\n记录"+sm_player_log_list[ID][i]+":\n"+sm_all_log_list[sm_player_log_list[ID][i]];
		else
			result_str+="\n记录"+sm_player_log_list[ID][i]+":该牌谱可能已经被清理~\n";
	return result_str;
}

function sm_player_status()
{
	return "sm_match_speed="+sm_match_speed+"\nsm_player_status_dict="+JSON.stringify(sm_player_status_dict)+"\nsm_rank_list="+JSON.stringify(sm_rank_list)+"\nsm_match_list="+JSON.stringify(sm_match_list)+"\nsm_all_log_list="+JSON.stringify(sm_all_log_list)+"\nsm_player_log_list="+JSON.stringify(sm_player_log_list);
}

for(let i=0;i<sm_rank_list.length;++i)
进入sm等待(sm_rank_list[i]);

function 创建sm玩家(ID,attack="undefined",defence="undefined",speed="undefined",menqing="undefined")
{
	if(ID=="排行榜"||(ID.substr(0,4)=="爱的雀士"&&ownerlist.indexOf(id)<0))
		return "这个关键词不能用作名称呢~";
	if(sm_player_status_dict[ID])
		return "重名了……";
	if(attack=="undefined"&&defence=="undefined"&&speed=="undefined"&&menqing=="undefined")
	{
		do
		{
			attack=random(10,90);
			defence=random(10,120-attack);
			speed=random(10,180-attack-defence);
			menqing=240-attack-defence-speed;
		}
		while((attack>90)||(defence>90)||(speed>80)||(menqing>90)||(attack<10)||(defence<10)||(speed<10)||(menqing<10));
	}
	if((attack+defence+speed+menqing!=240)||(attack>90)||(defence>90)||(speed>80)||(menqing>90)||(attack<10)||(defence<10)||(speed<10)||(menqing<10))
		return "这个数据不正常，重新创建试试吧~";
	sm_player_status_dict[ID]={"creator":id,"creator_nickname":nickname,"attack":attack,"defence":defence,"speed":speed,"menqing":menqing,"first":0,"second":0,"third":0,"fly":0,"total_point":0,"win_times":0,"lose_times":0,"tsumo_times":0,"total_times":0,"total_win_turn":0,"reach_times":0,"fulu_times":0,"pt":0,"level":0,"max_lianzhuang":0};
	sm_rank_list.push(ID);
	return "创建完成!"+查看sm玩家(ID)+"\n"+进入sm等待(ID);
}

function 删除sm玩家(ID)
{
	if(sm_player_status_dict[ID]?false:true)
		return "没有这个玩家~";
	if(sm_player_status_dict[ID]["creator"]!=id)
		return "这不是你的账号哦~";
	delete sm_player_status_dict[ID];
	sm_rank_list.splice(sm_rank_list.indexOf(ID),1);
	for(let i=0;i<5;++i)
	{
		let sm_place=sm_match_list[i].indexOf(ID);
		if(sm_place>=0)
			sm_match_list[i].splice(sm_place,1);
	}
	return "玩家"+ID+"已被封号~";
}

function 进入sm等待(ID)
{
	if(sm_player_status_dict[ID]?false:true)
		return "玩家不存在……";
	for(let i=0;i<5;++i)
		if(sm_match_list[i].indexOf(ID)>=0)
			return "玩家正在等待……";
	let room=Math.floor(sm_player_status_dict[ID]["level"]/3)-random_dedecrease(0,2);
	if(room>4)
		room=4;
	if(room<0)
		room=0;
	sm_match_list[room].push(ID);
	return ID+"进入"+room_name[room]+"等待!";
}

function 查看sm排名(n=10)
{
	sm_rank_list.sort((a,b)=>((sm_player_status_dict[a]["level"]==sm_player_status_dict[b]["level"])?(sm_player_status_dict[b]["pt"]-sm_player_status_dict[a]["pt"]):(sm_player_status_dict[b]["level"]-sm_player_status_dict[a]["level"])));
	let rank_str="三麻排名:\n";
	for(let i=0;i<n&&i<sm_rank_list.length;++i)
		rank_str+=(i+1)+". "+sm_rank_list[i]+`	`+level_list[sm_player_status_dict[sm_rank_list[i]]["level"]]+" "+sm_player_status_dict[sm_rank_list[i]]["pt"]+"pt\n";
	return rank_str+((n<sm_rank_list.length)?"……":"");
}

function 查看sm玩家(ID)
{
	if(sm_player_status_dict[ID])
		return ID+"(创建者:"+((ID.substr(0,4)=="爱的雀士")?"默认":sm_player_status_dict[ID]["creator_nickname"])+")的当前数据是:"+level_list[sm_player_status_dict[ID]["level"]]+" "+sm_player_status_dict[ID]["pt"]+"pt\n凹大倾向:"+sm_player_status_dict[ID]["attack"]+"\n防御倾向:"+sm_player_status_dict[ID]["defence"]+"\n速度倾向:"+sm_player_status_dict[ID]["speed"]+"\n门清倾向:"+sm_player_status_dict[ID]["menqing"]+"\n南风场 "+(sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+"战 被飞率:"+cal_percent(sm_player_status_dict[ID]["fly"],sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+"\n一位率:"+cal_percent(sm_player_status_dict[ID]["first"],sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+" 二位率:"+cal_percent(sm_player_status_dict[ID]["second"],sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+" 三位率:"+cal_percent(sm_player_status_dict[ID]["third"],sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+"\n平均顺位:"+cal_average(sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]*2+sm_player_status_dict[ID]["third"]*3,sm_player_status_dict[ID]["first"]+sm_player_status_dict[ID]["second"]+sm_player_status_dict[ID]["third"])+" 平均打点:"+cal_average(sm_player_status_dict[ID]["total_point"],sm_player_status_dict[ID]["win_times"])+" 和了巡数:"+cal_average(sm_player_status_dict[ID]["total_win_turn"],sm_player_status_dict[ID]["win_times"])+"\n放铳率:"+cal_percent(sm_player_status_dict[ID]["lose_times"],sm_player_status_dict[ID]["total_times"])+" 和牌率:"+cal_percent(sm_player_status_dict[ID]["win_times"],sm_player_status_dict[ID]["total_times"])+" 自摸率:"+cal_percent(sm_player_status_dict[ID]["tsumo_times"],sm_player_status_dict[ID]["win_times"])+"\n立直率:"+cal_percent(sm_player_status_dict[ID]["reach_times"],sm_player_status_dict[ID]["total_times"])+" 副露率:"+cal_percent(sm_player_status_dict[ID]["fulu_times"],sm_player_status_dict[ID]["total_times"])+" 最大连庄:"+sm_player_status_dict[ID]["max_lianzhuang"];
	else
		return "没有这个玩家……";
}

function sjsmqs()
{
	let sm_mountain=[],smqs_str="";
	for(let i=0;i<108;++i)
		sm_mountain.push(i);
	for(let j=0;j<14;++j)
	{
		let choice_place=random(0,sm_mountain.length);
		let choice_card=Math.floor(sm_mountain[choice_place]/4);
		sm_mountain.splice(choice_place,1);
		switch(choice_card)
		{
			case 25:smqs_str+="1m";break;
			case 26:smqs_str+="9m";break;
			default:smqs_str+=(choice_card%9+1)+mpsz[Math.floor(choice_card/9)+1];
		}
	}
	return smqs_str;
}

function sjsmxt()
{
	return santen(convert_to_card(sjsmqs()));
}

function determine_fan(attack,fulu=0)
{
	let fan=random(1,6);
	if(random_bool(10**(-15)))
		return 78;
	if(random_bool(10**(-13)))
		return 65;
	if(random_bool(10**(-10)))
		return 52;
	if(random_bool(10**(-8)))
		return 39;
	if(random_bool(10**(-5)))
		return 26;
	if(random_bool(10**(-1.9)))
		return 13;
	for(let i=0;i<25;++i)
		if(random_bool((attack/110)**3))
			fan+=1;
	fan=Math.ceil(fan/(1+fulu*0.2))+2;
	if(fan<=0)
		fan=1;
	return fan;
}

function 自摸模拟(player_1,player_2,player_3,start_player,win_player,fulu_amount)
{
	let player_list=[player_1,player_2,player_3];
	let player_points=[0,0,0];
	let fu=random_decrease(2,9)*10;
	let fan=determine_fan((sm_player_status_dict[player_list[win_player]]["attack"]+sm_player_status_dict[player_list[win_player]]["menqing"])/2,fulu_amount);
	let jizhundian=mj_suandian(fu*(2**(2+fan)),fan);
	if(start_player==win_player)
	{
		player_points[win_player]+=2*Math.ceil(2*jizhundian/100)*100;
		player_points[(win_player+1)%3]-=Math.ceil(2*jizhundian/100)*100;
		player_points[(win_player+2)%3]-=Math.ceil(2*jizhundian/100)*100;
	}
	else if(((win_player+1)%3)==start_player)
	{
		player_points[win_player]+=Math.ceil(1*jizhundian/100)*100+Math.ceil(2*jizhundian/100)*100;
		player_points[(win_player+1)%3]-=Math.ceil(2*jizhundian/100)*100;
		player_points[(win_player+2)%3]-=Math.ceil(1*jizhundian/100)*100;
	}
	else
	{
		player_points[win_player]+=Math.ceil(1*jizhundian/100)*100+Math.ceil(2*jizhundian/100)*100;
		player_points[(win_player+1)%3]-=Math.ceil(1*jizhundian/100)*100;
		player_points[(win_player+2)%3]-=Math.ceil(2*jizhundian/100)*100;
	}
	sm_player_status_dict[player_list[win_player]]["win_times"]+=1;
	sm_player_status_dict[player_list[win_player]]["tsumo_times"]+=1;
	sm_player_status_dict[player_list[win_player]]["total_points"]+=player_points[win_player]
	return player_points;
}


function 荣和模拟(player_1,player_2,player_3,start_player,lose_player,win_player,fulu_amount)
{
	let player_list=[player_1,player_2,player_3];
	let other_player=3-lose_player-win_player;
	let player_points=[0,0,0];
	let fu=random_decrease(3,9)*10;
	let fan=determine_fan((sm_player_status_dict[player_list[win_player]]["attack"]+sm_player_status_dict[player_list[win_player]]["menqing"])/2,fulu_amount);
	let jizhundian=mj_suandian(fu*(2**(2+fan)),fan);
	if(start_player==win_player)
	{
		player_points[win_player]+=Math.ceil(6*jizhundian/100)*100;
		player_points[lose_player]-=Math.ceil(6*jizhundian/100)*100;
	}
	else
	{
		player_points[win_player]+=Math.ceil(4*jizhundian/100)*100;
		player_points[lose_player]-=Math.ceil(4*jizhundian/100)*100;
	}
	sm_player_status_dict[player_list[win_player]]["win_times"]+=1;
	sm_player_status_dict[player_list[win_player]]["total_point"]+=player_points[win_player];
	sm_player_status_dict[player_list[lose_player]]["lose_times"]+=1;
	return player_points;
}

function 罚符模拟(tenpai_list)
{
	if(tenpai_list[0])
		if(tenpai_list[1])
			if(tenpai_list[2])
				return [0,0,0];
			else
				return [1000,1000,-2000];
		else
			if(tenpai_list[2])
				return [1000,-2000,1000];
			else
				return [2000,-1000,-1000];
	else
		if(tenpai_list[1])
			if(tenpai_list[2])
				return [-2000,1000,1000];
			else
				return [-1000,2000,-1000];
		else
			if(tenpai_list[2])
				return [-1000,-1000,2000];
			else
				return [0,0,0];
}


function sm退向听chance(attack)
{
	return 0.2+(1.7**((attack-70)/7))/10;
}

function turn_chance(turn)
{
	if(turn<=3)
		return 0.2;
	if(turn<=6)
		return 0.5;
	if(turn<=10)
		return 0.9;
	return 1;
}

function sm进向听chance(speed,turn,fulu,santen)
{
	return (0.85+0.25*((speed/100)**4))*(turn_chance(turn))*(1-0.04*(fulu**2))*((santen/8)**(1/20));
}

function sm单局模拟(player_1,player_2,player_3,start_player=random(0,3))
{
	sm_player_status_dict[player_1]["total_times"]+=1;
	sm_player_status_dict[player_2]["total_times"]+=1;
	sm_player_status_dict[player_3]["total_times"]+=1;
	let player_list=[player_1,player_2,player_3];
	let player_santen=[sjsmxt(),sjsmxt(),sjsmxt()];
	let player_reach=[false,false,false];
	let player_fulu=[0,0,0]
	let the_player=start_player;
	for(let i=random_increase(0,12);i<50;++i)
	{
		if(i<36)
			i+=random_dedecrease(0,6);
if(!player_reach[the_player]&&player_santen[the_player]<(7-2*player_fulu[the_player]))
		player_santen[the_player]+=random_bool(sm退向听chance(sm_player_status_dict[player_list[the_player]]["attack"]))?1:0;
		player_santen[the_player]-=random_bool(sm进向听chance(sm_player_status_dict[player_list[the_player]]["speed"],Math.floor(i/3),player_fulu[the_player],player_santen[the_player]))?1:0;
		if(player_santen[the_player]==0)
		{
			sm_player_status_dict[player_list[the_player]]["total_win_turn"]+=Math.floor(i/3);
			return 自摸模拟(player_1,player_2,player_3,start_player,the_player,player_fulu[the_player]);
		}
		if((player_santen[(the_player+1)%3]==1)&&(random_bool(1/(1+player_fulu[(the_player+1)%3])**3))&&((player_reach[the_player]||(!random_bool((player_reach[(the_player+1)%3])?(sm_player_status_dict[player_list[the_player]]["defence"]/(100*(1+2*player_fulu[the_player])))**(1/2):(sm_player_status_dict[player_list[the_player]]["defence"]/100)**2)))&&random_bool((sm_player_status_dict[player_list[(the_player+1)%3]]["speed"]/100))))
		{
			sm_player_status_dict[player_list[(the_player+1)%3]]["total_win_turn"]+=Math.floor(i/3);
			return 荣和模拟(player_1,player_2,player_3,start_player,the_player,(the_player+1)%3,player_fulu[the_player]);
		}
		if((player_santen[(the_player+2)%3]==1)&&(random_bool(1/(1+player_fulu[(the_player+2)%3])**3))&&((player_reach[the_player]||(!random_bool((player_reach[(the_player+2)%3])?(sm_player_status_dict[player_list[the_player]]["defence"]/(100*(1+2*player_fulu[the_player])))**(1/2):(sm_player_status_dict[player_list[the_player]]["defence"]/100)**2)))&&random_bool((sm_player_status_dict[player_list[(the_player+2)%3]]["speed"]/100))))
		{
			sm_player_status_dict[player_list[(the_player+2)%3]]["total_win_turn"]+=Math.floor(i/3);
			return 荣和模拟(player_1,player_2,player_3,start_player,the_player,(the_player+2)%3,player_fulu[the_player]);
		}
		if((player_santen[the_player]==1)&&(!player_fulu[the_player])&&(!player_reach[the_player])&&random_bool((sm_player_status_dict[player_list[the_player]]["attack"]*sm_player_status_dict[player_list[the_player]]["menqing"]/10000)**(1/4)))
		{
			player_reach[the_player]=true;
			sm_player_status_dict[player_list[the_player]]["reach_times"]+=1;
		}
		if((player_santen[(the_player+1)%3]>1)&&(player_fulu[(the_player+1)%3]<4)&&(!player_reach[(the_player+1)%3])&&!random_bool((sm_player_status_dict[player_list[(the_player+1)%3]]["menqing"]/100)**(1/32)))
		{
			if(!player_fulu[(the_player+1)%3])
sm_player_status_dict[player_list[(the_player+1)%3]]["fulu_times"]+=1;
			player_fulu[(the_player+1)%3]+=1;
			player_santen[(the_player+1)%3]-=(random_bool(0.3)?1:0);
			the_player=(the_player+2)%3;
			continue;
		}
		if((player_santen[(the_player+2)%3]>1)&&(player_fulu[(the_player+2)%3]<4)&&(!player_reach[(the_player+2)%3])&&!random_bool((sm_player_status_dict[player_list[(the_player+2)%3]]["menqing"]/100)**(1/32)))
		{
			if(!player_fulu[(the_player+2)%3])
sm_player_status_dict[player_list[(the_player+2)%3]]["fulu_times"]+=1;
			player_fulu[(the_player+2)%3]+=1;
			player_santen[(the_player+2)%3]-=(random_bool(0.3)?1:0);
			continue;
		}
		the_player=(the_player+1)%3;
	}
	let tenpai_list=[false,false,false]
	for(let i=0;i<3;++i)
		tenpai_list[i]=(player_santen[i]<=1);
	return 罚符模拟(tenpai_list);
}


function end_game(scores,the_ju)
{
	if(scores[0]<0||scores[1]<0||scores[2]<0)
		return true;
	if(the_ju>8)
		return true;
	if(the_ju>5&&(scores[0]>40000||scores[1]>40000||scores[2]>40000))
		return true;
	return false;
}

function sm半庄模拟(players)
{
	let player_score=[35000,35000,35000];
	let ju=0;
	let benchang=0;
	while(!end_game(player_score,ju))
	{
		let ju_result=sm单局模拟(players[0],players[1],players[2],ju%3);
		let is_tsumo=true;
		for(let i=0;i<3;++i)
		{
			player_score[i]+=ju_result[i];
			if(ju_result[i]>0)
				player_score[i]+=200*benchang;
			else if(ju_result[i]==0)
				is_tsumo=false;
		}
		for(let i=0;i<3;++i)
			if(ju_result[i]<0)
				player_score[i]-=(is_tsumo?100:200)*benchang;
		if(ju_result[ju%3]>0)
			benchang+=1;
		else
		{
			ju+=1;
			if(benchang>sm_player_status_dict[players[ju%3]]["max_lianzhuang"])
			sm_player_status_dict[players[ju%3]]["max_lianzhuang"]=benchang;
			benchang=0;
		}
	}
	for(let i=0;i<3;++i)
		if(player_score[i]<0)
			sm_player_status_dict[players[i]]["fly"]+=1;
	let shunwei=[0,1,2];
	shunwei.sort((a,b)=>player_score[b]-player_score[a]);
	sm_player_status_dict[players[shunwei[0]]]["first"]+=1;
	sm_player_status_dict[players[shunwei[1]]]["second"]+=1;
	sm_player_status_dict[players[shunwei[2]]]["third"]+=1;
	return [[players[shunwei[0]],player_score[shunwei[0]]],[players[shunwei[1]],player_score[shunwei[1]]],[players[shunwei[2]],player_score[shunwei[2]]]];
}

function 段位判定(ID)
{
	if(sm_player_status_dict[ID]["pt"]>=level_up_point[sm_player_status_dict[ID]["level"]])
	{
		sm_player_status_dict[ID]["level"]+=1;
		sm_player_status_dict[ID]["pt"]=level_start_point[sm_player_status_dict[ID]["level"]];
		return "\n"+ID+"升段到了"+level_list[sm_player_status_dict[ID]["level"]];
	}
	if(sm_player_status_dict[ID]["pt"]<0&&sm_player_status_dict[ID]["level"]>3&&sm_player_status_dict[ID]["level"]<15)
	{
		sm_player_status_dict[ID]["level"]-=1;
		sm_player_status_dict[ID]["pt"]=level_start_point[sm_player_status_dict[ID]["level"]];
		return "\n"+ID+"掉段到了"+level_list[sm_player_status_dict[ID]["level"]];
	}
	if(sm_player_status_dict[ID]["pt"]<0)
		sm_player_status_dict[ID]["pt"]=0;
	return "";
}

function 对局模拟(room_number,players)
{
	let 半庄result=sm半庄模拟(players);
	let result_str="对局结果:\n"+半庄result[0][0]+":"+半庄result[0][1]+"\n"+半庄result[1][0]+":"+半庄result[1][1]+"\n"+半庄result[2][0]+":"+半庄result[2][1];
	for(let i=0;i<3;++i)
	{
		sm_player_status_dict[半庄result[i][0]]["pt"]+=((i==0)?(room_up_point[room_number]+20):0)-((i==2)?(level_down_point[sm_player_status_dict[半庄result[i][0]]["level"]]):0)+Math.ceil((半庄result[i][1]-40000)/1000);
		result_str+=段位判定(半庄result[i][0]);
	}
	return result_str;
}

function sm匹配()
{
	let total_waiting_number=0;
	for(let i=0;i<5;++i)
		total_waiting_number+=sm_match_list[i].length;
	if(total_waiting_number<3)
		return "人数不足~";
	let choose_one=random(0,total_waiting_number);
	let room_number=0;
	while(choose_one>=sm_match_list[room_number].length)
		choose_one-=sm_match_list[room_number++].length;
	if(sm_match_list[room_number].length<3)
		return "人数不足~";
	let new_room=[];
	new_room.push(sm_match_list[room_number][choose_one]);
	sm_match_list[room_number].splice(choose_one,1);
	let choose_two=random(0,sm_match_list[room_number].length);
	new_room.push(sm_match_list[room_number][choose_two]);
	sm_match_list[room_number].splice(choose_two,1);
	let choose_three=random(0,sm_match_list[room_number].length);
	new_room.push(sm_match_list[room_number][choose_three]);
	sm_match_list[room_number].splice(choose_three,1);
	let match_result_str=new_room[0]+","+new_room[1]+"和"+new_room[2]+"在"+room_name[room_number]+"进行了对局!\n"+对局模拟(room_number,new_room)+"\n"+进入sm等待(new_room[0])+"\n"+进入sm等待(new_room[1])+"\n"+进入sm等待(new_room[2]);
	let sm_match_id=Date.now();
	sm_all_log_list[sm_match_id]=match_result_str+"\n";
	for(let i=0;i<3;++i)
		if(sm_player_log_list[new_room[i]]?false:true)
			sm_player_log_list[new_room[i]]=[sm_match_id];
		else
			sm_player_log_list[new_room[i]].push(sm_match_id);
	return true;
}

function sm_clear_log()
{
	let the_time_now=Date.now();
	for(let i in sm_all_log_list)
		if((the_time_now-i)>1000*300)
			delete sm_all_log_list[i];
	for(let i in sm_player_log_list)
		for(let j=0;j<sm_player_log_list[i].length;++j)
			if((the_time_now-sm_player_log_list[i][j])>1000*600)
				sm_player_log_list[i].splice(j--,1);
	return "清理完成~";
}

function sm_restart()
{
	if(sm_rank_list.length<10)
		return "魂天人数不足10人~";
	let the_server_result=查看sm排名(30)+"\n";
	for(let i=0;i<10;++i)
		if(sm_player_status_dict[sm_rank_list[i]]["level"]<15)
			return "魂天人数不足10人~";
		else
			the_server_result+=查看sm玩家(sm_rank_list[i])+"\n";
	clearInterval(sm_match_ID);
	for(let i=0;i<10&&i<sm_rank_list.length;++i)
		the_server_result+=查看sm玩家(sm_rank_list[i])+"\n";
	sm_server_result.push(the_server_result);
	fs.writeFileSync('./sm_server_result.js',"sm_server_result="+JSON.stringify(sm_server_result));
	sm_match_list=[[],[],[],[],[]];
	sm_all_log_list={};
	sm_player_log_list={};
	for(let i=0;i<sm_rank_list.length;++i)
	{
		sm_player_status_dict[sm_rank_list[i]]={"creator":sm_player_status_dict[sm_rank_list[i]]["creator"],"creator_nickname":sm_player_status_dict[sm_rank_list[i]]["creator_nickname"],"attack":sm_player_status_dict[sm_rank_list[i]]["attack"],"defence":sm_player_status_dict[sm_rank_list[i]]["defence"],"speed":sm_player_status_dict[sm_rank_list[i]]["speed"],"menqing":sm_player_status_dict[sm_rank_list[i]]["menqing"],"first":0,"second":0,"third":0,"fly":0,"total_point":0,"win_times":0,"lose_times":0,"tsumo_times":0,"total_times":0,"total_win_turn":0,"reach_times":0,"fulu_times":0,"pt":0,"level":0,"max_lianzhuang":0};
		进入sm等待(sm_rank_list[i]);
	}
	sm_match_ID=setInterval(sm匹配,Math.ceil((sm_match_speed*1000)/sm_rank_list.length));
	return "服务器已重启，全员回归初心0pt~";
}