
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var stream = fs.createReadStream('input2.txt', {
	encoding: 'utf8'
})

stream.on('readable', function (s) {
	var chunk
	while (null !== (chunk = stream.read(1))) {
		work(chunk)
	}
})
stream.on('end', function () {
	finish()
})



/*
 * 
 *					code. 
 * 
*/

var map = {}
var loc0 = [0,0]
var loc1 = [0,0]
function add(arr) {
	map[arr[0]+'-'+arr[1]] = 1
}
add(loc0)
add(loc1)
var toggle = true

function work(s) {
	// var loc = loc0
	var loc = toggle ? loc0 : loc1; toggle = !toggle
	switch (s) {
	// switch (s) {
		case 'v': loc[0]--; break;
		case '^': loc[0]++; break;
		case '<': loc[1]--; break;
		case '>': loc[1]++; break;
	}
	add(loc)
}

function finish() {
	var ct = 0
	for (var s in map) { ct++ }
	console.log('visited', ct)
}


