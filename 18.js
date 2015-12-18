
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

var lights = []

function work(line) {
	if (!line.length) return
	var arr = []
	for (var i=0; i<line.length; i++) {
		arr[i] = (line.charAt(i)==='#')
	}
	lights.push(arr)
}


function solve() {
	conformPart2(lights)
	for (var i=0; i<100; i++) lights = iterate(lights)
	var on = 0
	for (var i in lights) {
		for (var j in lights[i]) {
			if (lights[i][j]) on++
		}
	}
	return on
}

function iterate(arr) {
	var nx = []
	for (var i=0; i<arr.length; i++) {
		nx[i] = []
		for (var j=0; j<arr[i].length; j++) {
			var n = neighbors(arr, i, j)
			nx[i][j] = (arr[i][j]) ? (n===2 || n===3) : (n===3) 
		}
	}
	conformPart2(nx)
	return nx
}

function neighbors(arr, x, y) {
	var n = 0
	for (var i=-1; i<2; i++) {
		for (var j=-1; j<2; j++) {
			if (i===0 && j===0) continue
			var lx = x + i
			var ly = y + j
			if (lx < 0 || ly < 0) continue
			if (lx >= arr.length || ly >= arr[0].length) continue
			if (arr[lx][ly]) n++
		}
	}
	return n
}

function conformPart2(arr) {
	if (part2) {
		arr[0][0] = true
		arr[0][arr[0].length-1] = true
		arr[arr.length-1][0] = true
		arr[arr.length-1][arr[0].length-1] = true
	}
}

var part2 = 1
var f = 'input18.txt'
read(f)


function finish() {
	var p = (part2) ? '2' : '1'
	console.log('part', p, solve())
}


