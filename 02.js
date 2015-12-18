
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input02.txt')
var outstream = new stream
outstream.readable = true
outstream.writable = true

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
	work(line)
})
rl.on('close', function() {
	finish()
})



/*
 * 
 *					code. 
 * 
*/

var total1 = 0
var total2 = 0

function work(line) {
	var a = line.split('x')
	for (var s in a) { a[s] = parseInt(a[s]) }
	var ribbon = (a[0]+a[1]+a[2]-Math.max(a[0],a[1],a[2]))*2
	ribbon += a[0]*a[1]*a[2]
	total2 += ribbon
	var sides = []
	for (var i=0; i<a.length; i++) {
		sides.push( 2 * a[i] * a[(i+1)%3] )
	}
	sides.push(Math.min(sides[0], sides[1], sides[2])/2)
	sides.forEach(function(v) { total1 += v })
}

function finish() {
	console.log('paper', total1)
	console.log('ribbon', total2)
	total1 = total2 = 0
}


