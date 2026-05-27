/**
 * @模块 培养皿辅助函数.js
 * @描述 细胞战争游戏的辅助函数，提供存活细胞列表查询
 */

/**
 * 列出当前存活的细胞名称
 * @returns {string} 存活细胞列表字符串
 */
function alive_cell() {
	let alive_string = "以下细胞还活着哟:\n"
	for (let i = 0; i < cell_health_list.length; ++i)
		if (cell_health_list[i].length > 0)
			alive_string += cell_status[i]["name"] + "细胞,";
	return alive_string + "\nlet's fight,fight,fight!";
}