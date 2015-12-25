

/*
 * 
 *					code. 
 * 
*/


function tableNumber(row, col) {
	var row1 = sumTo(col)
	return row1 + sumTo(row + col - 2) - sumTo(col - 1)
}

function sumTo(n) {
	return (n * (n + 1)) / 2
}

function solve(row, col) {
	var i = tableNumber(row, col)
	var n = 20151125
	while (--i) n = (n * 252533) % 33554393
	return n
}


// console.log('output', solve(2, 4))

console.log('output', solve(2981, 3075))


