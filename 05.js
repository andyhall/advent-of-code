
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


var re1 = /[aeiou].*[aeiou].*[aeiou]/
var re2 = /(.)\1/
var re3 = /(ab|cd|pq|xy)/

function test(s) {
	if (!re1.test(s)) return false
	if (!re2.test(s)) return false
	if (re3.test(s)) return false
	return true
}

var re4 = /(..).*\1/
var re5 = /(.).\1/

function test2(s) {
	if (!re4.test(s)) return false
	if (!re5.test(s)) return false
	return true
}


var nice = 0
var nice2 = 0

function work(line) {
	if (test(line)) nice ++
	if (test2(line)) nice2 ++
}

function finish() {
	console.log('nice', nice)
	console.log('nice2', nice2)
}


