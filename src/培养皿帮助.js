function cell_war_function(order_string)
{
	let order_option="";
	let order_name="";
	let order_detail="";
	let i=0;
	for(i=0;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；"||order_string[i]==" ")
			break;
		else
			order_option+=order_string[i];
	for(++i;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；"||order_string[i]==" ")
			break;
		else
			order_name+=order_string[i];
	for(++i;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；"||order_string[i]==" ")
			break;
		else
			order_detail+=order_string[i];
	if(order_option=="查看"&&order_name!=""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+check_cell(order_name);
	if(order_option=="创建"&&order_name!=""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+create_cell(order_name);
	if(order_option=="放弃"&&order_name!=""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+abandon_cell(order_name);
	if(order_option=="提升"&&order_name!=""&&order_detail!="")
		return ((at_sender&&type=="group")?"\n":"")+improve_cell(order_name,order_detail);
	if(order_option=="降低"&&order_name!=""&&order_detail!="")
		return ((at_sender&&type=="group")?"\n":"")+deprove_cell(order_name,order_detail);
	if(order_option=="排行榜"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+leading_board_cell();
	if(order_option=="我的细胞"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+possess_cell();
	if(order_option=="环境"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+environment_cell();
	if(order_option=="存活"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+alive_cell();
	if(order_option=="帮助"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cell_war_help;
	if(order_option=="基本规则"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cw基本规则;
	if(order_option=="细胞属性"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cw细胞属性;
	if(order_option=="环境属性"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cw环境属性;
	if(order_option=="计算公式"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cw计算公式;
	if(order_option=="查询命令"&&order_name==""&&order_detail=="")
		return ((at_sender&&type=="group")?"\n":"")+cw查询命令;
	if(order_option=="重启服务器"&&order_name==""&&order_detail==""&&ownerlist.indexOf(id)>=0)
		return ((at_sender&&type=="group")?"\n":"")+reset_cell();
	return "";
}

cell_war_help="细胞大战帮助(本游戏由天凤夕子创作):\n细胞大战是一款养成型策略类小游戏。玩家在开始输入\"cw创建,细胞名\"将你的新细胞投入培养皿。每个玩家最多持有5种不同的细胞。\n[例:]cw创建,小夕子\n输入以下关键词查看具体规则~\n----cw基本规则----\n----cw查询命令----\n----cw细胞属性----\n----cw环境属性----\n----cw计算公式----\n环境会一直有波动，大家一起看看谁的细胞繁殖的次数最多吧~\n友情提示:频繁刷此游戏容易造成群里刷屏，请大家私聊或另建新群玩耍~"

cw基本规则="1.回合制:每过3秒，培养皿的时间便会推进一回合。在每个回合里，每个玩家的每个细胞都有概率进行攻击和恢复。满血的细胞还有概率进行繁殖，繁殖后血量减半。攻击方式和概率大小随着细胞的属性而改变。\n2.新手保护:新来的细胞在繁殖100次之前有新手保护，新手保护期细胞受到的初始伤害固定为0或1，细胞实际恢复量固定为最大生命值的一半。\n3.承载上限:细胞繁殖到100个后会出现受到所有伤害变为平方的debuff，繁殖到200个后则会停止繁殖和恢复。随着繁殖的进行，细胞会老化，导致繁殖率和攻击率降低，繁殖100000次左右会基本停止繁殖和攻击。\n4.天赋与弱点:细胞之间拥有相生相克的效应，细胞攻击时如果具有对手弱点的天赋，造成的伤害也会变为平方。"

cw细胞属性="提升细胞的属性可输入\"cw提升,细胞名,属性名和耗点量\"来提升细胞的对应属性。降低细胞的属性可输入\"cw降低,细胞名,属性名和耗点量\"来降低细胞的对应属性。提升会消耗提升点数，降低不会得到提升点数。新的提升点随着回合推进随机获得，细胞的攻击力越高，获得提升点的概率越低。\n[例:]cw提升,小夕子,恢复量50\n\n细胞共有11种可变属性，其效果分别如下:\n攻击力->每次攻击造成0到攻击力之间的随机伤害;\n防御力->每次受到攻击减少防御力的伤害;\n最大生命值->每个细胞的最大生命值;\n恢复量->每个细胞每次恢复的生命值;\n暴击力->每次触发暴击伤害翻的倍数;\n攻击率->每个细胞每回合进行攻击的概率(最大65%);\n繁殖率->每个新生满血细胞每回合在环境允许繁殖区下进行繁殖的概率(最大90%);\n恢复率->每个细胞每回合进行恢复的概率(最大80%);\n暴击率->每次攻击触发暴击的概率(最大80%);\n全体攻击率->攻击时对每种细胞的第一只造成伤害的概率(最大5%);\n同族攻击率->攻击时对目标细胞的所有同种细胞造成伤害的概率(最大5%)。"

cw环境属性="培养皿里的环境有如下随着时间随机波动的属性:\n减伤率->每个细胞每次受到基础伤害降低的比率(0%-90%);\n闪避率->每个细胞每次闪避伤害的概率(1%-10%);\n环境繁殖率->每个细胞处在环境允许繁殖区的概率(50%-100%);\n环境恢复率->每个细胞恢复率剩余的比例(20%-100%);\n环境属性->每回合对弱点为环境属性的部分细胞造成巨额伤害(生命上限越高伤害比例越大),受到此伤害的概率为繁殖率、恢复率、防御力和繁殖次数相关比例的乘积。"

cw计算公式="**具体的伤害公式:[(random(0,atk)-def)*(1-reduce_ratio)]->[=1(if newborn)]->[^2(if debuff)]->[^2(if countered)]->[=0(if negative)]->[*random(2,2+critical)(if critical)]\n**环境伤害公式:hp=hp*e^(-max_hp/300)\n**细胞恢复决定公式:if random(0,1)>restore_rate*environment_restore_rate\n**细胞老化公式:if random(0,1)>e^(-reproduce_time/30000)\n**各种比率提升公式:rate=max_rate-max_rate*e^{ln[(max_rate-rate)/max_rate]-point/200}\n**环境克制受伤概率公式:random(0,1)>restore_rate&&random(0,1)>reproduce_rate&&random(0,1)>1-e^(-reproduce_time/3000)&&random(0,1)>e^(-defend/3000)"

cw查询命令="输入\"cw帮助\"可以查看此帮助；\n输入\"cw排行榜\"可以查看当前排行前8名的细胞;\n输入\"cw我的细胞\"可以查看自己培养的所有细胞的名称;\n输入\"cw环境\"可以查看环境里的减伤率、闪避率和环境繁殖率;\n输入\"cw存活\"可以查看目前存活的所有细胞的名称;\n输入\"cw查看,细胞名\"可以查看对应名称的细胞的属性;\n输入\"cw放弃,细胞名\"可以将自己持有的细胞名的细胞移出培养皿;\n输入\"cw提升,细胞名,属性名+耗点量\"提升细胞的属性。\n[例:]cw查看,小夕子\n[例:]cw放弃,小夕子\n[例:]cw提升,小夕子,恢复量50"