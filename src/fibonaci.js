max_str_length=30000

function fibonaci(n)
{
	if(n==1)
		return "1";
	if(n>10**7)
		return "一个非常大的数字~";
	let result=mx_pw_22([[1n,1n],[1n,0n]],n-1)[0][0].toString();
	if(result.length>max_str_length)
		result=result.substr(0,max_str_length)+"…";
	return result;
}

function mx_pw_22(mx_1,n)
{
	if(n==0)
		return [[1n,0n],[0n,1n]];
	if(n%2==1)
		return mx_times_22(mx_pw_22(mx_1,n-1),mx_1);
	return mx_sq_22(mx_pw_22(mx_1,n/2));
}

function mx_times_22(mx_1,mx_2)
{
	return [[mx_1[0][0]*mx_2[0][0]+mx_1[0][1]*mx_2[1][0],mx_1[0][0]*mx_2[0][1]+mx_1[0][1]*mx_2[1][1]],[mx_1[1][0]*mx_2[0][0]+mx_1[1][1]*mx_2[1][0],mx_1[1][0]*mx_2[0][1]+mx_1[1][1]*mx_2[1][1]]];
}

function mx_sq_22(mx_1)
{
	return mx_times_22(mx_1,mx_1);
}