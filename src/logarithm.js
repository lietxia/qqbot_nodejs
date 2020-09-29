function ln(a) {
	if (a < 1)
		return -log(1 / a);
	let inte = 0;
	while (a >= Math.E) {
		a /= Math.E;
		++inte;
	}
	let deci = 0;
	let x = 1;
	for (let i = 1; i < 60; ++i) {
		x *= (a - 1) / a;
		deci += x / i;
	}
	return inte + deci;
}