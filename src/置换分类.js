function board_divide(order_string)
{
	let i=0,j=0;
	let board=[[""]];
	for(let k=0;k<order_string.length;++k)
	{
		if(order_string[k]==" ")
		{
			++j;
			board[i][j]="";
		}
		else if(order_string[k]=="\n"||order_string[k]=="\r")
		{
			j=0;
			++i;
			board[i]=[""];
		}
		else
			board[i][j]+=order_string[k];
	}
	if(!is_valid(board))
		return "方阵不合规~";
	if(board.length>4)
		return "方阵太大了(最大4*4)……";
	return count_func_time(search_divide,board);
}

function is_valid(board)
{
	if(!Array.isArray(board))
		return false;
	for(let i=0;i<board.length;++i)
		if(!Array.isArray(board[i])||board[i].length!=board.length)
			return false;
	return true;
}

function add_board(board,marked_place,marked_type,i,j)
{
	if(marked_place[i*board.length+j]||board[i][j]!=marked_type)
		return;
	marked_place[i*board.length+j]=true;
	if(i>0)
		add_board(board,marked_place,marked_type,i-1,j);
	if(i<board.length-1)
		add_board(board,marked_place,marked_type,i+1,j);
	if(j>0)
		add_board(board,marked_place,marked_type,i,j-1);
	if(j<board[i].length-1)
		add_board(board,marked_place,marked_type,i,j+1);
	return;
}

function is_divided(board)
{
	let marked_place=[];
	let marked_type=[];
	for(let i=0;i<board.length**2;++i)
		marked_place.push(false);
	for(let i=0;i<board.length;++i)
		for(let j=0;j<board.length;++j)
		{
			if(marked_place[i*board.length+j])
				continue;
			if(marked_type.includes(board[i][j]))
				return false;
			marked_type.push(board[i][j]);
			add_board(board,marked_place,board[i][j],i,j);
		}
	return true;
}

function max_distance_on_board(i,j,n)
{
	return ((i>2*n)?i:(n-i))+((j>2*n)?j:(n-j));
}

function messness(board)
{
	return 0;
	let the_mess={};
	for(let i=0;i<board.length**2;++i)
		for(let j=i+1;j<board.length**2;++j)
			if(board[Math.floor(i/board.length)][i%board.length]==board[Math.floor(j/board.length)][j%board.length])
				the_mess+=Math.abs(Math.floor(i/board.length)-Math.floor(j/board.length))+Math.abs((i%board.length)-(j%board.length));
	/*let the_mess_board=[];
	let max_possible_dis=board.length+board[0].length;
	for(let i=0;i<board.length;++i)
	{
		the_mess_board[i]=[];
		for(let j=0;j<board[i].length;++j)
			the_mess_board[i][j]=max_possible_dis;
	}
	for(let i=0;i<board.length;++i)
		for(let j=0;j<board[i].length;++j)
		{
			if(the_mess_board[i][j]==1)
				continue;
			for(let k=1;k<=((the_mess_board[i][j]<max_distance_on_board(i,j,board.length))?the_mess_board[i][j]:max_distance_on_board(i,j,board.length));++k)
			{
				for(let l=((j+k>board[i].length)?(j+k-board[i].length):0);l<=((i+k+1<board.length)?k:(board.length-i-1));++l)
					if(board[i][j]==board[i+l][j+k-l])
					{
						the_mess_board[i][j]=k;
						the_mess_board[i+l][j+k-l]=k;
					}
				for(let l=1;)
			}
			the_mess+=the_mess_board[i][j]-1;
		}
	console.log(the_mess_board);*/
	return the_mess;
}

function search_divide(board)
{
	let search_queue=[{"id":0,"times":0,"board":board,"operations":[],"messness":messness(board)}];
	let marked_positions=[JSON.stringify(board)];
	//let marked_positions=[];
	let t=0;
	let begin_time=Date.now();
	while((search_queue.length>0)&&(!is_divided(search_queue[0]["board"])))
	{
		if(Date.now()-begin_time>Max_fys_time)
			return "太慢了，不算了~";
		/*if(marked_positions.includes(JSON.stringify(search_queue[0]["board"])))
		{
			search_queue.shift();
			continue;
		}
		else
			marked_positions.push(JSON.stringify(search_queue[0]["board"]));*/
		for(let i=0;i<search_queue[0]["board"].length;++i)
			for(let j=0;j<search_queue[0]["board"][i].length;++j)
			{
				if(i!=search_queue[0]["board"].length-1)
				{
					let new_board=JSON.parse(JSON.stringify(search_queue[0]["board"]));
					let temp=new_board[i][j];
					new_board[i][j]=new_board[i+1][j];
					new_board[i+1][j]=temp;
					if(!marked_positions.includes(JSON.stringify(new_board)))
					{
						marked_positions.push(JSON.stringify(new_board));
						let new_messness=messness(new_board);
						if(new_messness<=search_queue[0]["messness"])
						{
							++t;
							search_queue.push({"id":t,"times":search_queue[0]["times"]+1,"board":new_board,"operations":search_queue[0]["operations"].concat([[i,j,"d"]]),"messness":new_messness});
						}
					}
				}
				if(j!=search_queue[0]["board"].length-1)
				{
					let new_board=JSON.parse(JSON.stringify(search_queue[0]["board"]));
					let temp=new_board[i][j];
					new_board[i][j]=new_board[i][j+1];
					new_board[i][j+1]=temp;
					if(!marked_positions.includes(JSON.stringify(new_board)))
					{
						marked_positions.push(JSON.stringify(new_board));
						let new_messness=messness(new_board);
						if(new_messness<=search_queue[0]["messness"])
						{
							++t;
							search_queue.push({"id":t,"times":search_queue[0]["times"]+1,"board":new_board,"operations":search_queue[0]["operations"].concat([[i,j,"d"]]),"messness":new_messness});
						}
					}
				}
			}
		search_queue.shift();
	}
	if(search_queue.length==0)
		return "无法达到目标~";
	return JSON.stringify(search_queue[0]);
}