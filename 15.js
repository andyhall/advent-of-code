
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

var part2 = false
// read('test.txt')
read('input15.txt')

var names = []
var types = []
var vals = {}

// build data structures
function work(line) {
	var res = /^(.+): (.+)$/.exec(line)
	var name = res[1]
	names.push(name)
	var arr = res[2].split(',')
	vals[name] = {}
	for (var i in arr) {
		var res2 = /^\s*(.+) (.+)$/.exec(arr[i])
		var type = res2[1]
		var val = parseInt(res2[2])
		if (types.indexOf(type)<0) types.push(type)
		vals[name][type] = val
	}
}

// find score for particular set of amounts
function score(amts) {
	if (part2) {
		var c = 0
		names.forEach(function(name, i) {
			c += amts[i] * vals[name].calories
		})
		if (c!==500) return 0
	}
	var res = 1
	types.forEach(function(type) {
		if (type==='calories') return
		var sc = 0
		names.forEach(function(name, i) {
			sc += amts[i] * vals[name][type]
		})
		if (sc<0) sc = 0
		res *= sc
	})
	return res
}


// recurse through all amount combinations
function solve() {
	var ct = names.length
	return recurse([], ct, 100)
}

function recurse(arr, ct, left) {
	if (arr.length === ct-1) {
		arr.push(left)
		var res = score(arr)
		arr.pop()
		return res
	}
	var best = 0
	var besti = -1
	for (var i=0; i<left-1; i++) {
		arr.push(i)
		var sc = recurse(arr, ct, left-i)
		arr.pop()
		if (sc>best) {
			best = sc
			besti = i
		}
	}
	return best
}



function finish() {
	console.log('output    ', solve())
	
	part2 = true
	console.log('output two', solve())
}


