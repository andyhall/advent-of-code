
var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

var stream = fs.createReadStream('input3.txt', { encoding: 'utf8' })

stream.on('readable', function (s) {
	var chunk
	while (null !== (chunk = stream.read(1))) { work(chunk) }
})
stream.on('end', function () { finish() })


/*
 * 
 *					code. 
 * 
*/


var ct = 0

function work(s) {
	ct++
}

function finish() {
	console.log('chars', ct)
}


