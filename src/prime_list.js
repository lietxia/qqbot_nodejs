function calculate_prime(n)
{
	let prime_list=[false,false];
	for(let i=2;i<=n;++i)
	{
		if(prime_decompose[i].length==1&&prime_decompose[i]==i)
			prime_list.push(true);
		else
			prime_list.push(false);
	}
	return prime_list;
}
