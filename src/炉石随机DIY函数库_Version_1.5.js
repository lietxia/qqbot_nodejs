function create_new_minion(name)
{
if(name=="")
name=nickname+"的发现";
if(name.substr(0,2)!="de"&&name.length>=25)
return name+"\n这个名字太长啦~";
if(name.substr(0,2)=="de")
{
	random_target=name.substr(2);
	random_place=0;
}
random_record="";
let cost=random_decrease(1,11);
let health=random_convex(1,2*cost+1);
let attack=random_increase(1,2*cost-health+2);
let race=random(0,minion_race.length);
let Class=random(0,minion_class.length);
let rarety=random(0,minion_rarety.length);
let the_description=description(name,race,cost);
return cost+" "+name+" "+minion_class[Class]+" "+minion_rarety[rarety]+"\n"+the_description+"\n"+(attack+(the_description=="无法攻击。"?2:0))+"/"+(health+(the_description=="无法攻击。"?2:0))+(race==0?"":("\n"+"*"+minion_race[race]+"*"))+"\n随从编码:"+new_minion_code();
}

function new_minion_code()
{
	let the_code=random_record;
	if(typeof(random_target)=="string")
	{
		the_code=random_target;
		random_target=false;
	}
	random_record=false;
	return the_code;
}

function new_lord_minion()
{
	let cost_choice=random(1,3);
	let minion_id=(cost_choice==1)?random(0,hscl_cost1_name.length):random(0,hscl_cost2_name.length);
	let minion_name=(cost_choice==1)?hscl_cost1_name[minion_id]:hscl_cost2_name[minion_id];
	let lord_base=(cost_choice==1)?hscl_cost1[minion_name]:hscl_cost2[minion_name];
	let cost=9;
	let attack=lord_base["攻击力"]*3;
	let health=lord_base["生命值"]*3;
	let race=minion_race.indexOf(lord_base["类型"]);
	if(race<0)
		race=0;
	let Class=lord_base["职业"]-1;
	if(Class<0)
		Class=minion_class.length-1;
	let rarety=lord_base["稀有度"]-1;
	if(rarety<0)
		rarety=2;
	let the_description="";
	let deathrattled=false;
	for(let i=0;i<lord_base["效果"].length;++i)
	{
		if(lord_base["效果"][i]>="0"&&lord_base["效果"][i]<="9")
			the_description+=(lord_base["效果"][i]-"0")*3;
		else
			the_description+=lord_base["效果"][i];
		if(i+3<lord_base["效果"].length&&lord_base["效果"][i]=="亡"&&lord_base["效果"][i+1]=="语"&&lord_base["效果"][i+2]=="：")
			deathrattled=true;
	}
	if(the_description[the_description.length-1]!="。"&&the_description[the_description.length-1]!="，")
	the_description+="\n";
	the_description+=(deathrattled?"":"亡语:")+"召唤3个"+minion_name+"。";
	return cost+" "+((minion_name.length<4)?minion_name:minion_name.substr(0,(minion_name.length-2)))+"领主 "+minion_class[Class]+" "+minion_rarety[rarety]+"\n"+the_description+"\n"+attack+"/"+health+(race==0?"":("\n"+"*"+minion_race[race]+"*"));
}

function description(name,race,cost)
{
return key_words(cost,race)+effect(name,cost);
}

function key_words(cost,race)
{
	let str=(race==1?(random_bool(0.4)?" 磁力":""):"");
	for(i=0;i<keywords.length;++i)
	{
		if(random_bool(0.05))
		str+=" "+keywords[i];
	}
	for(i=0;i<keywords_dangerous.length;++i)
		if(random_bool(0.001))
			str+=" "+keywords_dangerous[i];
	if(random_bool(0.1))
		str+=" 法术伤害"+((random_bool(0.005))?("*"+random_dedecrease(2,5)):("+"+random_decrease(1,Math.floor(cost/2)+1)));
	return str+(str==""?"":"\n");
}

function effect(name,cost)
{
switch(random_bool(0.3)?0:1)
{
case 0:return field_effect();
case 1:return trigger_condition()+trigger_effect(name,cost);
}
}

function field_effect()
{
switch(random(0,3))
{
case 0:return effect_alone[random_convex(0,effect_alone.length)];
case 1:return field_buff();
case 2:return trigger_time_buff();
}
}

function field_buff()
{
return target_all[random(0,target_all.length)]+"的"+(random_bool(0.4)?(card_buff_effect()):(minion_choice()+(random_bool(0.5)?minion_buff_effect():field_buff_effect())))+"。";
}

function trigger_time_buff()
{
return target_all[random(0,target_all.length)]+"的"+multitrigger_target[random(0,multitrigger_target.length)]+"效果"+multitrigger_effect[random(0,multitrigger_effect.length)]+"。";
}

