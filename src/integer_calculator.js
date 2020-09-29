function positive_anti(int_a)
{
	anti_a="";
	for(let i=0;i<int_a.length;++i)
		anti_a+=int_a[int_a.length-i-1];
	return anti_a;
}

function positive_simplify(int_a)
{
	let i=0;
	while(int_a[i]=="0")
		++i;
	if(i==int_a.length)
		--i;
	return int_a.substr(i);
}

function positive_add(a,b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return "NaN";
	if(!is_positive(a)||!is_positive(b))
		return "NaN";
	let anti_a=positive_anti(a);
	let anti_b=positive_anti(b);
	let sum="";
	let carry=0;
	for(let i=0;i<anti_a.length||i<anti_b.length;++i)
	{
		sum+=integer_addlist[carry][(i>=anti_a.length)?0:anti_a[i]][(i>=anti_b.length)?0:anti_b[i]][0];
		carry=integer_addlist[carry][(i>=anti_a.length)?0:anti_a[i]][(i>=anti_b.length)?0:anti_b[i]][1];
	}
	if(carry==1)
		sum+=1;
	return positive_simplify(positive_anti(sum));
}

function positive_multiply(a,b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return "NaN";
	if(!is_positive(a)||!is_positive(b))
		return "NaN";
	if(a=="0"||b=="0")
		return "0";
	if(a=="1")
		return positive_simplify(b);
	if(b=="1")
		return positive_simplify(a);
	let anti_a=positive_anti(a);
	let anti_b=positive_anti(b);
	let product="0";
	for(let i=0;i<(anti_a.length)+(anti_b.length)-1;++i)
	{
		let carry_product="0";
		for(let j=0;j<=i;++j)
			carry_product=positive_add(carry_product,integer_multiplylist[(j>=anti_a.length)?0:anti_a[j]][(i>=anti_b.length+j)?0:anti_b[i-j]])
		for(let j=0;j<i;++j)
			carry_product+="0";
		product=positive_add(product,carry_product);
	}
	return positive_simplify(product);
}

function positive_power(a,b)
{
	if(a=="0"&&b=="0")
		return "NaN";
	if(a=="0")
		return "0";
	if(b=="0")
		return "1";
	if(b=="1")
		return a;
	if(Date.now()-calculator_start_time>Max_cal_time)
		return "NaN";
	let half_b=positive_divide(b,"2");
	let half_power=positive_power(a,half_b[0]);
	let remain_power=positive_power(a,half_b[1]);
	return positive_multiply(half_power,positive_multiply(half_power,remain_power));
}

function positive_greater(int_a,int_b)
{
	if(int_a.length!=int_b.length)
		return int_a.length>int_b.length;
	return int_a>int_b;
}

function positive_equal_or_greater(int_a,int_b)
{
	if(int_a.length!=int_b.length)
		return int_a.length>int_b.length;
	return int_a>=int_b;
}

function positive_smaller(int_a,int_b)
{
	if(int_a.length!=int_b.length)
		return int_a.length<int_b.length;
	return int_a<int_b;
}

function positive_equal_or_smaller(int_a,int_b)
{
	if(int_a.length!=int_b.length)
		return int_a.length<int_b.length;
	return int_a<=int_b;
}

function positive_difference(int_a,int_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return "NaN";
	if(!is_positive(int_a)||!is_positive(int_b))
		return "NaN";
	if(int_a==int_b)
		return "0";
	if(int_a=="0")
		return int_b;
	if(int_b=="0")
		return int_a;
	let greater_int=int_a;
	let smaller_int=int_b;
	if(positive_smaller(int_a,int_b))
	{
		greater_int=int_b;
		smaller_int=int_a;
	}
	let smaller_complement="";
	for(let i=0;i<greater_int.length;++i)
		smaller_complement+=(i<(greater_int.length-smaller_int.length))?"9":single_integer_complementary[smaller_int[i+smaller_int.length-greater_int.length]];
	let unrevised_difference=positive_add(positive_add(greater_int,positive_simplify(smaller_complement)),"1");
	return positive_simplify(unrevised_difference.substr(1));
}


