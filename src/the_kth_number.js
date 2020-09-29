function find_kth_small(numbers,k)
{
	if(numbers.length==0||numbers.length<k||k<=0)
		return "Not exists.";
	if(numbers.length==1)
		return numbers[0];
	let sort_numbers=[numbers[0],numbers[1]];
	if(numbers[0]>numbers[1])
		sort_numbers=[numbers[1],numbers[0]];
	for(let i=2;i<numbers.length;++i)
	{
		if(numbers[i]>sort_numbers[sort_numbers.length-1])
			sort_numbers.push(numbers[i]);
		else if(numbers[i]<=sort_numbers[0])
			sort_numbers.unshift(numbers[i]);
		else
		{
			for(let j=0;j<sort_numbers.length-1;++j)
				if(sort_numbers[j]<numbers[i]&&sort_numbers[j+1]>=numbers[i])
				{
					let new_sort_numbers=sort_numbers.splice(j+1);
					sort_numbers=sort_numbers.concat([numbers[i]]).concat(new_sort_numbers);
					break;
				}
		}
	}
	return sort_numbers[k-1];
}

function find_kth(numbers,k)
{
	if(numbers.length<k)
		return "Not exists.";
	if(numbers.length<8)
		return find_kth_small(numbers,k);
	let smaller_section=[];
	let greater_section=[];
	let standard=find_about_mid(numbers);
	while(numbers.length>0)
	{
		let the_number=numbers.pop();
		if(the_number<standard)
			smaller_section.push(the_number);
		else
			greater_section.push(the_number);
	}
	if(k>smaller_section.length)
		return find_kth(greater_section,k-smaller_section.length);
	else
		return find_kth(smaller_section,k);
}

function find_about_mid(numbers)
{
	let mid_numbers=[];
	let group_numbers=[];
	for(let i=0;i<numbers.length;++i)
		if(i%5==4)
		{
			mid_numbers.push(find_kth_small(group_numbers,3));
			group_numbers=[];
		}
		else
			group_numbers.push(numbers[i]);
	mid_numbers.push(find_kth_small(group_numbers,Math.ceil(group_numbers.length/2)));
	return find_kth(mid_numbers,Math.ceil(mid_numbers.length/2));
}

find_kth([0,1,2,3,4,5,0,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],5)