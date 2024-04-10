// The fonction used to save the files in the user session using sessionStorage.setItem();
function save(varName, value) {
	if (typeof value == "number") {value = String(value);}
	else if (typeof value == "object") {value = JSON.stringify(value);}
	else if (typeof value == "boolean") {value = String(value);}
	else {value = String(value);}
	sessionStorage.setItem(String(varName), value);
}

// Used to get all the new values from the sessionStorage.
function loadSessionStorage() {
	crewMembers = JSON.parse(sessionStorage.getItem("crewMembers"));
	crewTotal = parseInt(sessionStorage.getItem("crewTotal"));
	crewTypes = JSON.parse(sessionStorage.getItem("crewTypes"));
	idleCrew = sessionStorage.getItem("idleCrew");
	morale = sessionStorage.getItem("morale");
	money = sessionStorage.getItem("money");
	authority = sessionStorage.getItem("authority");
	water = sessionStorage.getItem("water");
	numberOfTurns = sessionStorage.getItem("numberOfTurns");
	famineTurns = parseInt(sessionStorage.getItem("famineTurns"));
	inventory = JSON.parse(sessionStorage.getItem("inventory"));
	playerLocation = JSON.parse(sessionStorage.getItem("playerLocation"));
	gatherer = JSON.parse(sessionStorage.getItem("gatherer"));
}

