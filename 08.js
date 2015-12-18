
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

// var instream = fs.createReadStream('test.txt')
var instream = fs.createReadStream('input08.txt')
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
var mem = 0

function work(line) {
	work_part2(line)
}

function work_part1(line) {
	if (!/^".*"$/.test(line)) return
	total += line.length
	var esc = false
	for (var i=1; i<line.length-1; i++) {
		var char = line[i]
		if (esc) {
			if (char==='x') i += 2
			esc = false
			mem++
		} else {
			if (char==='\\') {
				esc = true
			} else {
				mem++
			}
		}
	}
}

function work_part2(line) {
	total += line.length
	var out = '"'
	for (var i=0; i<line.length; i++) {
		var char = line[i]
		switch (char) {
			case '"': out += '\\' + '"'; break;
			case '\\': out += '\\' + '\\'; break;
			default: out += char
		}
	}
	out += '"'
	total2 += out.length
}

function finish() {
	// console.log('total', total, '  mem', mem, '  diff', total-mem)
	console.log('total', total, '  total2', total2, '  diff', total2-total)
}


