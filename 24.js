
var fs = require('fs')

function read(file) {
	var buffer = fs.readFileSync(file)
	var lines = buffer.utf8Slice().split('\n')
	lines.forEach(function(line) { work(line) })
}


/*
 * 
 *					code. 
 * 
*/



var dat = []

function work(line) {
	var res = /^(\d+)$/.exec(line)
	if (!res) return
	dat.push(parseInt(res[1]))
}



function solve(dat, groups) {
	var sum = 0
	dat.forEach(function (w) { sum += w })
	dat = dat.sort(function (a, b) { return (b > a) ? 1 : -1 })
	best = Infinity
	bestQE = Infinity
	recurse(dat, sum / groups, [], 0, 1)
	return bestQE
}

var best, bestQE

function recurse(dat, target, used, sum, QE) {
	if (used.length >= best) return
	if (used[0] && used[0]*best < target) return
	for (var i in dat) {
		var d = dat[i]
		if (d + sum > target) continue
		if (d * QE >= bestQE) continue
		if (used.indexOf(d) > -1) continue
		if (sum + d === target) {
			var size = used.length + 1
			var nQE = d * QE
			if (size < best) {
				// console.log('new best: ', size, nQE)
				best = size
				bestQE = nQE
			} else if (size===best) {
				if (nQE < bestQE) {
					// if (size<7)console.log('new best: ', size, nQE)
					bestQE = nQE
				}
			}
		} else {
			used.push(d)
			recurse(dat, target, used, sum + d, QE * d)
			used.pop()
		}
	}
}



read('input24.txt')
finish()


function finish() {
	// dat = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
	console.log('output', solve(dat, 3))
	
	console.log('output two', solve(dat, 4))
}


