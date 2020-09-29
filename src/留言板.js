function 留言(D) {
	if (D.length > 0 && D[0] != "板") {
		留言板.push(nickname + "：" + D);
		fs.writeFileSync('./留言内容.js', "留言板=" + JSON.stringify(留言板));
	}
	let 留言_string = "留言板\n置顶 天凤夕子:不要在留言板说奇怪的话！";
	for (i = 留言板.length - 1; i > ((留言板.length >= 11) ? ((type == "group") ? 留言板.length - 11 : 0) : 0); i--)
		留言_string += "\n" + i + " " + 留言板[i];
	if (留言板.length >= 11 && type == "group")
		留言_string += "\n更多留言请私聊查看~"
	if (留言板.length == 1)
		留言_string += "\n当前没有留言~";
	return 留言_string;
}

function delete留言(n) {
	留言板.splice(n, 1);
	fs.writeFileSync('./留言内容.js', "留言板=" + JSON.stringify(留言板));
	let 留言_string = "留言板\n置顶 天凤夕子:不要在留言板说奇怪的话！";
	for (i = 留言板.length - 1; i > ((留言板.length >= 11) ? ((type == "group") ? 留言板.length - 11 : 0) : 0); i--)
		留言_string += "\n" + i + " " + 留言板[i];
	if (留言板.length >= 11 && type == "group")
		留言_string += "\n更多留言请私聊查看~"
	if (留言板.length == 1)
		留言_string += "\n当前没有留言~";
	return 留言_string;
}