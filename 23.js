
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


var program = []

 
function work(line) {
	var res = /^(\S*) (.*)$/.exec(line)
	if (!res) return
	var cmd = res[1]
	var args = res[2].split(', ')
	program.push([cmd, args[0], args[1]])
}

function execute(prog, state) {
	var ln = state.line
	if (ln<0 || ln>=prog.length) return false
	if (state.a<0 || state.b<0 || state.a!==Math.floor(state.a) || state.b!==Math.floor(state.b)) throw new Error('!!!')
	var code = prog[ln]
	var cmd = code[0]
	var arg = code[1]
	var arg2 = code[2]
	var jump = null
	switch(cmd) {
		case 'hlf': state[arg] /= 2; break;
		case 'tpl': state[arg] *= 3; break;
		case 'inc': state[arg] += 1; break;
		case 'jmp': jump = parseInt(arg); break;
		case 'jie': if (state[arg]%2 === 0) jump = parseInt(arg2); break;
		case 'jio': if (state[arg]   === 1) jump = parseInt(arg2); break;
	}
	if (jump === null) jump = 1
	state.line += jump
	return true
}

function solve(prog, a, b) {
	var state = { 
		a: a,
		b: b,
		line: 0,
	}
	while(execute(prog, state)) {}
	return state.b
}

// var testProg = [
// 	['inc', 'a'],
// 	['jio', 'a', '+2'],
// 	['tpl', 'a'],
// 	['inc', 'a'],
// ]


var f = 'input23.txt'
read(f)


function finish() {
	console.log('output', solve(program, 0, 0))
	
	console.log('output2', solve(program, 1, 0))
}


