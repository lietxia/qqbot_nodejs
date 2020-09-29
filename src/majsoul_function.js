function majsoul_qh_function(order_string)
{
	if(!majsoul_character_dict[id])
		majsoul_character_dict[id]=["一姬","二阶堂美树"];
	if(order_string=="我的人物")
	{
		let return_string="我持有一姬";
		for(let i=1;i<majsoul_character_dict[id].length;++i)
			return_string+="、"+majsoul_character_dict[id][i];
		return return_string+"。";
	}
	if(order_string.substr(0,4)=="添加人物")
	{
		if(majsoul_character_dict[id].indexOf(order_string.substr(4))>=0)
			return order_string.substr(4)+"已经在选择池里了~";
		if(雀魂人物.indexOf(order_string.substr(4))>=0)
		{
			majsoul_character_dict[id].push(order_string.substr(4));
			fs.writeFileSync('./majsoul_character.js',"majsoul_character_dict="+JSON.stringify(majsoul_character_dict));
			return order_string.substr(4)+"已进入可使用名单~";
		}
		else
			return "没有这个角色……(不要打任何空格)";
	}
	if(order_string.substr(0,4)=="删除人物")
	{
		if(order_string.substr(4)=="一姬")
			return "一姬不想离开你，喵~";
		if(majsoul_character_dict[id].indexOf(order_string.substr(4))>=0)
		{
			majsoul_character_dict[id].splice(majsoul_character_dict[id].indexOf(order_string.substr(4)),1);
			fs.writeFileSync('./majsoul_character.js',"majsoul_character_dict="+JSON.stringify(majsoul_character_dict));
			return order_string.substr(4)+"已离开可使用名单~";
		}
		else
			return "没有这个角色……(不要打任何空格)";
	}
	if(order_string.substr(0,4)=="今天玩谁")
	{
		let i=雀魂人物.indexOf(majsoul_character_dict[id][random(0,majsoul_character_dict[id].length)]);
		return "今天玩"+雀魂人物[i]+"\n[CQ:image,file="+雀魂人物图[i]+"]";
	}
	return "";
}

function majsoul_function()
{
	fs.writeFileSync('./px_log.js',"px_dict="+JSON.stringify(px_dict));
	if(message.substr(2,2)=="向听"||message.substr(2,2)=="xt")
		return ((at_sender&&type=="group")?"\n":"")+santen_reply(convert_to_card(catch_content(4)))+"("+(Date.now()-start_time)+"ms)";
	if(message.substr(2,2)=="牌理"||message.substr(2,2)=="pl")
		return ((at_sender&&type=="group")?"\n":"")+paili_input(catch_content(4))+"\n("+(Date.now()-start_time)+"ms)";
	if(message.substr(2,4)=="特殊牌理"||message.substr(2,4)=="tspl")
	{
		if(time-tspl_lasttime<try_time/1000)
			return "上一次调用占了太多资源，要休息一下~";
		tspl_lasttime=time;
		setTimeout(assync_special_paili(catch_content(6),((type=="group")?group_id:0),id,Date.now()),1);
		return ((at_sender&&type=="group")?"\n":"")+"正在计算特殊牌理中，请稍后……";
	}
	if(catch_content(2)=="开始练习切牌"||catch_content(2)=="kslxqp"||catch_content(2)=="开始切牌练习"||catch_content(2)=="ksqplx")
		return ((at_sender&&type=="group")?"\n":"")+create_hand();
	if(catch_content(2)=="重新练习切牌"||catch_content(2)=="cxlxqp"||catch_content(2)=="重新切牌练习"||catch_content(2)=="cxqplx")
		return ((at_sender&&type=="group")?"\n":"")+recreate_hand();
	if(catch_content(2)=="结束练习切牌"||catch_content(2)=="jslxqp"||catch_content(2)=="结束切牌练习"||catch_content(2)=="jsqplx")
		return ((at_sender&&type=="group")?"\n":"")+end_hand();
	if(catch_content(2)=="切牌帮助"||catch_content(2)=="qpbz")
		return ((at_sender&&type=="group")?"\n":"")+mj_px_file;
	if(catch_content(2).length<5&&(catch_content(2).substr(0,2)=="切牌"||catch_content(2).substr(0,2)=="qp"))
		return ((at_sender&&type=="group")?"\n":"")+px_turn(catch_content(4));
	if(catch_content(2).length<5&&(catch_content(2).substr(0,1)=="杠"||catch_content(2).substr(0,1)=="k"))
		return ((at_sender&&type=="group")?"\n":"")+px_kong(catch_content(3));
	if(catch_content(2).length<5&&(catch_content(2).substr(0,2)=="立直"||catch_content(2).substr(0,2)=="lz"))
		return ((at_sender&&type=="group")?"\n":"")+px_reach(catch_content(4));
	if(catch_content(2)=="摸切"||catch_content(2)=="mq")
		return ((at_sender&&type=="group")?"\n":"")+px_pass();
	if(catch_content(2)=="继续摸切"||catch_content(2)=="jxmq")
		return ((at_sender&&type=="group")?"\n":"")+one_more_pass();
	if(catch_content(2).length<5&&(catch_content(2).substr(0,2)=="继续"||catch_content(2).substr(0,2)=="jx"))
		return ((at_sender&&type=="group")?"\n":"")+one_more_turn(catch_content(4));
	if(catch_content(2)=="自摸"||catch_content(2)=="zm")
		return ((at_sender&&type=="group")?"\n":"")+px_tsumo();
	if(catch_content(2)=="查看手牌"||catch_content(2)=="cksp")
		return ((at_sender&&type=="group")?"\n":"")+px_check_hand();
	return "";
}

