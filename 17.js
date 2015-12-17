
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

var bins = []
var hash = {}

function work(line) {
	bins.push(parseInt(line))
}


function solve(target) {
	// bins = [20, 15, 10, 5, 5]
	// target = 25
	return recurse(bins, [], target, 0, 0)
}

function recurse(pool, used, target, sofar, index) {
	var sols = 0
	// console.log(used)
	for (var i=index; i<pool.length; i++) {
		var bin = pool[i]
		if (sofar+bin === target) {
			sols++
			if (part2) {
				var ct = used.length + 1
				if (!hash[ct]) hash[ct] = 0
				hash[ct]++
			}
		} else if (sofar+bin < target) {
			pool.splice(i,1)
			used.push(bin)
			sols += recurse(pool, used, target, sofar+bin, i)
			used.pop()
			pool.splice(i,0,bin)
		}
	}
	return sols
}



var part2 = false
var f = 'input17.txt'
read(f)


function finish() {
	console.log('output', solve(150))
	
	part2 = true
	solve(150)
	var low = Infinity
	for (var s in hash) {
		if (parseInt(s)<low) low = parseInt(s)
	}
	console.log('output two', hash[low])
}


