
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input12.txt')
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


var total = 0
var total2 = 0

function work(line) {
	var obj = JSON.parse(line)
	recurse(obj, true)
}

function recurse(o, count2) {
	var t = typeof(o)
	switch (t) {
		case 'number': 
			total += o
			if (count2) total2 += o
			break
		case 'object': 
			if (count2 && !Array.isArray(o)) {
				for (var s in o) {
					if (o[s]==='red') count2 = false
				}
			}
			for (var s in o) {
				recurse(o[s], count2)
			}
			break
	}
}

function finish() {
	console.log('total', total)
	console.log('part 2', total2)
}


