// The fonction used to save the files in the user session using sessionStorage.setItem();
function save(varName, value) {
	console.log(typeof value);
	if (typeof value == "number") {value = String(value);}
	else if (typeof value == "object") {value = JSON.stringify(value);}
	else if (typeof value == "boolean") {value = String(value);}
	else {value = String(value);}

	sessionStorage.setItem(String(varName), value);
}

// Used to get all the new values from the sessionStorage.
function loadSessionStorage() {
	var crewTotal = sessionStorage.getItem("crewTotal")
	var crewTypes = sessionStorage.getItem("crewTypes")
	var idleCrew = sessionStorage.getItem("idleCrew")
	var morale = sessionStorage.getItem("morale")
	var money = sessionStorage.getItem("money")
	var authority = sessionStorage.getItem("authority")
	var water = sessionStorage.getItem("water")
	var numberOfTurns = sessionStorage.getItem("numberOfTurns")
	var famineTurns = sessionStorage.getItem("famineTurns")
	var inventory = sessionStorage.getItem("inventory")
	var playerLocation = sessionStorage.getItem("playerLocation")
	var gatherer = sessionStorage.getItem("gatherer")
}

// All the variables we want to save and share through every JS files.
function saveSessionStorage () {
	// Number of people player has, thus number of people he can use.
	save("crewTotal", crewTotal);
	// Distribution of the crew, the total can't be > crewTotal.
	save("crewTypes", crewTypes) // Free crew can become carriers to carry more goods.
	save("idleCrew", idleCrew); // Number of remaining people to distribute.
	save("morale", morale);
	save("money", money);
	save("authority", authority);
	save("water", water);
	save("numberOfTurns", numberOfTurns);
	save("famineTurns", famineTurns);
	save("inventory", inventory);
	save("playerLocation", playerLocation);
	save("gatherer", gatherer);
}

// Simply used to capitalize a word. let capitalizedWord = Capitalize(the_word_you_want_to_capitalize);
function Capitalize(e) {return e[0].toUpperCase() + e.slice(1);}

