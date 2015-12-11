
var input = 'vzbxkghb'


// input = 'ghijklmn'
// input = 'abcdefgh'

/*
 * 
 *					code. 
 * 
*/

function inc(s, pos) {
	if (pos===undefined) pos = s.length-1
	var c = s.charCodeAt(pos) + 1
	if (c===123) {
		c = 97
		s = inc(s,pos-1)
	}
	var a = s.split('')
	a[pos] = String.fromCharCode(c)
	return a.join('')
}

function test(s) {
	if (/[iol]./.test(s)) return false
	var runok = false
	var pairsok = false
	var prev = 0
	var prev2 = 0
	var run = 1
	var pairs = 0
	for (var i=0; i<s.length; i++) {
		// runs
		var c = s.charCodeAt(i)
		run = (c===prev+1) ? run+1 : 1
		if (run === 3) runok = true
		// pairs
		if (c===prev && c!==prev2) pairs++
		if (pairs===2) pairsok = true
		// finish
		if (runok && pairsok) return true
		prev2 = prev
		prev = c
	}
	return false
}

// console.log(test('vzbxxyzz'))

// part 1
var s = input
while(!test(s)) s = inc(s)
console.log(s)

// part 2
s = inc(s)
while(!test(s)) s = inc(s)
console.log(s)