function assync_special_paili(order_string,the_group_id,user_id,pl_start)
{
	if(the_group_id!=0)
		return ()=>{http.get("http://127.0.0.1:5700/send_group_msg?group_id="+the_group_id+"&&message="+special_paili(order_string,pl_start).replace(/\n/g,"%0a")+"%0a("+(Date.now()-start_time)+"ms)")};
	else
		return ()=>{http.get("http://127.0.0.1:5700/send_private_msg?user_id="+user_id+"&&message="+special_paili(order_string,pl_start).replace(/\n/g,"%0a")+"%0a("+(Date.now()-start_time)+"ms)")};
}

function special_paili(order_string,pl_start=Date.now())
{
	let hand_string="";
	let dora_string="";
	let bei_string="";
	let i=0;
	for(i=0;i<order_string.length;++i)
		if(order_string[i]==" "||order_string[i]=="+"||order_string[i]=="-")
			break;
		else
			hand_string+=order_string[i];
	for(++i;i<order_string.length;++i)
		if(order_string[i]==" "||order_string[i]=="+"||order_string[i]=="-")
			break;
		else
			dora_string+=order_string[i];
	for(++i;i<order_string.length;++i)
		if(order_string[i]==" "||order_string[i]=="+"||order_string[i]=="-")
			break;
		else
			bei_string+=order_string[i];
	let hand=convert_to_card(hand_string);
	if(hand_amount(hand)!=14)
		return "使用这个功能手牌数必须是14张~";
	if(dora_string!=""&&dora_string[0]!="d")
		return "dora说明必须以d开头~";
	if(bei_string!=""&&bei_string[0]!="b")
		return "北dora数量说明必须以b开头~";
	let doras=JSON.parse(JSON.stringify(basic_hand));
	if(dora_string!="")
		doras=convert_to_card(dora_string.substr(1));
	let red_dora=0;
	let red_only=[false,false,false];
	let bei_dora=0;
	if(bei_string!="")
		bei_dora=parse_if_number(bei_string.substr(1));
	if(typeof(bei_dora)!="number")
		return "北dora要直接说明数量~";
	let the_santen=santen(hand);
	if(the_santen==0)
	{
		let dora=0;
		for(let j=0;j<4;++j)
			for(let k=0;k<((j==3)?7:9);++k)
				dora+=hand[j][k]*doras[j][k];
		return paili_input(hand_string+((dora>0||bei_dora>0)?"+":"")+string_multiply("d",dora)+string_multiply("b",bei_dora));
	}
	for(let i=0;i<hand_string.length;++i)
		if(hand_string[i]=="0")
		{
			red_dora+=1;
			for(let j=i;j<hand_string.length;++j)
				if(mpsz.indexOf(hand_string[j])>=0)
					if(hand[mpsz.indexOf(hand_string[j])][4]==1)
						red_only[mpsz.indexOf(hand_string[j])]=true;
					else
						break;
		}
	if(the_santen>1)
	{
		let sort_minus_choice=[];
		let t=0;
		let paili_string=order_string+"的牌理:";
		let new_red_dora=red_dora_status(hand_string);
		let expected_point=JSON.parse(JSON.stringify(basic_hand));
		let last_expected_point=JSON.parse(JSON.stringify(basic_hand));
		let this_expected_point=JSON.parse(JSON.stringify(basic_hand));
		let real_try_times=0;
		for(;real_try_times<10000&&Date.now()<(pl_start+try_time);++real_try_times)
			for(let j=0;j<4;++j)
				for(let k=0;k<((j==3)?7:9);++k)
					if(hand[j][k]>0)
					{
						let the_red_dora=JSON.parse(JSON.stringify(new_red_dora));
						let qiechu_hand=JSON.parse(JSON.stringify(hand));
						qiechu_hand[j][k]-=1;
						if(k==4&&red_only[j])
							the_red_dora[j]=false;
						this_expected_point[j][k]=play_by_santen(qiechu_hand,the_red_dora,doras,bei_dora,mountain_by_reduce(hand_string),max_try_turns-3+2*the_santen)/(turn_weights**max_try_turns);
						/*if(last_expected_point[j][k]==0)*/
							expected_point[j][k]+=Math.log(this_expected_point[j][k]+1);
						/*else
							expected_point[j][k]+=(last_expected_point[j][k]*this_expected_point[j][k])**(1/2);*/
						last_expected_point[j][k]=this_expected_point[j][k];
					}
		paili_string+="(尝试"+real_try_times+"次)%0a"
		for(let j=0;j<4;++j)
			for(let k=0;k<((j==3)?7:9);++k)
				if(hand[j][k]>0)
				{
					expected_point[j][k]=Math.floor(Math.E**(expected_point[j][k]/real_try_times)*100)/100;
					sort_minus_choice[t++]=[expected_point[j][k]*100000+(99-(j*10+k)),j,((k==4&&red_only[j])?(-1):k),"期望分值"+expected_point[j][k]+"分"];
				}
		sort_minus_choice.sort((a,b)=>(b[0]-a[0]));
		for(let i=0;i<sort_minus_choice.length;++i)
			paili_string+="切"+(sort_minus_choice[i][2]+1)+mpsz[sort_minus_choice[i][1]]+", "+sort_minus_choice[i][3]+(i==sort_minus_choice.length-1?".":";%0a");
		return paili_string;
	}
	let minus_choice=paili_14(hand);
	let sort_minus_choice=[];
	let paili_string=order_string+"的牌理:%0a";
	for(let i=0;i<minus_choice.length;++i)
	{
		let qiechu_hand=JSON.parse(JSON.stringify(hand));
		qiechu_hand[Math.floor(minus_choice[i]/10)][minus_choice[i]%10]-=1;
		let qiechu_red_dora=(((minus_choice[i]%10)==4)&&red_only[Math.floor(minus_choice[i]/10)]);
		let dora=0;
		for(let j=0;j<4;++j)
			for(let k=0;k<((j==3)?7:9);++k)
				dora+=qiechu_hand[j][k]*doras[j][k];
		dora+=bei_dora*doras[3][3];
		let add_choice=paili_13(qiechu_hand);
		expected_point=0;
		for(let j=0;j<4;++j)
			for(let k=0;k<((j==3)?7:9);++k)
				if(add_choice[j][k]>0)
				{
					let non_reach_tsumo=get_mj_point(paili_count(qiechu_hand,j*9+k,dora+doras[j][k],(qiechu_red_dora?(red_dora-1):red_dora),0,0,[],[],[],true,1,0,false,false,false,false,false,false,false));
					let reach_tsumo=get_mj_point(paili_count(qiechu_hand,j*9+k,dora+doras[j][k],(qiechu_red_dora?(red_dora-1):red_dora),0,0,[],[],[],true,1,0,true,false,false,false,false,false,false));
					let non_reach_rong=get_mj_point(paili_count(qiechu_hand,j*9+k,dora+doras[j][k],(qiechu_red_dora?(red_dora-1):red_dora),0,0,[],[],[],false,1,0,false,false,false,false,false,false,false));
					let reach_rong=get_mj_point(paili_count(qiechu_hand,j*9+k,dora+doras[j][k],(qiechu_red_dora?(red_dora-1):red_dora),0,0,[],[],[],false,1,0,true,false,false,false,false,false,false));
					expected_point+=(non_reach_tsumo*0.12+reach_tsumo*0.18+non_reach_rong*0.28+reach_rong*0.42)*add_choice[j][k];
				}
		expected_point/=4;
		sort_minus_choice[i]=[expected_point*1000+(99-minus_choice[i]),Math.floor(minus_choice[i]/10),(qiechu_red_dora?(-1):(minus_choice[i]%10)),"期望分值"+expected_point+"分"];
	}
	sort_minus_choice.sort((a,b)=>(b[0]-a[0]));
	for(let i=0;i<sort_minus_choice.length;++i)
		paili_string+="切"+(sort_minus_choice[i][2]+1)+mpsz[sort_minus_choice[i][1]]+", "+sort_minus_choice[i][3]+(i==minus_choice.length-1?".":";%0a");
	return paili_string;
}

