
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input7.txt')
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


var ct = 0

var hash = {}

var inputRE = /^(\S+) -> (.*)$/
var singleRE = /^(\S+) (\S+) -> (.*)$/
var doubleRE = /^(\S+) (\S+) (\S+) -> (.*)$/

function work(line) {
	var res
	if (res = inputRE.exec(line)) registerInput(res[1], res[2])
	else if (res = singleRE.exec(line)) registerSingle(res[1], res[2], res[3])
	else if (res = doubleRE.exec(line)) registerDouble(res[1], res[2], res[3], res[4])
	else throw new Error('Hit no pattern', line)
	ct++
}

function registerInput(in1, output) {
	hash[output] = {
		type: 'input',
		in1: in1
	}
}

function registerSingle(cmd, in1, output) {
	hash[output] = {
		type: 'single',
		cmd: cmd,
		in1: in1,
	}
}

function registerDouble(in1, cmd, in2, output) {
	hash[output] = {
		type: 'double',
		cmd: cmd,
		in1: in1,
		in2: in2,
	}
}


function resolve(reg) {
	if (!isNaN(parseInt(reg))) return parseInt(reg)
	// console.log('resolving', reg, ' -> ', hash[reg])
	var ret
	var h = hash[reg]
	if (h.type==='solved') {
		return h.value
	} else if (h.type==='input') {
		ret = resolve(h.in1)
	} else if (h.type==='single') {
		ret = runCommand(h.cmd, resolve(h.in1))
	} else if (h.type==='double') {
		ret = runCommand(h.cmd, resolve(h.in1), resolve(h.in2))
	} else throw new Error('unknown reg type')
	hash[reg] = {
		type: 'solved',
		value: ret
	}
	return ret
}

function runCommand(cmd, in1, in2) {
	var ret
	if (cmd==='NOT') ret = ~in1
	else if (cmd==='OR') ret = in1 | in2
	else if (cmd==='AND') ret = in1 & in2
	else if (cmd==='RSHIFT') ret = in1 >> in2
	else if (cmd==='LSHIFT') ret = in1 << in2
	else throw new Error('unknown command', cmd, in1, in2)
	if (ret<0) ret += 65536
	return ret
}


function finish() {
	var part2 = true
	if (part2) {
		hash['b'] = {
			type: 'solved',
			value: 3176
		}
	}
	// var arr = ['d', 'e', 'f', 'g', 'h', 'i', 'x', 'y' ]
	var arr = ['a']
	while(arr.length) {
		var c = arr.shift()
		console.log(c, resolve(c))
	}
}


