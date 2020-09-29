function algebraic_define(order_string)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	let rationize=rational_define(order_string);
	if(!is_rational(rationize))
		return {"base":{},"coefficient":["NaN","NaN"]};
	return {"base":{},"coefficient":rationize};
}

function algebraic_simplify(alg_a)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])=="{}")
		return {"base":{},"coefficient":rational_simplify(alg_a["coefficient"])};
	let simplified_coefficient=polynomial_divide(alg_a["coefficient"],alg_a["base"]["min_monic_pol"])[1];
	if(simplified_coefficient.length==1)
		return {"base":{},"coefficient":simplified_coefficient[0]};
	return {"base":alg_a["base"],"coefficient":simplified_coefficient};
}

function algebraic_inverse(alg_a)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])=="{}")
		return {"base":{},"coefficient":[alg_a["coefficient"][1],alg_a["coefficient"][0]]};
	return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_inverse(alg_a["base"]["min_monic_pol"],alg_a["coefficient"])});
}

function algebraic_int_power(alg_a,int_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(int_b[0]=="-")
		return algebraic_int_power(algebraic_inverse(alg_a),neg_integer(int_b));
	if(JSON.stringify(alg_a)==`{"base":{},"coefficient":["0","1"]}`&&int_b=="0")
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(int_b=="0")
		return {"base":{},"coefficient":["1","1"]};
	if(int_b=="1")
		return alg_a;
	if(JSON.stringify(alg_a["base"])=="{}")
		return {"base":{},"coefficient":rational_int_power(alg_a["coefficient"],int_b)};
	let half_b=positive_divide(int_b,"2");
	let half_power=algebraic_int_power(alg_a,half_b[0]);
	let remain_power=algebraic_int_power(alg_a,half_b[1]);
	return algebraic_multiply(half_power,algebraic_multiply(half_power,remain_power));
}

function algebraic_power(alg_a,alg_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_b["base"])!="{}")
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(alg_b["coefficient"][0][0]=="-")
		return algebraic_inverse(algebraic_rational_power(alg_a,neg_rational(alg_b["coefficient"])));
	return algebraic_rational_power(alg_a,alg_b["coefficient"]);
}

function algebraic_rational_power(alg_a,rat_b)
{
	if(rat_b[1]=="0")
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(rat_b[1]=="1")
		return algebraic_int_power(alg_a,rat_b[0]);
	if(JSON.stringify(alg_a["base"])!="{}")
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(alg_a["coefficient"][0]=="0")
		return {"base":{},"coefficient":["0","1"]};
	if(alg_a["coefficient"][0]=="1"&&alg_a["coefficient"][1]=="1")
		return {"base":{},"coefficient":["1","1"]};
	if(positive_greater(rat_b[0],"100"))
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(positive_greater(rat_b[1],"100"))
		return {"base":{},"coefficient":["NaN","NaN"]};
	for(let i=0;i<prime_decompose[rat_b[1]].length;++i)
	{
		let root_up=exact_root(alg_a["coefficient"][0],prime_decompose[rat_b[1]][i]);
		let root_down=exact_root(alg_a["coefficient"][1],prime_decompose[rat_b[1]][i]);
		if(root_up!="NaN"&&root_down!="NaN")
			return algebraic_rational_power({"base":{},"coefficient":[root_up,root_down]},[rat_b[0],positive_divide(rat_b[1],prime_decompose[rat_b[1]][i])[0]]);
	}
	let power_decompose_up=integer_power_decompose(alg_a["coefficient"][0],rat_b[1]);
	let power_decompose_down=integer_power_decompose(alg_a["coefficient"][1],rat_b[1]);
	let power_check_up=integer_check_power(power_decompose_up[1],rat_b[1]);
	let power_check_down=integer_check_power(power_decompose_down[1],rat_b[1]);
	let common_power=gcd(power_check_up[1],power_check_down[1]);
	if(common_power!=power_check_up[1])
	{
		let remain_power_up=positive_divide(power_check_up[1],common_power)[0];
		power_check_up[0]=rational_int_power([power_check_up[0],"1"],remain_power_up)[0];
	}
	if(common_power!=power_check_down[1])
	{
		let remain_power_down=positive_divide(power_check_down[1],common_power)[0];
		power_check_down[0]=rational_int_power([power_check_down[0],"1"],remain_power_down)[0];
	}
	let min_pol_a=[["1","1"]];
	for(let itt="1";positive_smaller(itt,rat_b[1]);itt=positive_add(itt,"1"))
		min_pol_a.push(["0","1"]);
	min_pol_a.push(neg_rational([power_check_up[0],power_check_down[0]]));
	let min_coef=[[power_decompose_up[0],power_decompose_down[0]]];
	let min_coef_power=positive_multiply(rat_b[0],common_power);
	for(let itt="0";positive_smaller(itt,min_coef_power);itt=positive_add(itt,"1"))
		min_coef.push(["0","1"]);
	return algebraic_simplify({"base":{"base":{},"min_monic_pol":min_pol_a},"coefficient":min_coef});
}

function algebraic_add(alg_a,alg_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return {"base":{},"coefficient":rational_add(alg_a["coefficient"],alg_b["coefficient"])};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])!="{}")
		return algebraic_simplify({"base":alg_b["base"],"coefficient":polynomial_add([alg_a["coefficient"]],alg_b["coefficient"])});
	if(JSON.stringify(alg_a["base"])!="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_add(alg_a["coefficient"],[alg_b["coefficient"]])});
	if(JSON.stringify(alg_a["base"])!=JSON.stringify(alg_b["base"]))
		return {"base":{},"coefficient":["NaN","NaN"]};
	return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_add(alg_a["coefficient"],alg_b["coefficient"])});
}