function get_mj_point(mj_result)
{
	let point_place=mj_result.indexOf("點")-1;
	let point="";
	for(let i=point_place;(i>=0)&&(mj_result[i]>="0")&&(mj_result[i]<="9");--i)
		point=mj_result[i]+point;
	point=parse_if_number(point);
	let mj_next_result=mj_result.replace("點","");
	if(mj_next_result.indexOf("點")>=0)
	{
		let next_point_place=mj_next_result.indexOf("點")-1;
		let next_point="";
		for(let i=next_point_place;(i>=0)&&(mj_next_result[i]>="0")&&(mj_next_result[i]<="9");--i)
			next_point=mj_next_result[i]+next_point;
		next_point=parse_if_number(next_point);
		point=2*point+next_point;
	}
	return point;
}

function get_mj_score(mj_result)
{
	let point_place=mj_result.replace("分","").indexOf("分")-1;
	let point="";
	for(let i=point_place;(i>=0)&&(mj_result[i]>="0")&&(mj_result[i]<="9");--i)
		point=mj_result[i]+point;
	point=parse_if_number(point);
	return point;
}

function play_by_santen(hand,red_dora=[false,false,false],doras=JSON.parse(JSON.stringify(basic_hand)),beis=0,mountain,resume_times)
{
	if(resume_times<=0)
		return 0;
	let hold_place=random(0,mountain.length);
	let hold_card=mountain[hold_place];
	let new_mountain=JSON.parse(JSON.stringify(mountain))
	new_mountain.splice(hold_place,1);
	let new_hand=JSON.parse(JSON.stringify(hand));
	let new_hold=Math.floor(hold_card/4);
	new_hand[Math.floor(new_hold/9)][new_hold%9]+=1;
	let new_red_dora=JSON.parse(JSON.stringify(red_dora));
	if(hold_card%36==19&&hold_card<108)
		new_red_dora[Math.floor(new_hold/9)]=true;
	/*if(santen(new_hand)==0)
	{
		let dora=0,red_dora_amount=0;
		for(let j=0;j<4;++j)
			for(let k=0;k<((j==3)?7:9);++k)
				dora+=new_hand[j][k]*doras[j][k];
		dora+=beis*doras[3][3];
		for(let i=0;i<3;++i)
			if(new_red_dora[i])
				red_dora_amount+=1;
		return get_mj_point(paili_count(hand,new_hold,dora,red_dora_amount,0,beis,[],[],[],true))*(turn_weights**resume_times);
	}*/
	if(santen(hand)==1)
	{
		//return play_by_santen(hand,red_dora,doras,beis,new_mountain,resume_times-1);
		return get_mj_score(special_paili(convert_to_handcard(new_hand,red_dora)+"+d"+convert_to_handcard(doras)+"+b"+beis))*(turn_weights**resume_times);
	}
	let minus_choice=paili_14(new_hand);
	let qiechu_choice=minus_choice[random(0,minus_choice.length)];
	if(qiechu_choice%10==4&&new_red_dora[Math.floor(qiechu_choice/10)]&&new_hand[Math.floor(qiechu_choice/10)][qiechu_choice%10]==1)
		new_red_dora[Math.floor(qiechu_choice/10)]=false;
	new_hand[Math.floor(qiechu_choice/10)][qiechu_choice%10]-=1;
	return play_by_santen(new_hand,new_red_dora,doras,beis,new_mountain,resume_times-1);
}

