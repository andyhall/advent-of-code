var extend = require('util')._extend


var spells = [
	{ name:'missile',   cost: 53,   dmg: 4               },
	{ name:'drain',     cost: 73,   dmg: 2,  heal: 2     },
	{ name:'shield',    cost: 113,  effect: 'shield'     },
	{ name:'poison',    cost: 173,  effect: 'poison'     },
	{ name:'recharge',  cost: 229,  effect: 'recharge'   },
]

var effects = {
	shield:       { turns: 6,   left: 0,   armor: 7, },
	poison:       { turns: 6,   left: 0,   dot: 3,   },
	recharge:     { turns: 5,   left: 0,   mana: 101 },
}

var player = { hp: 50,  mana: 500,  armor: 0 }
var boss =   { hp: 55,  dmg: 8, 	armor: 0 }



var state = {
	playerHP: player.hp,
	playerMana: player.mana,
	playerArmor: player.armor,
	bossHP: boss.hp,
	shield: 0,
	poison: 0,
	recharge: 0,
}



function testSpell(state, spell) {
	if (spell.cost > state.playerMana) return false
	if (spell.effect) return (state[spell.effect]===0)
	return true
}

function castSpell(state, spell) {
	state.playerMana -= spell.cost
	if (spell.dmg) state.bossHP -= spell.dmg
	if (spell.heal) state.playerHP += spell.heal
	if (spell.effect) state[spell.effect] = effects[spell.effect].turns
}

function applyEffects(state) {
	// apply
	state.playerArmor = (state.shield>0) ? effects.shield.armor : 0
	if (state.poison) hit(state, true, effects.poison.dot)
	if (state.recharge) state.playerMana += effects.recharge.mana
	// timers
	if (state.shield)   state.shield--
	if (state.poison)   state.poison--
	if (state.recharge) state.recharge--
}

function hit(state, toBoss, damage) {
	var armor = (toBoss) ? boss.armor : state.playerArmor
	var d = damage - armor
	if (d<1) d = 1
	if (toBoss) state.bossHP -= d
	else state.playerHP -= d
}


var best = Infinity
var bestSeq = ''
function recurse(state, playerTurn, cost, ct, s) {
	// console.log(indent + 'start ' + playerTurn)
	applyEffects(state)
	if (state.bossHP < 1) return cost
	if (playerTurn) {
		if (part2) {
			state.playerHP -= 1
			if (state.playerHP<1) return Infinity
		}
		for (var i in spells) {
			var spell = spells[i]
			if (cost + spell.cost >= best) continue
			if (!testSpell(state, spell)) continue
			
			var newState = extend({}, state)
			// console.log(indent + 'casting ' + spell.name + ', ' + '  p:' + state.playerHP + '  b:'+state.bossHP)
			castSpell(newState, spell)
			var ns = s+spell.name+' '+newState.playerHP+'/'+newState.bossHP+', '
			var res = recurse(newState, false, cost+spell.cost, ct+1, ns)
			if (res<best) {
				best = res
				bestSeq = s
			}
		}
		return best
	} else {
		// console.log(indent + 'boss turn          p:' + state.playerHP + '  b:'+state.bossHP)
		hit(state, false, boss.dmg)
		if (state.playerHP<1) return Infinity
		return recurse(state, true, cost, ct+1, s)
	}
}


// state.playerHP = 10
// state.playerMana = 250
// state.bossHP = 130	
// boss.dmg = 8

function solve(part) {
	best = Infinity
	var res = recurse(extend({},state), true, 0, 0, '')
	console.log(best)
	console.log(bestSeq)
	return res
}


var part2 = false
console.log( 'Part 1:', solve() )
part2 = true
console.log( 'Part 2:', solve() )




