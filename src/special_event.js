async function special_event_url(data) {
	if (data.post_type == "message")
		return "";
	switch (data.post_type) {
		case "notice": switch (data.notice_type) {
				case "group_increase": group_data = await get_data("http://127.0.0.1:5700/get_group_info?group_id=" + data.group_id);
					if (group_data.data == null)
						break;
					if (data.user_id == 1302733669) { http.get("http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=我进入了群聊\"" + group_data.data.group_name + "\"~"); return "http://127.0.0.1:5700/send_group_msg?group_id=" + data.group_id + "&&message=大家好，我是机器人小夕子。很高兴能为大家服务！查看我的使用说明请输入\"小夕子帮助\"，希望能和大家愉快友好地相处呐~"; } user_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.user_id);
					if (user_data.data == null)
						break;
					http.get("http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "进入了群聊\"" + group_data.data.group_name + "\"~"); return "http://127.0.0.1:5700/send_group_msg?group_id=" + data.group_id + "&&message=" + (welcome_list[data.group_id] ? welcome_list[data.group_id] : welcome_list["default"]) + ((welcome_list[data.group_id] == "") ? "" : ("%5bCQ%3aat%2cqq%3d" + data.user_id + "%5d"));
				case "group_decrease": if (data.sub_type == "kick_me") return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=我被移除了群聊" + data.group_id + "……"; group_data = await get_data("http://127.0.0.1:5700/get_group_info?group_id=" + data.group_id);
					if (group_data.data == null)
						break;
					user_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.user_id);
					if (user_data.data == null)
						break;
					return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "退出了群聊\"" + group_data.data.group_name + "\"~";
				case "group_ban": group_data = await get_data("http://127.0.0.1:5700/get_group_info?group_id=" + data.group_id);
					if (group_data.data == null)
						break;
					operator_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.operator_id);
					if (operator_data.data == null)
						break;
					if (data.user_id == 0) return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + operator_data.data.nickname + "在群聊\"" + group_data.data.group_name + "\"开启了全员禁言~";
					user_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.user_id);
					if (user_data.data == null)
						break;
					if (data.user_id == 1302733669 && data.duration >= 7200) {
						await get_data("http://127.0.0.1:5700/set_group_leave?group_id=" + data.group_id);
						return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=我在群聊\"" + group_data.data.group_name + "\"被" + operator_data.data.nickname + (data.duration == 0 ? "解除了禁言~" : ("禁言了" + Math.ceil(data.duration / 60) + "分钟~\n现已退群~"));
					}
					return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "在群聊\"" + group_data.data.group_name + "\"被" + operator_data.data.nickname + (data.duration == 0 ? "解除了禁言~" : ("禁言了" + Math.ceil(data.duration / 60) + "分钟~"));
				case "group_admin": group_data = await get_data("http://127.0.0.1:5700/get_group_info?group_id=" + data.group_id);
					if (group_data.data == null)
						break;
					user_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.user_id);
					if (user_data.data == null)
						break;
					if (data.sub_type == "set")
						return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "在群聊\"" + group_data.data.group_name + "\"被任命为管理员~";
					if (data.sub_type == "unset")
						return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "在群聊\"" + group_data.data.group_name + "\"被取消了管理员~";
					break;
			}
		case "request": switch (data.request_type) {
				case "friend": time = data.time; user_data = await get_data("http://127.0.0.1:5700/get_stranger_info?user_id=" + data.user_id);
					if (user_data.data == null)
						break;
					return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + user_data.data.nickname + "在" + 报时() + "邀请我加为好友，邀请内容是:\"" + data.comment + "\"~";
			}break;
		case "meta_event": if ((data.meta_event_type == "lifecycle") && (data.sub_type == "enable")) {
			restart_time = Date.now();
			return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=我已重启，精力充沛~";
		}
			break;
	}
	return "http://127.0.0.1:5700/send_group_msg?group_id=" + send_message_to_id + "&&message=" + JSON.stringify(data);
}

function set_group_welcome(order_string) {
	welcome_list[group_id] = order_string;
	fs.writeFileSync('./welcome.js', "welcome_list=" + JSON.stringify(welcome_list));
	return "设置成功，本群欢迎新成员的文字现在是:\n" + order_string;
}

function default_group_welcome() {
	delete welcome_list[group_id];
	fs.writeFileSync('./welcome.js', "welcome_list=" + JSON.stringify(welcome_list));
	return "设置成功，本群欢迎新成员的文字现在是:\n" + welcome_list["default"];
}