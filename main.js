// Initializing base variables
// Number of people player has, thus number of people he can use.
var crewTotal;
// Distribution of the crew, the total can't be > crewTotal.
var crewTypes = {
	scouts = 0,
	guards = 0,
	carriers = 0  // Free crew becomes carriers to carry more goods.
};
var idleCrew; // Number of remaining people to distribute.
var morale;
var money;
var authority;
var water;
var numberOfTurns;
var famineTurns;
var inventory = [];
var currentPorterage; // Capacity of the caravan to carry goods. It is influenced by the number of animals such as camels and the number of carriers.
var neededPorterage; // Weight of all the items transported by the caravan.
// Each unit of food and water is equal to one weight unit.
function moraleYieldDef() {}
// The severals yields decrease by one if harvested each turn.
var playerLocation;
var possibleDestinations;
var locations = [
	{
		type: "nil_shore",
		name: "Nil shore",
		isTradable: False,
		description: "A fertile place escaping the harsh life of the desert. In this place you can freely gather high quantity of water and decent quantity of food.",
		gatheringValues: {
			waterYield: 3,
			foodYield: 1
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck = 0.5}, {type: "nil_shore", luck = 1}, {type: "desert", luck = 1}, {type: "fluvial_city", luck = 0.2}]
	},
	{
		type: "village",
		name: "Village",
		isTradable: True,
		description: "A bunch of organized houses near the shore of the Nil assuring your caravan a bit of peace in the desert. Don't hesitate to find a local merchant to buy useful items for the lowest prices of the country.",
		gatheringValues: {
			waterYield: 2,
			moraleYield: True
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck = 0.1}, 
			{type: "nil_shore", luck = 0.8}, 
			{type: "desert", luck = 1}
			],
		buyableGoods: [{
			type: "food",
			name: "Rations",
			volume: 100,
			price: 4
		},
		{
			type: "mount",
			name: "Horse",
			volume: 3,
			price: 500
		}
		]
	},
	{
		type: "desert",
		name: "Desert",
		isTradable: False,
		description: "Bunch of sand.",
		gatheringValues: {
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck = 0.1}, 
			{type: "nil_shore", luck = 0.3}, 
			{type: "desert", luck = 1}, 
			{type: "oasis", luck = 0.1}, 
			{type: "desert_city", luck = 0.1}
			]
	},
	{
		type: "desert_city",
		name: "Desert city",
		isTradable: False,
		description: "In the middle of the desert, majestic buildings made of polished sandstones rise from the sand welcoming your caravan.",
		gatheringValues: {
			moraleYield: True
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "nil_shore", luck = 0.3},
			{type: "desert", luck = 1},
			{type: "oasis", luck = 0.1},
			{type: "desert_city", luck = 0.1}
			],
		buyableGoods: [{
			type: "food",
			name: "Rations",
			volume: 100,
			price: 8
		},
		{
			type: "mount",
			name: "Camel",
			volume: 2,
			price: 1000
		}
		],
		sellableGoods: [{
			type: "goods",
			name: "Papyrus",
			volume: 50,
			price: 40
		}
		]

	},
	{
		type: "fluvial_city",
		name: "Fluvial City",
		isTradable: True,
		description: "A city which whole economy resolves on the manufacture of writing materials from the papyrus plant, thanks to the fertility of the Nil shore.",
		gatheringValues: {
			waterYield: 3
			moraleYield: True
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck = 0.1}, 
			{type: "nil_shore", luck = 1}, 
			{type: "desert", luck = 1}
			],
		buyableGoods: [{
			type: "food",
			name: "Rations",
			volume: 100,
			price: 6
		},
		{
			type: "goods",
			name: "Papyrus",
			volume: 50,
			price: 20
		},
		{
			type: "weapon",
			name: "Sword",
			volume: 20,
			price: 200
		}
		],
		sellableGoods: [
		{
			type: "weapon",
			name: "Sword",
			volume: 20,
			price: 100
		}
		]
	},
	{
		type: "oasis",
		name: "Oasis",
		isTradable: False,
		description: "In the middle of the desert it's the closest thing to what you could call Paradise.",
		gatheringValues: {
			waterYield: 3,
			foodYield: 3
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck = 0.5}, {type: "nil_shore", luck = 1}, {type: "desert", luck = 1}, {type: "fluvial_city", luck = 0.2}]
	}
];
var probabilityRandomOasis = 0.10;

var Phases = [
	"event", // Determine if an event is activated such as fight etc.
	"assignement", // Every crew assignement goes back to 0, apart of scouts. 
	"resolves", // After assignement, the collect of ressources is executed depending of assignements and the decrease of the location's yield too.
	"travel", // Choose caravan destination. Caravan can stay on the same location.
	"endResolve" //  Meeting the needs of the crew. If the caravan doesn't move it reduces the caravan water needs by 2. Each lacking water unit causes the death of one person. If crewTotal = 0, game over.
	// famineTurn resolves
];
var gamePhase;
var moralDecrease: 0.05;

var listOfNames = {
	firstname: {
		male: ["Jonathan", "Ethan", "Raphael"],
		female: ["Neyla", "Joanne"]
	},
	surname: ["Joestar"]
};
var genderArr = ["male", "female"];
function defineUnit () {
	var newUnit = {};
	newUnit["gender"] = genderArr[Math.floor(genderArr.length * Math.random())];
	newUnit["firstName"] = listOfNames["firstname"][newUnit["gender"]][Math.floor(listOfNames["firstname"][newUnit["gender"]].length * Math.random())];
	newUnit["surname"] = listOfNames["surname"][Math.floor(listOfNames["surname"].length * Math.random())];
	newUnit["age"] = 18 + Math.floor(60 * Math.random());
	return newUnit;
}

function defineNewDestinations() {
	possibleDestinations = []
	for (let i = 0; i < locations[playerLocation]["possibleDestinations"].length; i++) {
		if locations[playerLocation]["possibleDestinations"][i]["luck"] >= Math.random() {
			possibleDestinations.push(locations[playerLocation]["possibleDestinations"][i]["type"])
		}
	}
}