
var weapons = {
	// None:       { cost:  0,   dmg: 0,   armor: 0 },
	Dagger:     { cost:  8,   dmg: 4,   armor: 0 },
	Shortsword: { cost: 10,   dmg: 5,   armor: 0 },
	Warhammer:  { cost: 25,   dmg: 6,   armor: 0 },
	Longsword:  { cost: 40,   dmg: 7,   armor: 0 },
	Greataxe:   { cost: 74,   dmg: 8,   armor: 0 },
}

var armor = {
	None:       { cost:  0,    dmg: 0,   armor: 0 },
	Leather:    { cost:  13,   dmg: 0,   armor: 1 },
	Chainmail:  { cost:  31,   dmg: 0,   armor: 2 },
	Splintmail: { cost:  53,   dmg: 0,   armor: 3 },
	Bandedmail: { cost:  75,   dmg: 0,   armor: 4 },
	Platemail:  { cost: 102,   dmg: 0,   armor: 5 },
}

var rings = {
	None:     { cost:   0,   dmg: 0,   armor: 0 },
	None2:    { cost:   0,   dmg: 0,   armor: 0 },
	Damage1:  { cost:  25,   dmg: 1,   armor: 0 },
	Damage2:  { cost:  50,   dmg: 2,   armor: 0 },
	Damage3:  { cost: 100,   dmg: 3,   armor: 0 },
	Defense1: { cost:  20,   dmg: 0,   armor: 1 },
	Defense2: { cost:  40,   dmg: 0,   armor: 2 },
	Defense3: { cost:  80,   dmg: 0,   armor: 3 },
}



function fight(player, boss) {
	var php = player.hp
	var bhp = boss.hp
	while(player.hp>0 && boss.hp>0) {
		hit(player, boss)
		if (boss.hp>0) hit(boss, player)
	}
	var playerWon = (player.hp > 0)
	player.hp = php
	boss.hp = bhp
	return playerWon
}

function hit(from,to) {
	var d = from.dmg - to.armor
	if (d<1) d = 1
	to.hp -= d
	return (to.hp<1)
}


function wield(player, item, remove) {
	var mult = (remove) ? -1 : 1
	player.cost += mult * item.cost
	player.dmg += mult * item.dmg
	player.armor += mult * item.armor
}


function solve(part) {
	var player = { hp: 100, dmg: 0, armor: 0, cost: 0 }
	var boss =   { hp: 109, dmg: 8, armor: 2 }
	var best = (part===1) ? Infinity : 0
	
	var recurse = function(itemSet, prevItem) {
		if (itemSet.length) {
			var set = itemSet.shift()
			for (var s in set) {
				if (s===prevItem) continue
				wield(player, set[s])
				recurse(itemSet, s)
				wield(player, set[s], true)
			}
			itemSet.unshift(set)
		} else {
			// inner loop
			var res = fight(player, boss)
			var better = (res && player.cost < best)
			if (part>1) better = (!res && player.cost > best)
			if (better) best = player.cost
		}
	}
	recurse([weapons, armor, rings, rings])
	return best
}

// var player = { hp: 8,   dmg: 5,  armor: 5 }
// var boss =   { hp: 12,  dmg: 7,  armor: 2 }
// console.log(fight(player,boss))

console.log( 'Part 1:', solve(1) )
console.log( 'Part 2:', solve(2) )





