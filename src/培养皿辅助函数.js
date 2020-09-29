function alive_cell() {
	let alive_string = "以下细胞还活着哟:\n"
	for (let i = 0; i < cell_health_list.length; ++i)
		if (cell_health_list[i].length > 0)
			alive_string += cell_status[i]["name"] + "细胞,";
	return alive_string + "\nlet's fight,fight,fight!";
}