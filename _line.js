
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

function read(f) {
	var instream = fs.createReadStream(f)
	var outstream = new stream.Stream
	outstream.readable = outstream.writable = true
	
	var rl = readline.createInterface({ input: instream, output: outstream, terminal: false });
	rl.on('line', function(line) { 	work(line) })
	rl.on('close', function() { 	finish() })
}


/*
 * 
 *					code. 
 * 
*/

var hash = {}
var part2 = false
read('test.txt')
// read('input14.txt')


function work(line) {
	var res = /(.)/.exec(line)
	hash.lines = hash.lines ? hash.lines+1 : 1
	hash.foo = res[1]
}

function solve() {
	var ct = 0
	for (var s in hash) {
		ct++
	}
	return hash.lines
}

function finish() {
	var s = solve()
	console.log('output', s)
	
	if (part2) {
		s = solve()
		console.log('output two', s)
	}
}


