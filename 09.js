
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input9.txt')
// var instream = fs.createReadStream('test.txt')
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

function work(line) {
	var res = /^(.+) to (.+) = (.+)$/.exec(line)
	var from = res[1]
	var to = res[2]
	var dist = parseInt(res[3])
	if (!hash[from]) hash[from] = {}
	if (!hash[to]) hash[to] = {}
	hash[from][to] = dist
	hash[to][from] = dist
}

function finish() {
	clear(hash)
	console.log('shortest', recurseShortest(hash, null, 0))
	console.log('longest', recurseLongest(hash, null, 0))
}

function clear(map) {
	for (var s in map) map[s].flag = false
}

function recurseShortest(map, curr, sofar) {
	var best = Infinity
	if (curr) map[curr].flag = true
	for (var s in map) {
		if (map[s].flag) continue
		var leg = (curr) ? map[curr][s] : 0
		var d = recurseShortest(map, s, sofar + leg)
		if (d<best) best = d
	}
	if (curr) map[curr].flag = false
	if (best===Infinity) return sofar // leaf node
	return best
}

function recurseLongest(map, curr, sofar) {
	var best = 0
	if (curr) map[curr].flag = true
	for (var s in map) {
		if (map[s].flag) continue
		var leg = (curr) ? map[curr][s] : 0
		var d = recurseLongest(map, s, sofar + leg)
		if (d>best) best = d
	}
	if (curr) map[curr].flag = false
	if (best===0) return sofar // leaf node
	return best
}




