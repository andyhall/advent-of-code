
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

function read(f) {
	var instream = fs.createReadStream(f)
	var outstream = new stream.Stream()
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

var hash = []
var input = ''
var hashTest = [
	['H', 'HO'],
	['H', 'OH'],
	['O', 'HH'],
]
var results = {}

function work(line) {
	var res = /^(\S+) => (\S+)$/.exec(line)
	if (res) {
		var a = res[1]
		var b = res[2]
		hash.push([a, b])
	} else {
		if (line.length) input = line
	}
}


function solve() {
	var h = hash // hashTest // hash
	var str = input // 'HOHOHO' // input
	for (var s in h) {
		replace(str, h[s][0], h[s][1])
	}
	var ct = 0
	for (var i in results) ct++
	return ct
}

function replace(str, from, to) {
	var i = 0
	while(str.indexOf(from, i) > -1) {
		var c = str.indexOf(from, i)
		var res = replaceAt(str, from, to, c)
		results[res] = 1
		i = c+1
	}
}

function replaceAt(str, from, to, c) {
	return str.substr(0, c) + to + str.substr(c+from.length)
}



// part 2



function canonicalize(s, chars) {
	for (var i in chars) s = s.split(chars[i]).join(i)
	return s
}
function countOf(str, pattern) {
	return str.split(pattern).length - 1
}


function solve2() {
	var chars = ['Rn', 'Ar', 'Al', 'Ca', 'Mg', 'Si', 'Th', 'Ti']
	input = canonicalize(input, chars)
	for (var s in hash) {
		var h = hash[s]
		hash[s] = [ canonicalize(h[0], chars), canonicalize(h[1], chars) ]
	}
	// don't ask :|
	var n0 = countOf(input, '0')
	var n1 = countOf(input, 'Y')
	return input.length - 1 - 2*n0 - 2*n1
}




var f = 'input19.txt'
read(f)


function finish() {
	console.log('output: ', solve())
	
	console.log('output2: ', solve2())
}


