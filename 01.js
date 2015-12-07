
var fs = require('fs')

var t = fs.readFileSync('input.txt', 'utf8')

var f = 0
for (var i=0; i<t.length; i++) {
	var c = t[i]
	f -= (c===')') ? 1 : 0
	f += (c==='(') ? 1 : 0
	if (f === -1) console.log('-1 at step '+(i+1))
}

console.log(f)