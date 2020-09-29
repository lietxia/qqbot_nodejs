function rgbc_function(order_string)
{
	let order_option="";
	let order_detail=[""];
	let i=0,j=0;
	for(i=0;i<order_string.length;++i)
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；"||order_string[i]==" ")
			break;
		else
			order_option+=order_string[i];
	++i;
	while(i<order_string.length)
	{
		if(order_string[i]==","||order_string[i]==";"||order_string[i]=="，"||order_string[i]=="；"||order_string[i]==" ")
			order_detail[++j]="";
		else
			order_detail[j]+=order_string[i];
		++i;
	}
	fs.writeFileSync('./rgbc_log.txt',"rgbcUserData="+JSON.stringify(rgbcUserData));
	if(order_option=="注册"&&order_detail.length==1&&order_detail[0]!="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc注册(order_detail[0]);
	if(order_option=="注册"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc注册();
	if(order_option=="帮助"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc帮助;
	if(order_option=="关闭指引"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc关闭指引();
	if(order_option=="开启指引"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc开启指引();
	if(order_option=="色板"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc色板();
	if(order_option=="色值"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc色值();
	if(order_option=="探索"&&order_detail.length==1&&order_detail[0]=="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc探索();
	if(order_option=="探索"&&order_detail.length==1&&order_detail[0]!="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc探索(parse_if_number(order_detail[0]));
	if(order_option=="索取"&&order_detail.length==1&&order_detail[0]!="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc索取(order_detail[0]);
	if(order_option=="索取"&&order_detail.length==2&&order_detail[0]!=""&&order_detail[1]!="")
		return ((at_sender&&type=="group")?"\n":"")+rgbc索取(order_detail[0],parse_if_number(order_detail[1]));
	if(order_option=="调色"&&order_detail.length==2)
		return ((at_sender&&type=="group")?"\n":"")+rgbc调色(order_detail[0],order_detail[1]);
	if(order_option=="调色"&&order_detail.length==4)
		return ((at_sender&&type=="group")?"\n":"")+rgbc调色(parse_if_number(order_detail[0]),parse_if_number(order_detail[1]),parse_if_number(order_detail[2]),parse_if_number(order_detail[3]));
	if(order_option=="调色"&&order_detail.length==6)
		return ((at_sender&&type=="group")?"\n":"")+rgbc调色(parse_if_number(order_detail[0]),parse_if_number(order_detail[1]),parse_if_number(order_detail[2]),parse_if_number(order_detail[3]),parse_if_number(order_detail[4]),parse_if_number(order_detail[5]));
	return "";
}

function rgbc注册(name=nickname){
	if(rgbcUserData[id]){
		return "你已经注册色彩收集了！"
	}
	rgbcUserData[id]={
		"nickname":name,
		"coin":0,
		"collection":{},
		"display":10,
		"teaching":true,
	}
	addRGB(0,0,0,5)
	addRGB(0,0,255,5)
	addRGB(0,255,0,5)
	addRGB(255,0,0,5)
	addRGB(255,255,255,5)
	return "注册成功！\n"+rgbc开启指引()
}

function rgbc关闭指引(){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	rgbcUserData[id]["teaching"]=false
	return "新手指引已关闭，可以随时输入“rgbc开启指引”重新打开"
}

function rgbc开启指引(){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	rgbcUserData[id]["teaching"]=true
	return "现在为你进行新手指引，如果需要跳过，请输入“rgbc关闭指引”\n----------\n“只有你能拯救我们的世界了！”三只色彩鲜艳的小精灵环绕在你身边，与它们不相称的是这只有无尽的黑与白的世界。“请帮助我们找回世界的色彩吧，救世主大人！”\n（请输入“rgbc色板”查看拥有的颜色）"
}

function rgbc色板(){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	let collection=rgbcUserData[id]["collection"]
	let keys=Object.keys(collection).sort(function(a,b){return a-b})
	let str=""
	if(rgbcUserData[id]["teaching"]){
		str+="三只小精灵把一些颜色塞到了你的手上。“救世主大人，这是我们收集到的幸存的颜色，请一定要利用好它们！”\n"
	}
	str+="你现在拥有"
	for(let i=0;i<keys.length;i++){
		if(i==0){
			str+="\n"
		}
		else{
			str+="、"
		}
		if(rgbcColorList[keys[i]]){
			str+=rgbcColorList[keys[i]]+"色"
		}
		else{
			str+="无名色"
		}
		if(!rgbcUserData[id]["teaching"]||!rgbcColorList[keys[i]]){
			str+="("+index2rgb(keys[i])+")"
		}
		str+="×"+collection[keys[i]]
	}
	if(rgbcUserData[id]["teaching"]){
		str+="\n（请输入“rgbc调色,黑,白”进行调色）"
	}
	return str
}

function rgbc调色(){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	let index1,index2
	if(arguments.length==6){
		for(let i=0;i<6;i++){
			if(arguments[i]>255||arguments[i]<0||Math.floor(arguments[i])!=arguments[i]){
				return "请输入正确的颜色信息！"
			}
		}
		index1=rgb2index(arguments[0],arguments[1],arguments[2])
		index2=rgb2index(arguments[3],arguments[4],arguments[5])
	}
	else if(arguments.length==4){
		if(findkey(rgbcColorList,arguments[0])!=null){
			for(let i=1;i<4;i++){
				if(arguments[i]>255||arguments[i]<0||Math.floor(arguments[i])!=arguments[i]){
					return "请输入正确的颜色信息！"
				}
			}
			index1=findkey(rgbcColorList,arguments[0])
			index2=rgb2index(arguments[1],arguments[2],arguments[3])
		}
		else if(findkey(rgbcColorList,arguments[3])!=null){
			for(let i=0;i<3;i++){
				if(arguments[i]>255||arguments[i]<0||Math.floor(arguments[i])!=arguments[i]){
					return "请输入正确的颜色信息！"
				}
			}
			index1=rgb2index(arguments[0],arguments[1],arguments[2])
			index2=findkey(rgbcColorList,arguments[3])
		}
		else{
			return "请输入正确的颜色信息！"
		}
	}
	else if(arguments.length==2){
		if(findkey(rgbcColorList,arguments[0])!=null&&findkey(rgbcColorList,arguments[1])!=null){
			index1=findkey(rgbcColorList,arguments[0])
			index2=findkey(rgbcColorList,arguments[1])
		}
		else{
			return "请输入正确的颜色信息！"
		}
	}
	else{
		return "请输入正确的颜色信息！"
	}
	if(!rgbcUserData[id]["collection"][index1]||!rgbcUserData[id]["collection"][index2]){
		return "你没有足够的颜色！"
	}
	let rgb1=index2rgb(index1)
	let rgb2=index2rgb(index2)
	let rgbm=mixrgb(rgb1[0],rgb1[1],rgb1[2],rgb2[0],rgb2[1],rgb2[2])
	let indexm=rgb2index(rgbm[0],rgbm[1],rgbm[2])
	deleteRGB(rgb1[0],rgb1[1],rgb1[2],1)
	deleteRGB(rgb2[0],rgb2[1],rgb2[2],1)
	let isNew=addRGB(rgbm[0],rgbm[1],rgbm[2],2)
	let str=""
	str+="调出了"
	if(isNew){
		str+="新的颜色："
	}
	if(rgbcColorList[indexm]){
		str+=rgbcColorList[indexm]+"色"
		if(isNew){
			rgbcUserData[id]["coin"]+=5
		}
	}
	else{
		str+="无名色"
		if(isNew){
			rgbcUserData[id]["coin"]+=1
		}
	}
	if(!rgbcUserData[id]["teaching"]||arguments.length>2){
		str+="("+rgbm+")"
	}
	str+="×2"
	if(!rgbcUserData[id]["teaching"]){
		if(isNew){
			str+="，获得了"
			if(rgbcColorList[indexm]){
				str+=5
			}
			else{
				str+=1
			}
			str+="点色值！"
		}
	}
	if(rgbcUserData[id]["teaching"]){
		if(rgbcColorList[indexm]){
			str+="\n“太厉害了，你调出了新的颜色，用新的颜色继续调色吧！”\n（请输入“rgbc调色,"+rgbcColorList[indexm]+",红”进行调色）"
		}
		else{
			if(arguments.length==2){
				str+="\n“这种颜色……没有名字，那就用一组数字来指代吧！”\n"+"("+rgbm+")\n“嗯……虽然不太方便，但是总比一律叫无名色要好”\n（请输入“rgbc调色,"+rgbm+",绿”进行调色）"
			}
			else{
				str+="\n“进行调色时，会消耗用于调色的颜色各一个，并获得两个调出的颜色”\n“调出新的颜色时，会获得【色值】：调出无名色时会获得1点，调出有名色时会获得5点。来看看色值有什么用途吧！”\n（请输入“rgbc色值”查看色值和色值的作用）"
			}
		}
	}
	return str
}

function rgbc色值(){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	let str=""
	str+="你现在拥有"+rgbcUserData[id]["coin"]+"点色值！"
	if(rgbcUserData[id]["teaching"]){
		str+="\n“色值主要有两种用途：\n1.消耗一点色值，向我们【索取】一个基础颜色【红、绿、蓝、黑或白】\n2.消耗五点色值，【探索】这个世界，随机找到一种颜色\n如果通过探索获得了新颜色，以后再自己调出这种颜色也不会再获得色值了，想要获得色值还是要靠自己调哦！”\n（请输入“rgbc索取,蓝”或者“rgbc探索”）"
	}
	return str
}

function rgbc索取(c,n=1){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	if(Math.floor(n)!=n||n<1){
		return "请输入正确的个数！"
	}
	if(rgbcUserData[id]["coin"]<n){
		return "你没有足够的色值！\n剩余"+rgbcUserData[id]["coin"]+"点色值"
	}
	let str=""
	for(let i=0;i<n;i++){
		switch(c){
			case "红":
			addRGB(255,0,0,1)
			rgbcUserData[id]["coin"]-=1
			break
			case "绿":
			addRGB(0,255,0,1)
			rgbcUserData[id]["coin"]-=1
			break
			case "蓝":
			addRGB(0,0,255,1)
			rgbcUserData[id]["coin"]-=1
			break
			case "黑":
			addRGB(0,0,0,1)
			rgbcUserData[id]["coin"]-=1
			break
			case "白":
			addRGB(255,255,255,1)
			rgbcUserData[id]["coin"]-=1
			break
			default:return "请输入正确的颜色！"
		}
	}
	str+="给你"+n+"个"+c+"色，加油！"
	str+="\n剩余"+rgbcUserData[id]["coin"]+"点色值"
	if(rgbcUserData[id]["teaching"]){
		str+="\n（如果想要一次索取好几个，可以输入诸如“rgbc索取,蓝,10”，探索同理）\n“救世主大人，我们的世界就靠你拯救了，我们先行告退，有任何需要的话，你随时都可以将我们召唤出来！”三只小精灵分别向你行了礼，消失在了黑白的世界中。\n（新手指引已经结束，可以输入“rgbc开启指引”来重新开启新手指引）"
		rgbcUserData[id]["teaching"]=false
	}
	return str
}

function rgbc探索(n=1){
	if(!rgbcUserData[id]){
		return "你还没有注册色彩收集！请输入“rgbc注册,昵称”进行注册（昵称留空则默认为你的QQ名）"
	}
	if(Math.floor(n)!=n||n<1){
		return "请输入正确的次数！"
	}
	if(rgbcUserData[id]["coin"]<n*5){
		return "你没有足够的色值！\n剩余"+rgbcUserData[id]["coin"]+"点色值"
	}
	let str="探索得到了"
	for(let i=0;i<n;i++){
		let r=Math.floor(Math.random()*256)
		let g=Math.floor(Math.random()*256)
		let b=Math.floor(Math.random()*256)
		let index=rgb2index(r,g,b)
		addRGB(r,g,b,1)
		rgbcUserData[id]["coin"]-=5
		if(i==0){
			str+="\n"
		}
		else{
			str+="、"
		}
		if(rgbcColorList[index]){
			str+=rgbcColorList[index]+"色"
		}
		else{
			str+="无名色"
		}
		str+="("+r+","+g+","+b+")"
	}
	str+="\n加油！"
	str+="\n剩余"+rgbcUserData[id]["coin"]+"点色值"
	if(rgbcUserData[id]["teaching"]){
		str+="\n（如果想要一次探索好几次，可以输入诸如“rgbc探索,10”，索取同理）\n“救世主大人，我们的世界就靠你拯救了，我们先行告退，有任何需要的话，你随时都可以将我们召唤出来！”三只小精灵分别向你行了礼，消失在了黑白的世界中。\n（新手指引已经结束，可以输入“rgbc开启指引”来重新开启新手指引）"
		rgbcUserData[id]["teaching"]=false
	}
	return str
}

function addRGB(r,g,b,num){
	let index=rgb2index(r,g,b)
	if(rgbcUserData[id]["collection"][index]!=null){
		rgbcUserData[id]["collection"][index]+=num
		return false
	}
	else{
		rgbcUserData[id]["collection"][index]=num
		return true
	}
}

function deleteRGB(r,g,b,num){
	let index=rgb2index(r,g,b)
	rgbcUserData[id]["collection"][index]-=num
}

function index2rgb(i){
	let r=Math.floor(Math.floor(i/256)/256)%256
	let g=Math.floor(i/256)%256
	let b=i%256
	return [r,g,b]
}

function rgb2index(r,g,b){
	let i=r*65536+g*256+b
	return i
}

function mixrgb(r1,g1,b1,r2,g2,b2){
	let r=Math.round((r1+r2)/2)
	let g=Math.round((g1+g2)/2)
	let b=Math.round((b1+b2)/2)
	return [r,g,b]
}

function findkey(obj,value){
	for(let key in obj){
		if(obj[key]==value){
			return key
		}
	}
	return null
}