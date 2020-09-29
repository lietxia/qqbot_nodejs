function music(order_string)
{
	at_sender=false;
	if(order_string=="")
	{
		let random_music=random(0,musiclist.length);
		while(musiclist[random_music]==group_music[group_id])
			random_music=random(0,musiclist.length);
		order_string=musiclist[random_music];
		group_music[group_id]=order_string;
		console.log(order_string);
	}
	fs.writeFileSync('./musicrecord.js',"group_music="+JSON.stringify(group_music));
	return "[CQ:music,type=163,id="+order_string+"]";
}

function add_music(order_string)
{
	musiclist.push(order_string);
	fs.writeFileSync('./musiclist.js',"musiclist="+JSON.stringify(musiclist));
	return order_string+"号音乐已加入歌单~";
}

function delete_music(order_string)
{
	if(musiclist.indexOf(order_string)<0)
		return "歌曲不存在呢~";
	musiclist.splice(musiclist.indexOf(order_string));
	fs.writeFileSync('./musiclist.js',"musiclist="+JSON.stringify(musiclist));
	return order_string+"号音乐已移除歌单~";
}