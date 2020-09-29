function 报时()
{
	time+=32*3600;
	let second=time%1000;
	let minute=Math.floor(time/60);
	let hour=Math.floor(minute/60);
	let day=Math.floor(hour/24);
	let year=1970;
	let month=1;
	hour%=24;
	minute%=60;
	second%=60;
	for(year=1970;day>(year%4==0?366:365);++year)
		day-=(year%4==0?366:365);
	for(month=1;day>(year%4==0?month_special[month-1]:month_general[month-1]);++month)
	day-=(year%4==0?month_special[month-1]:month_general[month-1]);
	time-=32*3600;
	return year+"年"+month+"月"+day+"日"+hour+"点"+minute+"分"+second+"秒";
}

function count_guai()
{
	if(Math.floor((time+8*3600)/86400)!=guai_count[1])
		guai_count=[1,Math.floor((time+8*3600)/86400)];
	else
		++guai_count[0];
	if(type=="group")
		jmm_bad=group_id;
	setTimeout(()=>{jmm_bad=false},30000);
	fs.writeFileSync('./guai.js',"guai_count="+JSON.stringify(guai_count));
	return "呐呐呐~\n"+"[CQ:image,file=https://i0.hdslb.com/bfs/album/d095daebeb1fed37b7ae8eb71fb29c5a0dd0848c.jpg]";
}

function how_guai()
{
	if(Math.floor((time+8*3600)/86400)!=guai_count[1])
		guai_count=[0,Math.floor((time+8*3600)/86400)];
	if(guai_count[0]==0)
		return "小夕子今天还没有被夸过呐……"+"[CQ:face,id=9]";
	return "小夕子今天被夸了"+guai_count[0]+"次呐~";
}