function minion_choice()
{
switch(random_increase(0,4)){
case 0:return restriction_independent_minion[random(0,restriction_independent_minion.length)];
case 1:return minion_race[random(0,minion_race.length)];
case 2:return keywords[random(0,keywords.length)]+"随从";
case 3:return random_bool(0.5)?"战吼随从":"亡语随从";
}
}

function minion_buff_effect()
{
switch(random(0,1)){
case 0:return restriction_type_minion[0]+effect_change[random(0,effect_change.length)]+"("+random_dedecrease(1,6)+")点";
case 1:return restriction_type_minion[random(1,restriction_type_minion.length)]+effect_change[random(0,effect_change.length)]+random_dedecrease(1,6);
}
}

function spell_buff_effect()
{
return restriction_type_spell[0]+effect_change[random(0,effect_change.length)]+"("+random_dedecrease(1,6)+")";
}

function weapon_buff_effect()
{
switch(random(0,2)){
case 0:return restriction_type_weapon[0]+effect_change[random(0,effect_change.length)]+"("+random_dedecrease(1,6)+")";
case 1:return restriction_type_weapon[random(1,restriction_type_weapon.length)]+effect_change[random(0,effect_change.length)]+random_dedecrease(1,6);
}
}

function hero_buff_effect()
{
switch(random(0,2)){
case 0:return restriction_type_hero[0]+effect_change[random(0,effect_change.length)]+"("+random_dedecrease(1,6)+")";
case 1:return restriction_type_hero[random(1,restriction_type_hero.length)]+effect_change[random(0,effect_change.length)]+random_dedecrease(1,6);
}
}

function heropower_buff_effect()
{
switch(random(0,2)){
case 0:return restriction_type_heropower[0]+effect_change[random(0,effect_change.length)]+"("+random_dedecrease(1,6)+")";
case 1:return restriction_type_heropower[random(1,restriction_type_heropower.length)]+effect_change[random(0,effect_change.length)]+random_dedecrease(1,6);
}
}

function card_buff_effect()
{
switch(random_decrease(0,5)){
case 0:return card_type[0]+"的"+minion_buff_effect();
case 1:return card_type[1]+"的"+spell_buff_effect();
case 2:return card_type[2]+"的"+weapon_buff_effect();
case 3:return card_type[3]+"牌的"+hero_buff_effect();
case 4:return "英雄技能"+heropower_buff_effect();
}
}

function field_buff_effect()
{
switch(random(0,3))
{
case 0:return "具有"+quantity_buff();
case 1:return "具有"+keywords_buff();
case 2:return "具有"+quantity_buff()+"和"+keywords_buff();
}
}

function quantity_buff()
{
switch(random(0,2))
{
case 0:return "+"+random_dedecrease(1,6)+(random_bool(0.5)?"攻击力":"生命值");
case 1:return "+"+random_dedecrease(1,6)+"/+"+random_dedecrease(1,6);
}
}

function keywords_buff()
{
return keywords[random(0,keywords.length)];
}

function trigger_condition()
{
switch(random_dedecrease(0,2)){
case 0:time_choice=random_bool(0.4)?0:random_decrease(1,trigger_time_0.length);
return trigger_time_0[time_choice]+(time_choice==0?(random_bool(0.1)?battlecry_condition[random(0,battlecry_condition.length)]:""):(random_bool(0.1)?general_condition[random(0,general_condition.length)]:""));
case 1:time_choice=random(0,trigger_time_1.length);
return trigger_time_1[time_choice]["prefix"]+trigger_time_1_choice()+trigger_time_1[time_choice]["suffix"];
}
}

function trigger_time_1_choice()
{
switch(random_increase(0,2))
{
case 0:return play_from[random_convex(0,play_from.length)]+determine_condition();
case 1:return trigger_from[random(0,trigger_from.length)]+trigger_action[random(0,trigger_action.length)];
}
}

function determine_condition()
{
switch(random_decrease(0,4))
{
case 0:return "使用一张"+determine_card_type()+"牌";
case 1:return "召唤一个"+determine_condition_minion();
case 2:return "释放一个"+determine_condition_spell();
case 3:return "装备一把"+determine_condition_weapon();
}
}

function determine_card_type()
{
switch(random(0,6)){
case 0:return keywords[random(0,keywords.length)];
case 1:return keywords_dangerous[random(0,keywords_dangerous.length)];
case 2:return minion_rarety[random(0,minion_rarety.length)];
case 3:return minion_race[random(0,minion_race.length)];
case 4:return card_type[random(0,card_type.length)];
case 5:return "";
}
}

function trigger_effect(name,cost)
{
switch(random_increase(0,4))
{
case 0:return single_effect(cost)+"。";
case 1:return target_effect()+(random_bool(0.1)?(","+single_effect(cost)):"")+"。";
case 2:return restricted_effect(name,cost)+(random_bool(0.1)?(","+single_effect(cost)):"")+"。";
case 3:return independent_effect();
}
}

