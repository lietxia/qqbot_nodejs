function count_sort_time(func, n) {
	let sort_sequence = [];
	for (let i = 0; i < n; ++i)
		sort_sequence.push(Math.random());
	let start_time = Date.now();
	sort_sequence = func(sort_sequence);
	return "Sorting " + n + " random numbers requires " + (Date.now() - start_time) + " ms.";
}

function origin_sort(numbers) {
	return numbers.sort();
}

function quick_sort(numbers) {
	if (numbers.length == 0 || numbers.length == 1)
		return numbers;
	let new_numbers = [];
	if (numbers.length > 1000) {
		let numbers_2 = quick_sort(numbers.splice(Math.floor(numbers.length / 2)));
		let numbers_1 = quick_sort(numbers);
		while (numbers_1.length > 0 && numbers_2.length > 0) {
			if (numbers_1[0] > numbers_2[0])
				new_numbers.push(numbers_2.shift())
			else
				new_numbers.push(numbers_1.shift())
		}
		if (numbers_1.length > 0)
			new_numbers = new_numbers.concat(numbers_1);
		else
			new_numbers = new_numbers.concat(numbers_2);
	}
	else {
		let last_number = numbers.pop();
		new_numbers = quick_sort(numbers);
		if (last_number < new_numbers[0])
			new_numbers.unshift(last_number);
		else {
			let max = new_numbers.length;
			let min = 0;
			while (min < max - 1) {
				let mid = Math.floor((min + max) / 2);
				if (new_numbers[mid] == last_number) {
					min = mid;
					break;
				}
				else if (new_numbers[mid] < last_number)
					min = mid;
				else
					max = mid;
			}
			let new_numbers_2 = new_numbers.splice(min + 1);
			new_numbers = new_numbers.concat([last_number]).concat(new_numbers_2);
		}
	}
	return new_numbers;
}

for (let i = 10; i < 100000; i = Math.floor(i * 1.1))
	console.log(count_sort_time(quick_sort, i));