// All the variables we want to save and share through every JS files.
function saveSessionStorage () {
	save("crewMembers", crewMembers);
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

inventory.push(monNouvelObjet);



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
var allItems = [
{
	type: "food",
	name: "food",
	quantity: 0,
	value: 10,
	description: "Miam miam"
}
];
var moralDecrease = 0.05;
var listOfNames = {
	firstname: {
		male: ["Jonathan", "Ethan", "Raphael"],
		female: ["Neyla", "Joanne"]
	},
	surname: ["Joestar"]
};
var genderArr = ["male", "female"];
var textList = {
	"id_1": [
"(The man is slowly awakening from his loss of consciousness, he looks around him with anxiety. He realizes that his beloved daughter has been kidnapped by King Rhamsouk IV. He rises, his heart, heavy with grief and worry.)",
"...",
"By the gods, how could this happen to us? Where is my daughter, my most precious treasure?",
"Rhamsouk IV, this ruthless trash, has dared to snatch her away to forcibly marry her. His arrogance and lust must know no bounds.",
"(He looks around him, the scorching desert streching as far as the eye can see, the crushing sun accentuating his sense of helplessness.)",
"My dear child, taken from me towards a fate I can scarcely bear to imagine. I have always strived to protect you, but now, I feel powerless against the tyranny of this mad king.",
"But I swear by Osiris and all the gods of Egypt, I will do whatever is in my power to bring you back home.",
"(He rises, his heavy footsteps echoing in the oppressive silence of the desert.)",
"I will traverse every grain of sand in this arid desert, I will defy even the deities themselves if need be, to find my beloved daughter. May the gods guide me and grant me the strength to overcome this trial. My daughter, hold fast, I am coming for you, and no king, however mighty, shall break the bond that binds us.",
"But I must not rely solely on divine intervention.",
"I will use every resource at my disposal to ensure your safe return, my child. I will build upon my caravan trade, expanding it to become one of the wealthiest and most influential enterprises in all of Egypt. With this wealth and power, I will have the means to challenge Rhamsouk IV and rescue you from his clutches.",
"Our reunion will not be a mere dream, but a reality forged through my unwavering determination and the strength of our love. Prepare yourself, my daughter, for I am about to embark on a journey that will shake the very foundations of this kingdom."
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

function updateRessourcesDisplay () {
	document.getElementById("nb_water").textContent = String(water);
	document.getElementById("nb_food").textContent = String(findItemInv("food")["quantity"]);
	document.getElementById("nb_money").textContent = String(money); 
	document.getElementById("nb_morale").textContent = String(morale);
	document.getElementById("nb_crew").textContent = String(crewTotal); 
}

function prepareNarration() {
	["narration_text", "narration_button", "narration_div"].forEach(e => tempIDs.push(e));

	centerImage = document.getElementById("center-image");
	centerImage.src = "../Images/cine-1-7.png";
	currentTextNumber = 1;
	currentTextPos = 0;

	var node = document.getElementById("actionMenu");

	var narration_div = document.createElement("div");
	narration_div.style.width = "50%";
	node.appendChild(narration_div);
	

	var newText = document.createElement("p");
	newText.setAttribute("id", "narration_text");
	newText.textContent = textList["id_"+String(currentTextNumber)][currentTextPos];
	var newButton = document.createElement("button");
	newButton.setAttribute("id", "narration_button");
	newButton.innerHTML = "Next";
	newButton.addEventListener('click', function() {
			changeTextNarration();
		});
	narration_div.appendChild(newText);
	narration_div.appendChild(newButton);
}

// Only function that is called when page is being shown.
// It manages what to do afterward.
// Maybe it could be put at the root, but I just prefer to put things in function, if it isn't a variable.
function onLoad() {
	loadSessionStorage();
	updateRessourcesDisplay();
	if (statusTurn == "trade") {
		changeMenu("");
	}
	else if (statusTurn == "deployUnits") {
		changeMenu("");
	}
	prepareNarration();
}

// Create item depending of itemName.
function createItem(nameItem) {
	for (var eachItem in allItems) {
		if (allItems[eachItem]['name'] == nameItem) {return allItems[eachItem];}
	}
}
function findItemInv(nameItem) {
	for (var eachItem in allItems) {
		if (inventory[eachItem]['name'] == nameItem) {return inventory[eachItem];}
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

function fight (team1, team2) {
	console.log(team1, team2);
	for (let i=0; i<team1.length; i++) {
		for (let unit1 in team1[i]) {
			thisUnit = team1[i][unit1];
			trueAim = Math.min(team2.length-1, Math.max(0, team1Aim[i] - i));
			maxIndex = team2[trueAim].length - 1;
			if (maxIndex == 0) {
				unitIndex = 0;
			}
			else if (unit1 > maxIndex) {
				unitIndex = unit1%maxIndex;
			}
			else {unitIndex = unit1};
			ennemyUnit = team2[trueAim][unitIndex];
			atk = thisUnit['weapon']['power'][team1Aim[i]]
				+ thisUnit['weaponProficiency'][thisUnit['weapon']["weaponType"]]
				+ thisUnit['weaponProficiency'][thisUnit['weapon']["attackStyle"]]
				+ thisUnit['weaponProficiency']["weapon"]
				+ thisUnit["attacks"][thisUnit['weapon']["attackType"]];
			res = ennemyUnit["resistance"][thisUnit['weapon']["attackType"]]
				+ ennemyUnit["resistance"]["defense"]
				+ ennemyUnit["resistance"]["phyDefense"];
			damageCalc = Math.max(0, atk - res);
			if (ennemyUnit['health'] > 0 && ennemyUnit['health'] - damageCalc <= 0) {
				console.log(ennemyUnit['name'],"died from the next attack.");
			}
			ennemyUnit['health'] -= damageCalc;
			console.log("T1:",thisUnit['name'],"has done", damageCalc,"damage to",ennemyUnit['name'],"with",thisUnit['weapon']['name']+"!");
		}
	}
	for (let i=0; i<team2.length; i++) {
		for (let unit2 in team2[i]) {
			thisUnit = team2[i][unit2];
			trueAim = Math.min(team1.length-1, Math.max(0, team2Aim[i] - i));
			maxIndex = team1[trueAim].length - 1;
			if (maxIndex == 0) {
				unitIndex = 0;
			}
			else if (unit2 > maxIndex) {
				unitIndex = unit2%maxIndex;
			}
			else {unitIndex = unit2};
			ennemyUnit = team1[trueAim][unitIndex];
			atk = thisUnit['weapon']['power'][team2Aim[i]]
				+ thisUnit['weaponProficiency'][thisUnit['weapon']["weaponType"]]
				+ thisUnit['weaponProficiency'][thisUnit['weapon']["attackStyle"]]
				+ thisUnit['weaponProficiency']["weapon"]
				+ thisUnit["attacks"][thisUnit['weapon']["attackType"]];
			res = ennemyUnit["resistance"][thisUnit['weapon']["attackType"]]
				+ ennemyUnit["resistance"]["defense"]
				+ ennemyUnit["resistance"]["phyDefense"];
			damageCalc = Math.max(0, atk - res);
			if (ennemyUnit['health'] > 0 && ennemyUnit['health'] - damageCalc <= 0) {
				console.log(ennemyUnit['name'],"died from the next attack.");
			}
			ennemyUnit['health'] -= damageCalc;
			console.log("T2:",thisUnit['name'],"has done", damageCalc,"damage to",ennemyUnit['name'],"with",thisUnit['weapon']['name']+"!");
			//console.log("Atk.:",atk,"=",thisUnit['weapon']['power'][team2Aim[i]],"(",team2Aim[i], i,") +", thisUnit['weaponProficiency'][thisUnit['weapon']["weaponType"]])
			//console.log("Def.:",res,"=",ennemyUnit["resistance"][thisUnit['weapon']["attackType"]],"+",ennemyUnit["resistance"]["defense"],"+",ennemyUnit["resistance"]["phyDefense"]);
		}
	}
	for (let team in [team1, team2]) {
		for (let i = 0; i<[team1, team2][team].length; i++) {
			[team1, team2][team][i] = [team1, team2][team][i].filter(unit => unit['health'] > 0);
		}
		chooseAim([team1, team2][team], 1);
	}
	return team1, team2;
}

function yourTurn(phase) {
	console.log("YOUR TURN");
	var node = document.getElementById("actionMenu");
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
		var node = document.getElementById("actionMenu");

		tempIDs.push("travelQuestion");
		var newText = document.createElement('p');
		newText.setAttribute("id", "travelQuestion");
		newText.textContent = "Would you like to move?";
		node.appendChild(newText);
		newText.addEventListener('click', function() {
			changeMenu(this.id);
		});

		tempIDs.push("yourTurn_travel");
		var newButton = document.createElement('button');
		newButton.setAttribute("id", "yourTurn_travel");
		newButton.textContent = "Travel";
		node.appendChild(newButton);
		newButton.addEventListener('click', function() {
			changeMenu(this.id);
		});
		tempIDs.push("yourTurn_Stay");
		var newButton = document.createElement('button');
		newButton.setAttribute("id", "yourTurn_Stay");
		newButton.textContent = "Stay";
		node.appendChild(newButton);
		newButton.addEventListener('click', function() {
			changeMenu("uSure", [["ressourcesConsumption", false], ["travel", "false"]]);
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

function turnX () {
	["turnX", "turnX_button"].forEach(e => tempIDs.push(e));

	var node = document.getElementById("actionMenu");

	var newText = document.createElement("h1");
	newText.setAttribute("id", "turnX");
	newText.textContent = "Turn " + String(numberOfTurns);

	var newButton = document.createElement("button");
	newButton.setAttribute("id", "turnX_button");
	newButton.innerHTML = "Next";
	newButton.addEventListener('click', function() {
			changeMenu("special");
		});

	node.appendChild(newText);
	node.appendChild(newButton);

	["water", "money", "food"].forEach(e => {
		let bonusNode = document.getElementById("bonus_"+e);
		bonus = 0;
		crewMembers.forEach(e2 => {
			if (e in e2['needs']) {
				bonus -= e2['needs'][e] - e2['passiveEarning'][e]
			}
			else {
			crewMembers.forEach(e2 => bonus += e2['passiveEarning'][e])
			}
		}
		)
		if (bonus >= 0) {bonus = "+"+bonus;bonusNode.style.color = "green";}
		else {bonusNode.style.color = "red";}
		bonusNode.innerHTML = String(bonus);
	})


}

function areUSure (directions) {
	var node = document.getElementById("actionMenu");

	tempIDs.push("uSureText")
	var newText = document.createElement('h2');
	newText.textContent = "Are you sure?"
	newText.setAttribute("id", "uSureText");
	node.appendChild(newText);

	var horizonzalNode = document.createElement("div");
	horizonzalNode.setAttribute("id", "horizonzalNode");
	node.appendChild(horizonzalNode);

	tempIDs.push("yesButton");
	var newButton = document.createElement('button');
	newButton.setAttribute("id", "yesButton");
	newButton.textContent = "Yes";
	horizonzalNode.appendChild(newButton);
	newButton.addEventListener('click', function() {
		changeMenu(directions[0][0], directions[0][1]);
	});
	newButton.classList.add("smallerButton");
	tempIDs.push("noButton");
	var newButton = document.createElement('button');
	newButton.setAttribute("id", "noButton");
	newButton.textContent = "No";
	newButton.classList.add("smallerButton");
	horizonzalNode.appendChild(newButton);
	newButton.addEventListener('click', function() {
		changeMenu(directions[1][0], directions[1][1]);
	});
}
// Function: Change player location and do what has to been done after the movement
// TO BE MODIFIED -> maybe not the same inner HTML
function changeLocation(button_id) {
	console.log("CHANGE LOCATION");
	// slice (cut the string in several part, here it deletes the 5 first caracters) the button id to get the right string.
	playerLocation = JSON.parse(JSON.stringify(returnLocationData(button_id.slice(5))));
	document.getElementById("locationName").textContent = playerLocation['name'];
	changeMenu("ressourcesConsumption", true);
}

// Function: define which destinations will be avaible to the player and creates the buttons associated with those destinations.
function defineNewDestinations(changeMenuCallback) {
	tempIDs.push("possibleDestinations");
	var node = document.getElementById("actionMenu");
	var possibleDestinationText = document.createElement("h1");
	possibleDestinationText.innerHTML = "Possible destinations: ";
	possibleDestinationText.setAttribute("id", "possibleDestinations");
	node.appendChild(possibleDestinationText);
	possibleDestinations = [];
	for (let i = 0; i < playerLocation["possibleDestinations"].length; i++) {
		if (playerLocation["possibleDestinations"][i]["luck"] >= Math.random()) {

			possibleDestinations.push(returnLocationData(playerLocation["possibleDestinations"][i]["type"]));
		}
	}

	var horizonzalNode = document.createElement("div");
	horizonzalNode.setAttribute("id", "horizonzalNode");
	node.appendChild(horizonzalNode);
	console.log(possibleDestinations);
	for (var i = 0; i < possibleDestinations.length; i++) {
		possibleDestinationText.innerHTML = possibleDestinationText.innerHTML + possibleDestinations[i]["name"];
		if (i < (possibleDestinations.length - 1)) {
			possibleDestinationText.innerHTML = possibleDestinationText.innerHTML + ", "
		}
		var newDestination = document.createElement('img');
		newDestination.src = "../Images/"+possibleDestinations[i]["type"]+".png";
		newDestination.style.height = "100px";
		newDestination.style.width = "100px";
		newDestination.style.margin = "10px";
		horizonzalNode.appendChild(newDestination);
		newDestination.setAttribute("id", "dest_"+possibleDestinations[i]["type"]);
		buttonID = "dest_"+possibleDestinations[i]["type"]
		tempIDs.push(buttonID);
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
		centerImage.src = "../Images/Illustration.jpg";
		changeMenu("turnX");
	}
	else if (currentTextPos == textList["id_"+String(currentTextNumber)].length -1) {
		document.getElementById("narration_button").innerHTML = "End";
	}
	text.textContent = textList["id_"+String(currentTextNumber)][currentTextPos];
}

function killPeople(numberOfDeath) {
	console.log("Death", numberOfDeath);
	crewTotal -= numberOfDeath;
	idleCrew = crewTotal;
	for (let i = 0; i < numberOfDeath; i++) {
		crewMembers.shift();
	}
}

function ressourcesConsumption (doTravel) {
	console.log("Crew Total", crewTotal, famineTurns);
	var waterConsumption = 0;
	crewMembers.forEach(e => waterConsumption += e['needs']['water'])
	var foodConsumption = 0;
	crewMembers.forEach(e => foodConsumption += e['needs']['food'])
	console.log("Consumptions: ", waterConsumption, foodConsumption);
	if (doTravel) {
		water -= waterConsumption;
	}
	else {
		water -= Math.floor(waterConsumption / 2);
	}
	if (findItemInv("food")['quantity'] >= foodConsumption)
		{findItemInv("food")['quantity'] -= foodConsumption;}
	else {famineTurns += 1;morale -= 10;killPeople(Math.pow(2, famineTurns)-2)}
	morale /= 1.05;
	if (water <= 0) {
		killPeople(water*-1);
		water = 0;
	}
	if (crewTotal <= 0) {
		return changeMenu("Defeat", "Death");
	}
	if (morale < 0) {
		if (authority > morale * 1 + 1) {
			morale = 1;
			authority += morale;
		}
		else {return changeMenu("Defeat", "Revolt");}
	}
	numberOfTurns++;
	return changeMenu("turnX");
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
		document.getElementById("actionMenu").appendChild(ressourceObtained);
		tempIDs.push("nothingObtained");
	}

	for (let job in gatherer) {
		if (gatherer[job] == 0) {continue;}
		var ressourceObtained = document.createElement("p");
		var newRessources = gatherer[job]*playerLocation["gatheringValues"][job+"Yield"];
		ressourceObtained.innerHTML = String(newRessources) + " " + Capitalize(job)+" obtained from "+gatherer[job]+" people !";
		ressourceObtained.setAttribute("id", job+"Obtained");
		document.getElementById("actionMenu").appendChild(ressourceObtained);
		tempIDs.push(job+"Obtained");
		idleCrew += gatherer[job];
		gatherer[job] = 0;

		// Depletion
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
	continueButton.addEventListener("click", function () {changeMenu("travel");})
	continueButton.setAttribute("id", "continueButton");
	continueButton.innerHTML = "Continue";
	document.getElementById("actionMenu").appendChild(continueButton);
}

function manageDeployDistribution() {
	return yourTurn("gathering");
}

// Function to check if player can assign more or less units to each yield.
// VID is the ressource yield the player want to assign units to, so it can be food, water or morale.
// VValue is the new value given by the player to this yield.
// I don't remember what V stands for.
function checkRessource(VID, VValue) {
	// First thing is to round the value in case player put a float, and user isn't supposed to assign a limb to such a task.
    VValue = Math.round(VValue);
    // From the VID we can search the corresponding node, bc the id of those input elements have the same format name_of_ressource + "Input".
    var inputNode = document.getElementById(VID+"Input");
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
	["idleCrewText","tempDiv", "resolveButton", "horizonzalNode"].forEach(e => tempIDs.push(e));
	var resolveButton = document.createElement("button");
	resolveButton.setAttribute("id", "resolveButton");
	resolveButton.innerHTML = "Resolve";

	var bottomNode = document.getElementById("actionMenu");
	var horizonzalNode = document.createElement("div");
	horizonzalNode.setAttribute("id", "horizonzalNode");
	bottomNode.appendChild(horizonzalNode);

	ressources = [];
	if ("waterYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["waterYield"] > 0) {ressources.push("water");}
	if ("foodYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["foodYield"] > 0) {ressources.push("food");}
	if ("moraleYield" in playerLocation["gatheringValues"] && playerLocation["gatheringValues"]["moraleYield"] > 0) {ressources.push("morale");}
	if (ressources == 0) {
		tempIDs.push("noRessourceText");
		var noRessourceText = document.createElement("p");
		noRessourceText.innerHTML = "There is no ressources in this forgotten place.";
		noRessourceText.setAttribute("id", "noRessourceText");
		bottomNode.appendChild(noRessourceText);
		resolveButton.addEventListener("click", function () {changeMenu("travel");})
	}
	else {
		resolveButton.addEventListener("click", function () {changeMenu("gatherResolution");})
		ressources.forEach(e => {
			var ressourceYield = document.createElement("p");
			ressourceYield.innerHTML = Capitalize(e)+"yield: "+String(playerLocation["gatheringValues"][e+"Yield"]);
			ressourceYield.setAttribute("id", e+"Yield");
			horizonzalNode.appendChild(ressourceYield);
			tempIDs.push(e+"Yield");
		})
	
		var idleCrewText = document.createElement("p");
		idleCrewText.innerHTML = "Idle crew: " + String(idleCrew);
		idleCrewText.setAttribute("id", "idleCrewText");
		bottomNode.appendChild(idleCrewText);
	
		var newDiv = document.createElement("div");
		newDiv.setAttribute("id", "tempDiv");
		bottomNode.appendChild(newDiv);
	
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
		})}

	document.getElementById("actionMenu").appendChild(resolveButton);
}

function Defeat (option) {
	tempIDs.push("dyingText");
	var dyingText = document.createElement("p");
	dyingText.setAttribute("id", "dyingText");
	dyingText.innerHTML = `You died on turn ${String(numberOfTurns)}.`;
	document.getElementById("actionMenu").appendChild(dyingText);
}

function manageTrade() {
	saveSessionStorage();
	window.location.href = "../mainPage/tradePage/trade.html";
}

function changeMenu(newMenu="None", option=null) {
	updateRessourcesDisplay();
	removeTempIDs();
	if (newMenu == "turnX") {return turnX();}
	if (newMenu == "special") {
		if (playerLocation["isTradable"]) {return yourTurn("special");} else {return changeMenu("crewAssignment");}
	}
	if (newMenu == "yourTurn_trade") {return manageTrade();}
	if (newMenu == "crewAssignment") {return yourTurn("crewAssignment");}
	if (newMenu == "yourTurn_deploy") {return manageDeployDistribution();}
	if (newMenu == "gathering") {return yourTurn(newMenu);}
	if (newMenu == "yourTurn_gather") {return manageGatherDistribution();}
	if (newMenu == "gatherResolution") {return gatherResolution();}
	if (newMenu == "travel") {return yourTurn(newMenu);}
	if (newMenu == "uSure") {return areUSure(option)};
	if (newMenu == "yourTurn_travel") {return defineNewDestinations(changeMenu);}
	if (newMenu == "ressourcesConsumption") {return ressourcesConsumption(option);}
	if (newMenu == "Defeat") {return Defeat(option);}
	else if (newMenu.slice(0, 5) == "dest_") {
		changeLocation(
				newMenu,
				defineNewDestinations
				);
	}
}

onLoad();