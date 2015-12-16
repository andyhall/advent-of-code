
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
var part2 = false
// read('test.txt')
read('input16.txt')


function work(line) {
	var res = /^Sue (\d+): (.+)$/.exec(line)
	if (!res) return
	var num = parseInt(res[1])
	var arr = res[2].split(',')
	var obj = {}
	arr.forEach(function (val) {
		var res2 = /^\s*(.+): (.+)$/.exec(val)
		obj[res2[1]] = parseInt(res2[2])
	})
	hash[num] = obj
}

var dat = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
}

var gt = ['cats', 'trees']
var lt = ['pomeranians', 'goldfish']

function solve() {
	outer: for (var s in hash) {
		var aunt = hash[s]
		inner: for (var key in aunt) {
			if (!check(aunt, dat, key)) continue outer
		}
		return s
	}
}

function check(aunt, dat, key) {
	if (part2) {
		if (gt.indexOf(key) > -1) {
			return (aunt[key] > dat[key])
		} else if (lt.indexOf(key) > -1) {
			return (aunt[key] < dat[key])
		} else {
			return (aunt[key] === dat[key])
		}
	} else {
		return (aunt[key] === dat[key])
	}
}


function finish() {
	console.log('output', solve())
	
	part2 = true
	console.log('output two', solve())
}