// Initializing base variables that aren't used on other JS files.
var currentPorterage; // Capacity of the caravan to carry goods. It is influenced by the number of animals such as camels and the number of carriers.
var neededPorterage; // Weight of all the items transported by the caravan.
// Each unit of food and water is equal to one weight unit.
function moraleYieldDef() {}
// The severals yields decrease by one if harvested each turn.
var possibleDestinations;
var locations = [
	{
		type: "nil_shore",
		name: "Nil shore",
		isTradable: false,
		description: "A fertile place escaping the harsh life of the desert. In this place you can freely gather high quantity of water and decent quantity of food.",
		gatheringValues: {
			waterYield: 3,
			foodYield: 1
		},
		possibleEvents: [],
		possibleDestinations: [
		{type: "village", luck : 0.5}, 
		{type: "nil_shore", luck : 1},
		{type: "desert", luck : 1},
		{type: "fluvial_city", luck : 0.2}]
	},
	{
		type: "village",
		name: "Village",
		isTradable: true,
		description: "A bunch of organized houses near the shore of the Nil assuring your caravan a bit of peace in the desert. Don't hesitate to find a local merchant to buy useful items for the lowest prices of the country.",
		gatheringValues: {
			waterYield: 2,
			moraleYield: true
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck: 0.1}, 
			{type: "nil_shore", luck: 0.8}, 
			{type: "desert", luck: 1}
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
		isTradable: false,
		description: "Bunch of sand.",
		gatheringValues: {
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck: 0.1}, 
			{type: "nil_shore", luck: 0.3}, 
			{type: "desert", luck: 1}, 
			{type: "oasis", luck: 0.1}, 
			{type: "desert_city", luck: 0.1}
			]
	},
	{
		type: "desert_city",
		name: "Desert city",
		isTradable: false,
		description: "In the middle of the desert, majestic buildings made of polished sandstones rise from the sand welcoming your caravan.",
		gatheringValues: {
			moraleYield: true
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "nil_shore", luck: 0.3},
			{type: "desert", luck: 1},
			{type: "oasis", luck: 0.1},
			{type: "desert_city", luck: 0.1}
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
		isTradable: true,
		description: "A city which whole economy resolves on the manufacture of writing materials from the papyrus plant, thanks to the fertility of the Nil shore.",
		gatheringValues: {
			waterYield: 3,
			moraleYield: true
		},
		possibleEvents: [],
		possibleDestinations: [
			{type: "village", luck: 0.1}, 
			{type: "nil_shore", luck: 1}, 
			{type: "desert", luck: 1}
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
		isTradable: false,
		description: "In the middle of the desert it's the closest thing to what you could call Paradise.",
		gatheringValues: {
			waterYield: 3,
			foodYield: 3
		},
		possibleEvents: [],
		possibleDestinations: [{type: "village", luck: 0.5}, {type: "nil_shore", luck: 1}, {type: "desert", luck: 1}, {type: "fluvial_city", luck: 0.2}]
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
var textList = {
	id_1: ["...",
		"Ma fille... ce salop... je le tuerais et je reprendrais ma seule famille.",
		"Comment puis-je faire..",
		"Je n'ai pas grand chose, il me faut des moyens, de l'argent et de la puissance."
		]
}
var currentTextPos = 0;
var currentTextNumber = 1;
var tempIDs = [];

// Remove every temporary element.
// A complex question in game dev is choosing between CPU and RAM, you always have the choice, but you must often find balance depending on what you try to achieve.
// My fishing game is a good example of why it's important to find this balance, it would use way too much CPU power for nothing if I wasn't caching many stuff, making use of the ram.
// This choice here makes use of the CPU and not the RAM.
// Well this isn't very impactful here, bc it's so small what we are doing.
function removeTempIDs() {
	console.log(tempIDs)
	tempIDs.forEach(e => {if (document.getElementById(e)) {document.getElementById(e).remove()}});
	tempIDs = [];
}

// Return location information from it's type / name.
function returnLocationData(location) {
	for (let i = 0; i < locations.length; i++) {
		if (locations[i]["type"] == location) {
			locationEntry = locations[i]
			return locationEntry;
		}
	}
}

// Only function that is called when page is being shown.
// It manages what to do afterward.
// Maybe it could be put at the root, but I just prefer to put things in function, if it isn't a variable.
function onLoad() {
	tempIDs.push("narration_text");
	tempIDs.push("narration_button");
	centerImage = document.getElementById("center-image");
	centerImage.src = "cine-1-7.png";
	currentTextNumber = 1;
	currentTextPos = 0;
	var node = document.getElementById("bottom menu");
	var newText = document.createElement("p");
	newText.setAttribute("id", "narration_text");
	newText.textContent = textList["id_"+String(currentTextNumber)][currentTextPos];
	var newButton = document.createElement("button");
	newButton.setAttribute("id", "narration_button");
	newButton.innerHTML = "Next";
	newButton.addEventListener('click', function() {
			changeTextNarration();
		});
	node.appendChild(newText);
	node.appendChild(newButton);
	loadSessionStorage();
}

// Create item depending of itemName.
// Probably making it easier.
// It actually mostly works as an encyclopedia of all the items in the game.
// I'll maybe put the allItems var outside of the function bc it can be useful.
function createItem(nameItem) {
	var allItems = [
	{
		type: "food",
		name: "food",
		quantity: 0,
		value: 10,
		description: "Miam miam"
	}
	];
	for (var eachItem in allItems) {
		if (allItems[eachItem]['name'] == nameItem) {return allItems[eachItem];}
	}
}
// Create randomized person.
function defineUnit () {
	var newUnit = {};
	newUnit["gender"] = genderArr[Math.floor(genderArr.length * Math.random())];
	newUnit["firstName"] = listOfNames["firstname"][newUnit["gender"]][Math.floor(listOfNames["firstname"][newUnit["gender"]].length * Math.random())];
	newUnit["surname"] = listOfNames["surname"][Math.floor(listOfNames["surname"].length * Math.random())];
	newUnit["age"] = 18 + Math.floor(60 * Math.random());
	return newUnit;
}

function yourTurn(phase) {
	console.log("YOUR TURN");
	var node = document.getElementById("bottom menu");
	if (phase == "special") {
		var newButton = document.createElement('button');
		tempIDs.push("yourTurn_trade");
		newButton.setAttribute("id", "yourTurn_trade");
		newButton.textContent = "Trade";
		node.appendChild(newButton);
		newButton.addEventListener('click', function() {
			changeMenu(this.id);
		});
	}
	else if (phase == "crewAssignment") {
		tempIDs.push("yourTurn_deploy");
		var newButton = document.createElement('button');
		newButton.setAttribute("id", "yourTurn_deploy");
		newButton.textContent = "Deploy units";
		node.appendChild(newButton);
		newButton.addEventListener('click', function() {
			changeMenu(this.id);
		});
	}
	else if (phase == "gathering") {
		tempIDs.push("yourTurn_gather");
		var newButton = document.createElement('button');
		newButton.setAttribute("id", "yourTurn_gather");
		newButton.addEventListener('click', function() {
			changeMenu(this.id);
		});
		newButton.textContent = "Gather ressources";
		node.appendChild(newButton);
	}
	else if (phase == "fight") {
		yourTurn("travel");
	}
	else if (phase == "travel") {
		tempIDs.push("yourTurn_travel");
		var node = document.getElementById("bottom menu");
		var newButton = document.createElement('button');
		newButton.setAttribute("id", "yourTurn_travel");
		newButton.textContent = "Travel";
		node.appendChild(newButton);
		newButton.addEventListener('click', function() {
			changeMenu(this.id);
		});
	}
}

// Function: Erases all previously created buttons with certain id.
function erasePreviousDestinations() {
	// querySelectorAll : search for all entry in document with selected arguments
	// arguments here are Id start with 'dest_'
	// forEach takes each element returned by the query and remove them.
	// e is each element and it applies what's after => to the e
	document.querySelectorAll('[id^="dest_"]').forEach(e => e.remove());
}

// Function: Change player location and do what has to been done after the movement
// TO BE MODIFIED -> maybe not the same inner HTML
function changeLocation(button_id) {
	// slice (cut the string in several part, here it deletes the 5 first caracters) the button id to get the right string.
	playerLocation = returnLocationData(button_id.slice(5));
	document.getElementById("title").innerHTML = "Location: " + playerLocation['name'];
	yourTurn();
}

// Function: define which destinations will be avaible to the player and creates the buttons associated with those destinations.
function defineNewDestinations(changeMenuCallback) {
	tempIDs.push("possibleDestinations");
	var node = document.getElementById("bottom menu");
	var possibleDestinationText = document.createElement("h1");
	possibleDestinationText.innerHTML = "Possible destinations: ";
	possibleDestinationText.setAttribute("id", "possibleDestinations");
	node.appendChild(possibleDestinationText);
	possibleDestinations = [];
	for (let i = 0; i < playerLocation["possibleDestinations"].length; i++) {
		if (playerLocation["possibleDestinations"][i]["luck"] >= Math.random()) {
			possibleDestinations.push(playerLocation["possibleDestinations"][i]["type"]);
		}
	}
	console.log(possibleDestinations)
	for (var i = 0; i < possibleDestinations.length; i++) {
		possibleDestinationText.innerHTML = possibleDestinationText.innerHTML + possibleDestinations[i];
		if (i < (possibleDestinations.length - 1)) {
			possibleDestinationText.innerHTML = possibleDestinationText.innerHTML + ", "
		}
		var newDestination = document.createElement('img');
		newDestination.src = possibleDestinations[i]+".png";
		newDestination.style.height = "100px";
		newDestination.style.width = "100px";
		newDestination.style.margin = "10px";
		node.appendChild(newDestination);
		newDestination.setAttribute("id", "dest_"+possibleDestinations[i]);
		buttonID = "dest_"+possibleDestinations[i]
		newDestination.addEventListener('click', function() {
			changeLocation(this.id);
		});
	}
}

function changeTextNarration() {
	console.log("Change Text");
	text = document.getElementById("narration_text");
	if (++currentTextPos >= textList["id_"+String(currentTextNumber)].length) {
		removeTempIDs();
		centerImage = document.getElementById("center-image");
		centerImage.src = "ancientEgyptArt.jpg";
		changeMenu("special");
	}
	else if (currentTextPos == textList["id_"+String(currentTextNumber)].length -1) {
		document.getElementById("narration_button").innerHTML = "End";
	}
	text.textContent = textList["id_"+String(currentTextNumber)][currentTextPos];
}

function ressourcesConsumption () {
	return;
}

function gatherResolution () {
	console.log("Gather Resolution !");
	["continueButton"].forEach(e => tempIDs.push(e));
	let i = 0;
	for (let job in gatherer) {
		if (gatherer[job] != 0) {break;}
		else {i++;}
	}
	if (i == Object.keys(gatherer).length) {
		var ressourceObtained = document.createElement("p");
		ressourceObtained.innerHTML = "No one was assigned to ressource gathering this turn!"
		ressourceObtained.setAttribute("id", "nothingObtained");
		document.getElementById("bottom menu").appendChild(ressourceObtained);
		tempIDs.push("nothingObtained");
	}

	for (let job in gatherer) {
		if (gatherer[job] == 0) {continue;}
		var ressourceObtained = document.createElement("p");
		var newRessources = gatherer[job]*playerLocation["gatheringValues"][job+"Yield"];
		ressourceObtained.innerHTML = String(newRessources) + " " + Capitalize(job)+" obtained from "+gatherer[job]+" people !";
		ressourceObtained.setAttribute("id", job+"Obtained");
		document.getElementById("bottom menu").appendChild(ressourceObtained);
		tempIDs.push(job+"Obtained");

		playerLocation["gatheringValues"][job+"Yield"]-=1;

		if (job == "morale") {
			morale += newRessources;
		}
		else if (job == "water") {
			water += newRessources
		}
		else {
			let isItem = false;
			for (let item in inventory) {
				if (inventory[item]['name'] == "food") {
					inventory[item]["quantity"] += newRessources;
					isItem = true;
				}
			}
			if (!isItem) {
			let newItem = createItem("food");
			newItem["quantity"] = newRessources;
			inventory.push(newItem);
			}
		}
	}

	var continueButton = document.createElement("button");
	continueButton.addEventListener("click", function () {changeMenu("ressourcesConsumption");})
	continueButton.setAttribute("id", "continueButton");
	continueButton.innerHTML = "Continue";
	document.getElementById("bottom menu").appendChild(continueButton);
}

nt.getElementById(VID+"Input");
    // Then I'm making sure the VID is in those values. It's pretty useless but it is in can case we need specific actions for specific values. Might delete.
    if (["water", "food", "morale"].includes(VID)) {
    	// If it isn't, then I'm first checking bro isn't trying to put negative values, if he is then I'm putting the value back to what it was before.
    	// I can do this because I save the value each time in a dict.
        if (VValue < 0) {inputNode.value = gatherer[VID];return;}
        // Otherwise I'm checking if the amount of new crew he wants to assign is < to the number of idle crew member.
        else if ((VValue-gatherer[VID]) > idleCrew) {
        	// If it is then I'm checking the max number he can put.
        	// parseInt is used to convert String into Integer, I do this bc it often is a String for some reason...
            inputNode.value = idleCrew + parseInt(gatherer[VID]);
            VValue = parseInt(gatherer[VID]) + parseInt(idleCrew);
        }
        // Finally I'm updating the idle crew avaible.
        idleCrew -= VValue - gatherer[VID];
        // And I'm updating the dict of values to keep track of assignement and to use them as backup as seen before.
        gatherer[VID] = VValue;
    }
    document.getElementById("idleCrewText").innerHTML = "Idle crew: "+String(idleCrew);
}

function manageGatherDistribution() {
	["idleCrewText","tempDiv", "resolveButton"].forEach(e => tempIDs.push(e));

	var bottomNode = document.getElementById("bottom menu");

	var idleCrewText = document.createElement("p");
	idleCrewText.innerHTML = "Idle crew: "+String(idleCrew);
	idleCrewText.setAttribute("id", "idleCrewText");
	bottomNode.appendChild(idleCrewText);

	ressources = [];
	if ("waterYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["waterYield"] > 0) {ressources.push("water");}
	if ("foodYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["foodYield"] > 0) {ressources.push("food");}
	if ("moraleYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["moraleYield"] > 0) {ressources.push("morale");}
	ressources.forEach(e => {
		var ressourceYield = document.createElement("p");
		ressourceYield.innerHTML = Capitalize(e)+"yield: "+String(playerLocation["gatheringValues"][e+"Yield"]);
		ressourceYield.setAttribute("id", e+"Yield");
		bottomNode.appendChild(ressourceYield);
		tempIDs.push(e+"Yield");
	})

	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "tempDiv");
	bottomNode.appendChild(newDiv);

	var resolveButton = document.createElement("button");
	resolveButton.addEventListener("click", function () {changeMenu("gatherResolution");})
	resolveButton.setAttribute("id", "resolveButton");
	resolveButton.innerHTML = "Resolve";

	ressources.forEach(e => {
		var tempLabel = document.createElement("label");
		tempIDs.push(e+"Label");
		tempLabel.setAttribute("id", e+"Label");

		var tempInput = document.createElement("input");
		tempIDs.push(e+"Input");
				tempInput.setAttribute("id", e+"Input");
		
		tempInput.setAttribute("id", e+"Input");
		tempInput.maxLength = 4;
		tempLabel.textContent = Capitalize(e) +" Gatherer : ";
		tempInput.style.width = "32px";

		tempInput.oninput = function() {checkRessource(e, this.value)};
		tempInput.type = "number";
		tempInput.value = 0;

		newDiv.appendChild(tempLabel);
		newDiv.appendChild(tempInput);
	})
	document.getElementById("bottom menu").appendChild(resolveButton);
}

function changeMenu(newMenu="None") {
	removeTempIDs();
	if (newMenu == "special") {
		if (playerLocation["isTradable"]) {return yourTurn("trade");} else {return changeMenu("crewAssignment");}
	}
	if (newMenu == "crewAssignment") {return yourTurn("crewAssignment");}
	if (newMenu == "yourTurn_deploy") {return manageDeployDistribution();}
	if (newMenu == "gathering") {return yourTurn(newMenu);}
	if (newMenu == "yourTurn_gather") {return manageGatherDistribution();}
	if (newMenu == "gatherResolution") {return gatherResolution();}
	if (newMenu == "ressourcesConsumption") {return ressourcesConsumption();}
	if (newMenu == "travel") {return defineNewDestinations(changeMenu);}
	else if (newMenu.slice(0, 5) == "dest_") {
		changeLocation(
				newMenu,
				defineNewDestinations
				);
	}
}

onLoad();