function red_dora_status(card_string)
{
	let red_dora=[false,false,false];
	for(let i=0;i<card_string.length;++i)
		if(card_string[i]=="0")
			for(let j=i;j<card_string.length;++j)
				if(mpsz.indexOf(card_string[j])>=0)
				{
					red_dora[mpsz.indexOf(card_string[j])]=true;
					break;
				}
	return red_dora;
}

function mountain_by_reduce(reduce_cards_str)
{
	let reduce_cards=convert_to_card(reduce_cards_str);
	let red_dora=red_dora_status(reduce_cards_str);
	let mountain=new_mountain();
	for(let i=0;i<4;++i)
		for(let j=0;j<(i==3?7:9);++j)
			for(let k=0;k<reduce_cards[i][j];++k)
				if(j==4&&i<3&&red_dora[i]&&k==0&&reduce_cards[i][j]<4)
					mountain.splice(mountain.indexOf(i*36+19),1);
				else
					mountain.splice(mountain.indexOf(i*36+j*4+k),1);
	return mountain;
}

//santen(convert_to_card("134m267p3457789s"))
//count_func_time(play_by_santen,convert_to_card("147m258p369s1234z"),[false,false,true],convert_to_card("2p"),0,mountain_by_reduce("134m1267p3457789s"),20)






