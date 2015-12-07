
var crypto = require('crypto')

var input = 'yzbqklnj'
// input = 'abcdef'


function test(n) {
	var str = input+String(n)
	var h = crypto.createHash('md5').update(str).digest('hex')
	return (h.indexOf('000000')===0)
}


var i = 1
while(true) {
	if (test(i)) {
		console.log('answer', i)
		break
	}
	i++
}