function positive_divide(int_a,int_b)
{
	if(!is_positive(int_a)||!is_positive(int_b))
		return "NaN";
	if(int_b=="0")
		return "NaN";
	if(positive_smaller(int_a,int_b))
		return ["0",int_a];
	if(int_b=="1")
		return [positive_simplify(int_a),"0"];
	if(int_a==int_b)
		return ["1","0"];
	let deci=1;
	if(positive_equal_or_greater(int_a.substr(0,int_b.length),int_b))
		while(positive_equal_or_greater(int_a.substr(0,int_b.length),positive_multiply(JSON.stringify(deci),int_b)))
			++deci;
	else
		while(positive_equal_or_greater(int_a.substr(0,int_b.length+1),positive_multiply(JSON.stringify(deci),int_b)))
			++deci;
	deci=JSON.stringify(deci-1);
	for(let i=0;i<int_a.length-int_b.length-1;++i)
		deci+="0";
	if(positive_equal_or_greater(int_a.substr(0,int_b.length),int_b)&&int_a.length>int_b.length)
		deci+="0";
	let reduced_division=positive_difference(int_a,positive_multiply(int_b,deci[0])+deci.substr(1));
	let next_divide=positive_divide(reduced_division,int_b);
	return [positive_add(deci,next_divide[0]),next_divide[1]];
}

function is_positive(int_a)
{
	for(let i=0;i<int_a.length;++i)
		if(int_a[i]<"0"||int_a[i]>"9")
			return false;
	return true;
}

function is_integer(int_a)
{
	if(typeof(int_a)!="string")
		return false;
	if(int_a[0]=="-")
		return is_positive(int_a.substr(1));
	return is_positive(int_a);
}

function integer_add(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return "NaN";
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return "-"+positive_add(int_a.substr(1),int_b.substr(1));
		else
			if(positive_equal_or_greater(int_b,int_a.substr(1)))
				return positive_difference(int_a.substr(1),int_b);
			else
				return "-"+positive_difference(int_a.substr(1),int_b);
	else
		if(int_b[0]!="-")
			return positive_add(int_a,int_b);
		else
			if(positive_equal_or_greater(int_a,int_b.substr(1)))
				return positive_difference(int_a,int_b.substr(1));
			else
				return "-"+positive_difference(int_a,int_b.substr(1));
}

function integer_minus(int_a,int_b)
{
	if(int_b[0]=="-")
		return integer_add(int_a,int_b.substr(1));
	else
		return integer_add(int_a,"-"+int_b);
}

function integer_multiply(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return "NaN";
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return positive_multiply(int_a.substr(1),int_b.substr(1));
		else
			return "-"+positive_multiply(int_a.substr(1),int_b);
	else
		if(int_b[0]!="-")
			return positive_multiply(int_a,int_b);
		else
			return "-"+positive_multiply(int_a,int_b.substr(1));
}

function integer_divide(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return ["NaN","0"];
	if(int_a[0]=="-")
		if(int_b[0]=="-")
		{			
			let absolute_divide=positive_divide(int_a.substr(1),int_b);
			if(absolute_divide[1]!="0")
				return [positive_add(absolute_divide[0],"1"),positive_difference(absolute_divide[1],int_b)];
			else
				return [absolute_divide[0],"0"];
		}
		else
		{
			let absolute_divide=positive_divide(int_a.substr(1),int_b);
			if(absolute_divide[1]!="0")
				return ["-"+positive_add(absolute_divide[0],"1"),positive_difference(absolute_divide[1],int_b)];
			else
				return ["-"+absolute_divide[0],"0"];
		}
	else
		if(int_b[0]!="-")
			return positive_divide(int_a,int_b);
		else
		{
			let absolute_divide=positive_divide(int_a,int_b.substr(1));
			return ["-"+absolute_divide[0],absolute_divide[1]];
		}
}

function neg_integer(int_a)
{
	if(!is_integer(int_a))
		return "NaN";
	if(int_a[0]=="-")
		return int_a.substr(1);
	if(int_a=="0")
		return "0";
	return "-"+int_a;
}

function integer_simplify(int_a)
{
	if(!is_integer(int_a))
		return "NaN";
	let absolute="";
	if(int_a[0]=="-")
		absolute=positive_simplify(int_a.substr(1));
	else
		absolute=positive_simplify(int_a);
	if(absolute=="0")
		return "0";
	return ((int_a[0]=="-")?"-":"")+absolute;
}

function integer_factorial(int_a)
{
	if(!is_positive(int_a))
		return "NaN";
	if(positive_greater(int_a,"251"))
		return "NaN";
	if(int_a=="0")
		return "1";
	return positive_multiply(int_a,integer_factorial(positive_difference(int_a,"1")));
}

function power_10(n)
{
	let number="1";
	for(let i=0;i<n;++i)
		number+="0";
	return number;
}

function integer_greater(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return false;
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return positive_smaller(int_a.substr(1),int_b.substr(1));
		else
			return false;
	else
		if(int_b[0]=="-")
			return true;
		else
			return positive_greater(int_a,int_b);
}

function integer_equal_or_greater(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return false;
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return positive_equal_or_smaller(int_a.substr(1),int_b.substr(1));
		else
			return false;
	else
		if(int_b[0]=="-")
			return true;
		else
			return positive_equal_or_greater(int_a,int_b);
}