function independent_effect()
{
return independent[random(0,independent.length)]+"。";
}

function single_effect(cost)
{
operation=random(0,single_operation.length);
return single_operation[operation]["verb"]+(random_bool(0.8)?random(single_operation[operation]["low_bound"],single_operation[operation]["up_bound"]*cost)+single_operation[operation]["qua"]:"等同于"+number_choice[random(0,number_choice.length)]+"的")+single_operation[operation]["noun"];
}

function target_effect()
{
switch(random(0,3))
{
case 0:choice=random(0,buff_type_0.length);return buff_type_0[choice]["verb"]+determine_target(-1);
case 1:choice=random(0,buff_type_1.length);return buff_type_1[choice]["prep"]+determine_target(-1)+buff_type_1[choice]["verb"]+(random_bool(0.8)?(random(1,9)+"点"):"等同于"+number_choice[random(0,number_choice.length)]+"的")+buff_type_1[choice]["noun"];
case 2:choice=random(0,buff_type_2.length);return buff_type_2[choice]["prep"]+determine_target(random_bool(0.6)?0:random(0,minion_race.length))+buff_type_2[choice]["verb"]+"+"+random(1,6)+"/+"+random(1,6);
}
}

function determine_target(race)
{
return (race<0?(random_bool(0.5)?(buff_target_with_race[random(0,buff_target_with_race.length)]+minion_race[random(0,minion_race.length)]):buff_target_no_race[random(0,buff_target_no_race.length)]):buff_target_with_race[random(0,buff_target_with_race.length)]+minion_race[race]);
}

function restricted_effect(name,cost)
{
switch(random_dedecrease(0,3)){
case 0:return restricted_minion(name,cost);
case 1:return restricted_spell();
case 2:return restricted_weapon();
}
}

