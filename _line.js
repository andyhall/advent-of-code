
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

function read(f) {
	var instream = fs.createReadStream(f)
	var outstream = new stream.Stream
	outstream.readable = outstream.writable = true

	var rl = readline.createInterface({ input: instream, output: outstream, terminal: false });
	rl.on('line', function (line) { work(line) })
	rl.on('close', function () { finish() })
}


/*
 * 
 *					code. 
 * 
*/

var hash = {}

function work(line) {
	var res = /^(.*): (.*)$/.exec(line)
	if (!res) return
	var a = res[1]
	var b = res[2]
	hash[a] = b
}


function solve() {
	for (var s in hash) {
		check(hash[s])
	}
}

function check() {
	return true
}


var part2 = false
var f = 'input16.txt'
read(f)


function finish() {
	console.log('output', solve())
	
	// part2 = true
	// console.log('output two', solve())
}


