
var input = '1113222113'
// var input = '111221'

/*
 * 
 *					code. 
 * 
*/

function run(input) {
	var output = ''
	while (input.length) {
		var res = /^((.)\2*)/.exec(input)
		var ct = res[0].length
		output += String(ct) + input[0]
		input = input.substr(ct)
	}
	return output
}

var s = input

for (var i=0; i<40; i++) s = run(s)
console.log('40 -> ', s.length)

for (var i=0; i<10; i++) s = run(s)
console.log('50 -> ', s.length)


