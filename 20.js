

function testHouses(a,b,tgt) {
	var res = []
	var span = b-a
	for (var i=0; i<=span; i++) res[i] = 0
	for (n=1; n<=b; n++) {
		var j = Math.floor(a/n)*n
		if (j<a) j += n
		while(j<=b) {
			res[j-a] += n*10
			j += n
		}
	}
	// check results
	var best = 0
	var bi = 0
	for (var i=0; i<res.length; i++) {
		if (res[i] > best) {
			best = res[i]
			bi = i
			if (best >= tgt) return 'Solution at: '+(bi+a)
		}
	}
	return 'Highest total '+best+' at '+(bi+a)
}

var a = 500000
var b = 1000000
var input = 36000000
var s = testHouses(a,b,input)
console.log(s)



function testHousesP2(a,b,tgt) {
	var res = []
	var span = b-a
	for (var i=0; i<=span; i++) res[i] = 0
	for (n=1; n<=b; n++) {
		var ct = Math.floor(a/n)
		if (ct*n<a) ct++
		while(ct<=50 && ct*n<=b) {
			res[ct*n-a] += n*11
			ct++
		}
	}
	// check results
	var best = 0
	var bi = 0
	for (var i=0; i<res.length; i++) {
		if (res[i] > best) {
			best = res[i]
			bi = i
			if (best >= tgt) return 'Solution P2 at: '+(bi+a)
		}
	}
	return 'Highest total '+best+' at '+(bi+a)
}

a = 500000
b = 1000000
input = 36000000
s = testHousesP2(a,b,input)
console.log(s)


