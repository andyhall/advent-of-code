
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input.txt')
var outstream = new stream
outstream.readable = true
outstream.writable = true

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
	work(line)
})
rl.on('close', function() {
	finish()
})



/*
 * 
 *					code. 
 * 
*/

var hash = {}

function set(x0,y0,x1,y1,fn) {
	for (var i=x0; i<=x1; i++) {
		for (var j=y0; j<=y1; j++) {
			var curr = hash[i+'-'+j] || 0
			hash[i+'-'+j] = fn(curr)
		}
	}
}


function work(line) {
	var res = /(.*) (\d+),(\d+) through (\d+),(\d+)$/.exec(line)
	var cmd = res[1]
	var fn
	switch (cmd) {
		case 'turn on':  fn = function(n) {return n+1}; break;
		case 'turn off': fn = function(n) {return (n-1<0) ? 0:n-1 }; break;
		case 'toggle':   fn = function(n) {return n+2}; break;
		default: console.log('err: '+cmd)
	}
	set(parseInt(res[2]), parseInt(res[3]), parseInt(res[4]), parseInt(res[5]), fn)
}

function finish() {
	var ct = 0
	for (var i=0; i<=999; i++) {
		for (var j=0; j<=999; j++) {
			if (hash[i+'-'+j]) ct += hash[i+'-'+j]
		}
	}
	console.log('lights', ct)
}