function integer_smaller(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return false;
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return positive_greater(int_a.substr(1),int_b.substr(1));
		else
			return false;
	else
		if(int_b[0]=="-")
			return true;
		else
			return positive_smaller(int_a,int_b);
}

function integer_equal_or_smaller(int_a,int_b)
{
	if(!is_integer(int_a)||!is_integer(int_b))
		return false;
	if(int_a[0]=="-")
		if(int_b[0]=="-")
			return positive_equal_or_greater(int_a.substr(1),int_b.substr(1));
		else
			return false;
	else
		if(int_b[0]=="-")
			return true;
		else
			return positive_equal_or_smaller(int_a,int_b);
}

function exact_root(int_a,int_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return "NaN";
	if(int_a[0]=="-")
	{
		if(positive_divide(int_b[int_b.length-1],"2")[1]=="0")
			return "NaN";
		else
		{
			let neg_root=exact_root(int_a.substr(1),int_b);
			return (neg_root=="NaN")?"NaN":("-"+neg_root);
		}
	}
	let itt_up=power_10(Math.ceil(int_a.length/JSON.parse(int_b)));
	let itt_down=positive_difference(power_10(Math.ceil(int_a.length/JSON.parse(int_b))-1),"1");
	let itt_test=positive_divide(positive_add(itt_up,itt_down),"2")[0];
	while(itt_test!=itt_up&&itt_test!=itt_down)
	{
		let itt_power=positive_power(itt_test,int_b);
		if(itt_power==int_a)
			return itt_test;
		if(positive_greater(itt_power,int_a))
			itt_up=itt_test;
		else
			itt_down=itt_test;
		itt_test=positive_divide(positive_add(itt_up,itt_down),"2")[0];
	}
	return "NaN";
}

function integer_power_decompose(int_a,int_b)
{
	if(int_a[0]=="-")
	{
		let p_divisor=integer_power_decompose(int_a.substr(1),int_b);
		return [p_divisor[0],"-"+p_divisor[1]];
	}
	if(int_a=="0")
		return ["0","1"];
	if(int_a=="1")
		return ["1","1"];
	return max_p_divisor(int_a,int_b);
}

/* 给定整数a,b>1，返回最大的t开b次方(和a除以t)，使得t整除a且t开b次方是整数。 */

function max_p_divisor(int_a,int_b,prime_start="2")
{
	for(let i=prime_start;positive_smaller(i,"400");i=positive_add(i,"1"))
		if(prime_list[i])
		{
			let try_divisor=positive_power(i,int_b);
			if(positive_greater(try_divisor,int_a))
				return ["1",int_a];
			let check_divisor=positive_divide(int_a,try_divisor);
			if(check_divisor[1]=="0")
			{
				let next_result=max_p_divisor(check_divisor[0],int_b,i);
				return [positive_multiply(i,next_result[0]),next_result[1]];
			}
		}
	return ["1",int_a];
}

function integer_check_power(int_a,int_b)
{
	if(int_a[0]=="-")
	{
		let p_power=integer_check_power(int_a.substr(1),int_b);
		while(positive_divide(p_power[1],"2")[1]=="0")
			p_power=[positive_multiply(p_power[0],p_power[0]),positive_divide(p_power[1],"2")[0]];
		return ["-"+p_power[0],p_power[1]];
	}
	if(int_a=="0")
		return ["0",positive_difference(int_b,"1")];
	if(int_a=="1")
		return ["1",positive_difference(int_b,"1")];
	return max_p_exponent(int_a,int_b);
}

/* 给定整数a,b>1，返回最大整数t<b(和a开t次方)，使得a开t次方是整数。 */

function max_p_exponent(int_a,int_b)
{
	if(positive_greater(int_b,"103"))
		return ["NaN","0"];
	let mod=positive_divide(int_a,int_b)[1];
	if(mod=="0"||!prime_list[int_b])
	{
		let guess_result=max_p_exponent(int_a,positive_add(int_b,"1"));
		if(positive_greater(guess_result[1],int_b))
			return [positive_power(guess_result[0],prime_decompose[guess_result[1]][0]),positive_divide(guess_result[1],prime_decompose[guess_result[1]][0])];
		return guess_result;
	}
	let check_mod=mod;
	let i=1;
	for(;check_mod!="1";++i)
		check_mod=positive_divide(positive_multiply(check_mod,mod),int_b)[1];
	let k=JSON.stringify(i);
	let order=positive_difference(int_b,"1");
	for(let t=order;t!="0";t=positive_difference(t,"1"))
		if(positive_divide(order,positive_multiply(k,gcd(order,t)))[1]!="0")
			continue;
		else
		{
			let guess_root=exact_root(int_a,t);
			if(guess_root!="NaN")
				return [guess_root,t];
		}
	return ["NaN","0"];
}