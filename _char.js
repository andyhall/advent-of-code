
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

function read(f) {
	var stream = fs.createReadStream(f, { encoding: 'utf8' })
	stream.on('readable', function (s) {
		var chunk
		while (null !== (chunk = stream.read(1))) { work(chunk) }
	})
	stream.on('end', function () { finish() })
}


/*
 * 
 *					code. 
 * 
*/

var hash = {}
var part2 = false
read('test.txt')
// read('input12.txt')


function work(char) {
	hash.chars = hash.chars ? hash.chars+1 : 1
	
}

function solve() {
	var ct = 0
	for (var s in hash) {
		ct++
	}
	return hash.chars
}

function finish() {
	var s = solve()
	console.log('output', s)
	
	if (part2) {
		s = solve()
		console.log('output two', s)
	}
}


