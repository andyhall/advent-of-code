
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

// var instream = fs.createReadStream('test.txt')
var instream = fs.createReadStream('input13.txt')
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

var hash = {}
var names = []

function work(line) {
	var res = /^(.+) would (.+) (\d+) happiness units by sitting next to (.+)\.$/.exec(line)
	if (!res) return
	var n1 = res[1]
	var n2 = res[4]
	var amt = parseInt(res[3])
	if (res[2]==='lose') amt *= -1
	if (!hash[n1]) hash[n1] = {}
	hash[n1][n2] = amt
	if (names.indexOf(n1)<0) names.push(n1)
}

function solve(done, left, change) {
	if (left.length===0) {
		var n1 = done[done.length-1]
		var n2 = done[0]
		return change + hash[n1][n2] + hash[n2][n1]
	}
	var best = -Infinity
	for (var i=0; i<left.length; i++) {
		var plus = 0
		done.push(left[i])
		left.splice(i,1)
		var l = done.length
		if (l>1) plus = hash[done[l-2]][done[l-1]] + hash[done[l-1]][done[l-2]]
		var res = solve(done, left, change+plus)
		if (res>best) best = res
		// undo change
		left.splice(i, 0, done.pop())
	}
	return best
}


function finish() {
	console.log('change', solve([], names, 0))
	
	var n = 'me'
	hash[n] = {}
	for (var i=0; i<names.length; i++) {
		hash[n][names[i]] = 0
		hash[names[i]][n] = 0
	}
	names.push(n)
	console.log('change', solve([], names, 0))
}


