function hearthstone_function()
{
	if(message.substr(2,2)=="写个")
	{
		if(message.substr(4,2)=="随从")
		{
			let minion_result=reply_hs_minion();
			if(random_validity==false)
			{
				random_validity=true;
				return ((at_sender&&type=="group")?"\n":"")+"这个随从被炸掉了……";
			}
			return ((at_sender&&type=="group")?"\n":"")+minion_result;
		}
		if(message.substr(4,2)=="领主")
			return ((at_sender&&type=="group")?"\n":"")+new_lord_minion();
	}
	if(message.substr(2,8)=="查看当前随从类型")
		return ((at_sender&&type=="group")?"\n":"")+查看当前种族();
	if(message.substr(2,8)=="开启全部随从类型")
		return ((at_sender&&type=="group")?"\n":"")+开启全部种族();
	if(message.substr(2,6)=="关闭随从类型")
		return ((at_sender&&type=="group")?"\n":"")+close_hs_minion_type();
	if(message.substr(2,4)=="查询卡牌")
		return ((at_sender&&type=="group")?"\n":"")+炉石卡牌(catch_content(6));
	if(message.substr(2,4)=="添加绰号")
		return ((at_sender&&type=="group")?"\n":"")+添加绰号(catch_content(6));
	return "";
}

function 添加绰号(order_string)
{
	let order_name="";
	let order_detail="";
	let i=0;
	for(i=0;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；")
			break;
		else
			order_name+=order_string[i];
	for(++i;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；")
			break;
		else
			order_detail+=order_string[i];
	return add_hscnn(order_name,order_detail);
}

function add_hscnn(new_name,new_nickname){
	if(hscnn[new_nickname])
	{
		if(!hscnn[new_nickname].includes(new_name))
			hscnn[new_nickname].push(new_name);
		else
			return new_name+"已经叫做"+new_nickname+"了！";
	}
	else
		hscnn[new_nickname]=[new_name];
	fs.writeFileSync('./hearthstone_card_nickname.js',"hscnn="+JSON.stringify(hscnn));
	return "现在"+new_name+"又叫做"+new_nickname+"了！";
}

function reply_hs_minion()
{
	let minion_name=catch_content(6);
	if(minion_name=="")
		return random_bool(0.3)?new_lord_minion():create_new_minion("小夕子写的随从");
	return create_new_minion(minion_name);
}

function close_hs_minion_type()
{
	let minion_type_name=catch_content(8);
	return 关闭种族(minion_type_name);
}