function algebraic_minus(alg_a,alg_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return {"base":{},"coefficient":rational_minus(alg_a["coefficient"],alg_b["coefficient"])};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])!="{}")
		return algebraic_simplify({"base":alg_b["base"],"coefficient":polynomial_minus([alg_a["coefficient"]],alg_b["coefficient"])});
	if(JSON.stringify(alg_a["base"])!="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_minus(alg_a["coefficient"],[alg_b["coefficient"]])});
	if(JSON.stringify(alg_a["base"])!=JSON.stringify(alg_b["base"]))
		return {"base":{},"coefficient":["NaN","NaN"]};
	return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_minus(alg_a["coefficient"],alg_b["coefficient"])});
}

function algebraic_multiply(alg_a,alg_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return {"base":{},"coefficient":rational_multiply(alg_a["coefficient"],alg_b["coefficient"])};
	if(JSON.stringify(alg_a["base"])=="{}"&&JSON.stringify(alg_b["base"])!="{}")
		return algebraic_simplify({"base":alg_b["base"],"coefficient":polynomial_multiply([alg_a["coefficient"]],alg_b["coefficient"])});
	if(JSON.stringify(alg_a["base"])!="{}"&&JSON.stringify(alg_b["base"])=="{}")
		return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_multiply(alg_a["coefficient"],[alg_b["coefficient"]])});
	if(JSON.stringify(alg_a["base"])!=JSON.stringify(alg_b["base"]))
		return {"base":{},"coefficient":["NaN","NaN"]};
	return algebraic_simplify({"base":alg_a["base"],"coefficient":polynomial_multiply(alg_a["coefficient"],alg_b["coefficient"])});
}

function algebraic_divide(alg_a,alg_b)
{
	if(Date.now()-calculator_start_time>Max_cal_time)
		return {"base":{},"coefficient":["NaN","NaN"]};
	return algebraic_multiply(alg_a,algebraic_inverse(alg_b));
}

function algebraic_factorial(alg_a)
{
	if(Date.now()-calculator_start_time>10000)
		return {"base":{},"coefficient":["NaN","NaN"]};
	if(JSON.stringify(alg_a["base"])!="{}")
		return {"base":{},"coefficient":["NaN","NaN"]};
	return {"base":{},"coefficient":rational_factorial(alg_a["coefficient"])};
}

function algebraic_show(alg_a)
{
	if(JSON.stringify(alg_a["base"])=="{}")
		return rational_show(alg_a["coefficient"]);
	let degree=JSON.stringify(alg_a["base"]["min_monic_pol"].length-1);
	let show_string="";
	for(let i=0;i<alg_a["coefficient"].length-1;++i)
	{
		if(alg_a["coefficient"][i][0]=="0")
			continue;
		if(alg_a["coefficient"][i][0]=="1"&&alg_a["coefficient"][i][1]=="1")
		{
			show_string+=((i!=0)?"+":"")+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?"(":"")+rational_show(neg_rational(alg_a["base"]["min_monic_pol"][degree]))+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?")":"")+"^("+rational_show(rational_simplify([JSON.stringify(alg_a["coefficient"].length-i-1),degree]))+")";
			continue;
		}
		if(alg_a["coefficient"][i][0]=="-1"&&alg_a["coefficient"][i][1]=="1")
		{
			show_string+="-"+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?"(":"")+rational_show(neg_rational(alg_a["base"]["min_monic_pol"][degree]))+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?")":"")+"^("+rational_show(rational_simplify([JSON.stringify(alg_a["coefficient"].length-i-1),degree]))+")";
			continue;
		}
		if(alg_a["coefficient"][i][0][0]=="-")
		{
			show_string+="-"+(alg_a["coefficient"][i][1]!="1"?"(":"")+rational_show(neg_rational(alg_a["coefficient"][i]))+(alg_a["coefficient"][i][1]!="1"?")":"")+"*"+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?"(":"")+rational_show(neg_rational(alg_a["base"]["min_monic_pol"][degree]))+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?")":"")+"^("+rational_show(rational_simplify([JSON.stringify(alg_a["coefficient"].length-i-1),degree]))+")";
			continue;
		}
		show_string+=((i!=0)?"+":"")+(alg_a["coefficient"][i][1]!="1"?"(":"")+rational_show(alg_a["coefficient"][i])+(alg_a["coefficient"][i][1]!="1"?")":"")+"*"+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?"(":"")+rational_show(neg_rational(alg_a["base"]["min_monic_pol"][degree]))+((alg_a["base"]["min_monic_pol"][degree][0][0]!="-"||alg_a["base"]["min_monic_pol"][degree][1]!="1")?")":"")+"^("+rational_show(rational_simplify([JSON.stringify(alg_a["coefficient"].length-i-1),degree]))+")";
	}
	if(alg_a["coefficient"][alg_a["coefficient"].length-1][0]!="0")
		show_string+=((alg_a["coefficient"][alg_a["coefficient"].length-1][0][0]!="-")?"+":"")+rational_show(alg_a["coefficient"][alg_a["coefficient"].length-1]);
	return show_string.replace("(-1)^(1/2)","i");
}