function restricted_minion(name,cost)
{
switch(random_decrease(0,3)){
case 0:return single_operation_minion[0]+(random_bool(0.8)?(random_decrease(1,6)+"个"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_summon_minion(name,cost);
case 1:return single_operation_minion[random(1,single_operation_minion.length)]+(random_bool(0.8)?(random_decrease(1,6)+"个"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_minion(name);
case 2:choice=random(0,double_operation.length);return double_operation[choice]["prep"]+(random_bool(0.8)?(random_decrease(1,6)+"张"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_minion(name)+double_operation[choice]["verb"]+(choice==0?target_hand[random(0,target_hand.length)]:target_deck[random(0,target_deck.length)])
}
}

function determine_restricted_summon_minion(name,cost)
{
	return random_bool(0.7)?determine_restricted_minion(name):determine_summon_minion(cost);
}

function determine_summon_minion(cost)
{
	return random_convex(0,cost)+"/"+random_convex(1,cost)+(random_bool(0.3)?"":("并具有"+keywords[random(0,keywords.length)]))+"的"+nickname;
}

function restricted_spell()
{
switch(random(0,2)){
case 0:return single_operation_spell[random(0,single_operation_spell.length)]+(random_bool(0.8)?(random_decrease(1,6)+"个"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_spell();
case 1:choice=random(0,double_operation.length);return double_operation[choice]["prep"]+(random_bool(0.8)?(random_decrease(1,6)+"张"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_spell()+double_operation[choice]["verb"]+(choice==0?target_hand[random(0,target_hand.length)]:target_deck[random(0,target_deck.length)])
}
}

function restricted_weapon()
{
switch(random(0,2)){
case 0:return single_operation_weapon[random(0,single_operation_weapon.length)]+"一把"+determine_restricted_weapon();
case 1:choice=random(0,double_operation.length);return double_operation[choice]["prep"]+(random_bool(0.8)?(random_decrease(1,6)+"张"):("数量等同于"+number_choice[random(0,number_choice.length)]+"的"))+determine_restricted_weapon()+double_operation[choice]["verb"]+(choice==0?target_hand[random(0,target_hand.length)]:target_deck[random(0,target_deck.length)])
}
}

function determine_restricted_minion(name)
{
switch(random_increase(0,4)){
case 0:return "随机随从";
case 1:return minion_race[random(0,minion_race.length)];
case 2:return determine_restricted_minion_1(name);
case 3:return determine_restricted_minion_2(name);
}
}

function determine_restricted_minion_1(name)
{
if(random_bool(0.01))
	return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+minion_race[random(0,minion_race.length)];
switch(random(0,3)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_battlefield[random(0,restriction_battlefield.length)]+minion_race[random(0,minion_race.length)]+"的复制";
case 1:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+minion_race[random(0,minion_race.length)];
case 2:return restriction_time[random(0,restriction_time.length)]+restriction_dead[random(0,restriction_dead.length)]+minion_race[random(0,minion_race.length)];
}
}

function determine_restricted_minion_2(name)
{
switch(random_inincrease(0,2)){
case 0:type_choice=random(0,restriction_type_minion.length);return restriction_type_minion[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(0,11)+(type_choice==0?"）":"")+"的"+minion_race[random(0,minion_race.length)];
case 1:return (random_bool(0.3)?name:restriction_independent_minion[random(0,restriction_independent_minion.length)]);
}
}

function determine_restricted_spell()
{
switch(random_increase(0,5)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+"法术";
case 1:return "随机法术";
case 2:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+"法术";
case 3:type_choice=random(0,restriction_type_spell.length);return restriction_type_spell[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(0,11)+(type_choice==0?"）":"")+"的法术";
case 4:return restriction_independent_spell[random(0,restriction_independent_spell.length)];
}
}

function determine_restricted_weapon()
{
switch(random_increase(0,3)){
case 0:return "随机武器";
case 1:return determine_restricted_weapon_1();
case 2:return determine_restricted_weapon_2();
}
}

function determine_restricted_weapon_1()
{
if(random_bool(0.01))
	return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+"武器";
switch(random(0,2)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+"武器";
case 1:return restriction_time[random(0,restriction_time.length)]+restriction_destroyed[random(0,restriction_destroyed.length)]+"武器";
}
}

function determine_restricted_weapon_2()
{
switch(random_increase(0,2)){
case 0:type_choice=random(0,restriction_type_weapon.length);return restriction_type_weapon[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(1,5)+(type_choice==0?"）":"")+"的武器";
case 1:return restriction_independent_weapon[random(0,restriction_independent_weapon.length)];
}
}

function determine_condition_minion(name)
{
switch(random(0,2)){
case 0:return determine_condition_minion_1(name);
case 1:return determine_condition_minion_2(name);
}
}

function determine_condition_minion_1(name)
{
switch(random(0,2)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+"同名"+(random_bool(0.5)?"随从":minion_race[random(0,minion_race.length)]);
case 1:return restriction_time[random(0,restriction_time.length)]+restriction_dead[random(0,restriction_dead.length)]+"同名"+(random_bool(0.5)?"随从":minion_race[random(0,minion_race.length)]);
}
}

function determine_condition_minion_2(name)
{
switch(random_increase(0,3)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+"同名"+(random_bool(0.5)?"随从":minion_race[random(0,minion_race.length)]);
case 1:type_choice=random(0,restriction_type_minion.length);return restriction_type_minion[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(0,11)+(type_choice==0?"）":"")+"的"+minion_race[random(0,minion_race.length)];
case 2:return (random_bool(0.1)?name:restriction_independent_minion[random(0,restriction_independent_minion.length)]);
}
}

function determine_condition_spell()
{
switch(random_increase(0,4)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+"同名法术";
case 1:return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+"同名法术";
case 2:type_choice=random(0,restriction_type_spell.length);return restriction_type_spell[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(0,11)+(type_choice==0?"）":"")+"的法术";
case 3:return restriction_independent_spell[random(0,restriction_independent_spell.length)];
}
}

function determine_condition_weapon()
{
switch(random_increase(0,5)){
case 0:return restriction_time[random(0,restriction_time.length)]+restriction_used[random(0,restriction_used.length)]+"同名武器";
case 1:return restriction_time[random(0,restriction_time.length)]+restriction_destroyed[random(0,restriction_destroyed.length)]+"同名武器";
case 2:return restriction_time[random(0,restriction_time.length)]+restriction_discarded[random(0,restriction_discarded.length)]+"同名武器";
case 3:type_choice=random(0,restriction_type_weapon.length);return restriction_type_weapon[type_choice]+restriction_direction[random(0,restriction_direction.length)]+(type_choice==0?"（":"")+random(0,11)+(type_choice==0?"）":"")+"的武器";
case 4:return restriction_independent_weapon[random(0,restriction_independent_weapon.length)];
}
}

function 高山酱的战吼()
{
return create_new_minion("Ben Brode")+"\n\n"+create_new_minion("Dean Ayala")+"\n\n"+create_new_minion("Peter Whalen");
}

function 开启全部种族()
{
minion_race=["随从","机械","野兽","鱼人","龙","元素","海盗","恶魔","图腾"];
return "开启了哟~";
}

function 查看当前种族()
{
let str="机械";
for(let i=2;i<minion_race.length;++i)
	str+="、"+minion_race[i];
return "当前可能出现的随从类型有"+str+"。";
}

function 关闭种族(name)
{
if(name=="机械")
return "机械不能被关闭哟~";
if(minion_race.indexOf(name)>=0)
{minion_race.splice(minion_race.indexOf(name),1);
return name+"已经被关闭了哟~";}
return name+"好像目前不是一个随从类型呢~";
}