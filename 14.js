
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var instream = fs.createReadStream('input14.txt')
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
	var res = /^(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/.exec(line)
	hash[res[1]] = {
		speed: parseInt(res[2]),
		fly: parseInt(res[3]),
		rest: parseInt(res[4]),
		dist: 0,
		flying: 1,
		ct: parseInt(res[3]),
		score: 0,
	}
}

function test(t) {
	while (t--) {
		var best = 0
		for (var s in hash) {
			var deer = hash[s]
			if (deer.flying) {
				deer.dist += deer.speed
				deer.ct--
				if (deer.ct===0) {
					deer.flying = 0
					deer.ct = deer.rest
				}
			} else {
				deer.ct--
				if (deer.ct===0) {
					deer.flying = 1
					deer.ct = deer.fly
				}
			}
			if (deer.dist > best) {
				best = deer.dist
			}
		}
		for (var s in hash) {
			if (hash[s].dist === best) hash[s].score++
		}
	}
}

function finish() {
	// test(1000)
	test(2503)
	var best = 0
	for (var s in hash) if (hash[s].dist > best) best = hash[s].dist
	console.log('dist', best)
	var score = 0
	for (var s in hash) if (hash[s].score > score) score = hash[s].score
	console.log('score', score)
}


