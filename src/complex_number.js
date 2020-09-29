function complex_define()

function complex_abs(c_a)
{
	return (c_a[0]*c_a[0]+c_a[1]*c_a[1])**(1/2);
}

function complex_conjugate(c_a)
{
	return [c_a[0],-c_a[1]];
}

function complex_add(c_a,c_b)
{
	return [c_a[0]+c_b[0],c_a[1]+c_b[1]];
}

function complex_minus(c_a,c_b)
{
	return [c_a[0]-c_b[0],c_a[1]-c_b[1]];
}

function complex_multiply(c_a,c_b)
{
	return [c_a[0]*c_b[0]-c_a[1]*c_b[1],c_a[0]*c_b[1]+c_a[1]*c_b[0]];
}

function complex_divide(c_a,c_b)
{
	return complex_multiply([1/complex_abs(c_b),0],complex_multiply(c_a,complex_conjugate(c_b)));
}