
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input2.txt')
var outstream = new stream.Stream
outstream.readable = outstream.writable = true

var rl = readline.createInterface({ input: instream, output: outstream, terminal: false });
rl.on('line', function(line) { 	work(line) })
rl.on('close', function() { 	finish() })


/*
 * 
 *					code. 
 * 
*/


var ct = 0

function work(line) {
	ct++
}

function finish() {
	console.log('lines', ct)
}


