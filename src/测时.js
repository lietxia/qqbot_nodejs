function count_func_time(func,...arg)
{
	let start=Date.now();
	return JSON.stringify(func(...arg))+" ("+(Date.now()-start)+"ms)";
}