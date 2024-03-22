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
var locations = [
	{
		type: "nil_shore",
		name: "Nil shore",
		description: "A fertile place escaping the harsh life of the desert. In this place you can freely gather high quantity of water and decent quantity of food.",
		gatheringValues: {
			waterYield: 3,
			foodYield: 1,
			moraleYield: moraleYieldDef
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck = 0.5}, {type: "nil_shore", luck = 1}, {type: "desert", luck = 1}, {type: "fluvial_city", luck = 0.2}]
	},
	{
		type: "village",
		name: "Village",
		description: "A bunch of organized houses near the shore of the Nil assuring your caravan a bit of peace in the desert. Don't hesitate to find a local merchant to buy useful items for the lowest prices of the country.",
		gatheringValues: {
			waterYield: 2,
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck = 0.1}, {type: "nil_shore", luck = 0.8}, {type: "desert", luck = 1}],
		possibleGoods: [{

		}]
	},
	{
		type: "desert",
		name: "Desert",
		description: "Bunch of sand.",
		gatheringValues: {
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck = 0.1}, {type: "nil_shore", luck = 0.3}, {type: "desert", luck = 1}, {type: "oasis", luck = 0.1}, {type: "desert_city", luck = 0.1}]
	}
];
