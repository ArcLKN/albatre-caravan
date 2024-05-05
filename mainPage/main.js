// The fonction used to save the files in the user session using sessionStorage.setItem();
function save(varName, value) {
  if (typeof value == "number") {
	value = String(value);
  } else if (typeof value == "object") {
	value = JSON.stringify(value);
  } else if (typeof value == "boolean") {
	value = String(value);
  } else {
	value = String(value);
  }
  sessionStorage.setItem(String(varName), value);
}

// Used to get all the new values from the sessionStorage.
function loadSessionStorage() {
	money = parseInt(sessionStorage.getItem("money"));
  crewMembers = JSON.parse(sessionStorage.getItem("crewMembers"));
  crewTotal = JSON.parse(sessionStorage.getItem("crewTotal"));
  crewTypes = JSON.parse(sessionStorage.getItem("crewTypes"));
  idleCrew = parseInt(sessionStorage.getItem("idleCrew"));
  morale = parseInt(sessionStorage.getItem("morale"));
  
  authority = parseInt(sessionStorage.getItem("authority"));
  water = parseInt(sessionStorage.getItem("water"));
  numberOfTurns = sessionStorage.getItem("numberOfTurns");
  famineTurns = parseInt(sessionStorage.getItem("famineTurns"));
  inventory = JSON.parse(sessionStorage.getItem("inventory"));
  playerLocation = JSON.parse(sessionStorage.getItem("playerLocation"));
  gatherer = JSON.parse(sessionStorage.getItem("gatherer"));
  statusTurn = sessionStorage.getItem("statusTurn");
  allItems = JSON.parse(sessionStorage.getItem("allItems"));
}

// All the variables we want to save and share through every JS files.
function saveSessionStorage() {
  save("statusTurn", statusTurn);
  save("crewMembers", crewMembers);
  // Number of people player has, thus number of people he can use.
  save("crewTotal", crewTotal);
  // Distribution of the crew, the total can't be > crewTotal.
  save("crewTypes", crewTypes); // Free crew can become carriers to carry more goods.
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
function Capitalize(e) {
  return e[0].toUpperCase() + e.slice(1);
}

// Initializing base variables that aren't used on other JS files.
var currentPorterage; // Capacity of the caravan to carry goods. It is influenced by the number of animals such as camels and the number of carriers.
var neededPorterage; // Weight of all the items transported by the caravan.
// Each unit of food and water is equal to one weight unit.
function moraleYieldDef() {}
// The severals yields decrease by one if harvested each turn.
var groupOfEnemies = [[],[],[]];
var enemyType;
var enemyNumber;
var possibleDestinations;
var locations = [
  {	
	type: "nil_shore",
	name: "Nil shore",
	isTradable: false,
	doEnemySpawn: true,
	enemyType: {"legionary": 0.70, "bandit":1},
	description:
	  "A fertile place escaping the harsh life of the desert. In this place you can freely gather high quantity of water and decent quantity of food.",
	gatheringValues: {
	  waterYield: 3,
	  foodYield: 2,
	},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "village", luck: 0.5 },
	  { type: "nil_shore", luck: 1 },
	  { type: "desert", luck: 1 },
	  { type: "fluvial_city", luck: 0.2 },
	],
  },
  {
	type: "village",
	name: "Village",
	isTradable: true,
	doEnemySpawn: false,
	description:
	  "A bunch of organized houses near the shore of the Nil assuring your caravan a bit of peace in the desert. Don't hesitate to find a local merchant to buy useful items for the lowest prices of the country.",
	gatheringValues: {
	  waterYield: 2,
	  moraleYield: true,
	},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "village", luck: 0.1 },
	  { type: "nil_shore", luck: 0.8 },
	  { type: "desert", luck: 1 },
	],
	buyableGoods: {
	5: {
		volume: 100,
		price: 4,
	  },
	7:{
		volume: 3,
		price: 500,
	  },
	},
  },
  {
	type: "desert",
	name: "Desert",
	isTradable: false,
	description: "Bunch of sand.",
	gatheringValues: {},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "village", luck: 0.1 },
	  { type: "nil_shore", luck: 0.3 },
	  { type: "desert", luck: 1 },
	  { type: "oasis", luck: 0.1 },
	  { type: "desert_city", luck: 0.1 },
	],
  },
  {
	type: "desert_city",
	name: "Desert city",
	isTradable: true,
	description:
	  "In the middle of the desert, majestic buildings made of polished sandstones rise from the sand welcoming your caravan.",
	gatheringValues: {
	  moraleYield: true,
	},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "nil_shore", luck: 0.3 },
	  { type: "desert", luck: 1 },
	  { type: "oasis", luck: 0.1 },
	  { type: "desert_city", luck: 0.1 },
	],
	buyableGoods: {
	  5: {
		volume: 100,
		price: 8,
	  },
	  0: {
		volume: 2,
		price: 1000,
	  },
	},
	sellableGoods:{ 
		  6: {
			volume: 50,
			price: 40,
		  },
		},
  },
  {
	type: "fluvial_city",
	name: "Fluvial City",
	isTradable: true,
	description:
	  "A city which whole economy resolves on the manufacture of writing materials from the papyrus plant, thanks to the fertility of the Nil shore.",
	gatheringValues: {
	  waterYield: 3,
	  moraleYield: true,
	},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "village", luck: 0.1 },
	  { type: "nil_shore", luck: 1 },
	  { type: "desert", luck: 1 },
	],
	buyableGoods: {
	6: {
		volume: 100,
		price: 6,
	},
	5: {
		volume: 50,
		price: 20,
	},
	2: {
		volume: 20,
		price: 100,
	},
	3: {
			volume: 20,
			price: 100,
		},
	4: {
			volume: 20,
			price: 100,
		},
	},
	sellableGoods: {
		2: {
			volume: 20,
			price: 100,
		},
		3: {
			volume: 20,
			price: 100,
		},
		4: {
			volume: 20,
			price: 100,
		},
	},
  },
  {
	type: "oasis",
	name: "Oasis",
	isTradable: false,
	doEnemySpawn: true,
	enemyType: {"legionary": 1},
	description:
	  "In the middle of the desert it's the closest thing to what you could call Paradise.",
	gatheringValues: {
	  waterYield: 3,
	  foodYield: 3,
	},
	possibleEvents: [],
	possibleDestinations: [
	  { type: "village", luck: 0.5 },
	  { type: "nil_shore", luck: 1 },
	  { type: "desert", luck: 1 },
	  { type: "fluvial_city", luck: 0.2 },
	],
  },];
var enemyList = [
{
	name: "bandit",
	health: 0,
}
];
var probabilityRandomOasis = 0.1;

var moralDecrease = 0.05;
var listOfNames = {
  firstname: {
	male: ["Jonathan", "Ethan", "Raphael"],
	female: ["Neyla", "Joanne"],
  },
  surname: ["Joestar"],
};
var genderArr = ["male", "female"];
var textList = {
  id_1: [
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
	"Our reunion will not be a mere dream, but a reality forged through my unwavering determination and the strength of our love. Prepare yourself, my daughter, for I am about to embark on a journey that will shake the very foundations of this kingdom.",
  ],
};
var currentTextPos = 0;
var currentTextNumber = 1;
var tempIDs = [];

// Remove every temporary element.
// A complex question in game dev is choosing between CPU and RAM, you always have the choice, but you must often find balance depending on what you try to achieve.
// My fishing game is a good example of why it's important to find this balance, it would use way too much CPU power for nothing if I wasn't caching many stuff, making use of the ram.
// This choice here makes use of the CPU and not the RAM.
// Well this isn't very impactful here, bc it's so small what we are doing.
function removeTempIDs() {
  tempIDs.forEach((e) => {
	if (document.getElementById(e)) {
	  document.getElementById(e).remove();
	}
  });
  tempIDs = [];
}

// Return location information from it's type / name.
function returnLocationData(location) {
  for (let i = 0; i < locations.length; i++) {
	if (locations[i]["type"] == location) {
	  locationEntry = locations[i];
	  return locationEntry;
	}
  }
}


function computeFood () {
	let foodNbr = 0;
	for (let i in inventory) {
		if (allItems[i]['type'] == "food") {
			foodNbr += allItems[i]['foodValue'] * inventory[i]['volume'];
		}
	}
	return foodNbr;
}

function updateRessourcesDisplay() {
  document.getElementById("nb_water").textContent = String(water);
  document.getElementById("nb_food").textContent = String(computeFood());
  document.getElementById("nb_money").textContent = String(money);
  document.getElementById("nb_morale").textContent = String(Math.round(morale));
  console.log(crewTotal);
  document.getElementById("nb_crew").textContent = String(crewTotal.length);
}

function prepareNarration() {
  ["narration_text", "narration_button", "narration_div"].forEach((e) =>
	tempIDs.push(e)
  );

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
  newText.textContent =
	textList["id_" + String(currentTextNumber)][currentTextPos];
  var newButton = document.createElement("button");
  newButton.setAttribute("id", "narration_button");
  newButton.innerHTML = "Next";
  newButton.addEventListener("click", function () {
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
  // Define next caravan ressources evolution depending on the needs of the crew members.
  ["water", "money", "food"].forEach((e) => {
	let bonusNode = document.getElementById("bonus_" + e);
	bonus = 0;
	crewTotal.forEach((e2) => {
	  if (e in e2["needs"]) {
		bonus -= e2["needs"][e] - e2["passiveEarning"][e];
	  } else {
		crewTotal.forEach((e2) => (bonus += e2["passiveEarning"][e]));
	  }
	});
	if (bonus >= 0) {
	  bonus = "+" + bonus;
	  bonusNode.style.color = "green";
	} else {
	  bonusNode.style.color = "red";
	}
	bonusNode.innerHTML = String(bonus);
  });
  if (statusTurn == "deployUnits") {
	return changeMenu("crewAssignment");
  }
  else if (statusTurn == "gatherResolution") {
	return changeMenu("gatherResolution");
  }
  else if (statusTurn == "gatherResolution") {
	return changeMenu("gatherResolution");
  }
  else if (statusTurn == "deployCarrier") {
		return changeMenu("travel");
	}
	else if (statusTurn == "beginFight") {
		return manageBattle();
	}
  else if (statusTurn == "narration") {
		prepareNarration();
	}
}


// Create randomized person.
function defineUnit() {
  var newUnit = {};
  newUnit["gender"] = genderArr[Math.floor(genderArr.length * Math.random())];
  newUnit["firstName"] =
	listOfNames["firstname"][newUnit["gender"]][
	  Math.floor(
		listOfNames["firstname"][newUnit["gender"]].length * Math.random()
	  )
	];
  newUnit["surname"] =
	listOfNames["surname"][
	  Math.floor(listOfNames["surname"].length * Math.random())
	];
  newUnit["age"] = 18 + Math.floor(60 * Math.random());
  return newUnit;
}

function fight(team1, team2) {
  for (let i = 0; i < team1.length; i++) {
	for (let unit1 in team1[i]) {
	  thisUnit = team1[i][unit1];
	  trueAim = Math.min(team2.length - 1, Math.max(0, team1Aim[i] - i));
	  maxIndex = team2[trueAim].length - 1;
	  if (maxIndex == 0) {
		unitIndex = 0;
	  } else if (unit1 > maxIndex) {
		unitIndex = unit1 % maxIndex;
	  } else {
		unitIndex = unit1;
	  }
	  ennemyUnit = team2[trueAim][unitIndex];
	  atk =
		thisUnit["weapon"]["power"][team1Aim[i]] +
		thisUnit["weaponProficiency"][thisUnit["weapon"]["weaponType"]] +
		thisUnit["weaponProficiency"][
		  thisUnit["weapon"]["attackStyle"][team1Aim[i]]
		] +
		thisUnit["weaponProficiency"]["weapon"] +
		thisUnit["attacks"][thisUnit["weapon"]["attackType"][team1Aim[i]]] +
		thisUnit["attacks"]["damageAbs"];
	  res =
		ennemyUnit["resistance"][
		  thisUnit["weapon"]["attackType"][team1Aim[i]]
		] +
		ennemyUnit["resistance"]["defense"] +
		ennemyUnit["resistance"]["phyDefense"];
	  damageCalc = Math.max(0, atk - res);
	  if (ennemyUnit["health"] > 0 && ennemyUnit["health"] - damageCalc <= 0) {
		console.log(ennemyUnit["name"], "died from the next attack.");
	  }
	  ennemyUnit["health"] -= damageCalc;
	  console.log(
		"T1:",
		thisUnit["name"],
		"has done",
		damageCalc,
		"damage to",
		ennemyUnit["name"],
		"with",
		thisUnit["weapon"]["name"] + "!"
	  );
	}
  }
  for (let i = 0; i < team2.length; i++) {
	for (let unit2 in team2[i]) {
	  thisUnit = team2[i][unit2];
	  trueAim = Math.min(team1.length - 1, Math.max(0, team2Aim[i] - i));
	  maxIndex = team1[trueAim].length - 1;
	  if (maxIndex == 0) {
		unitIndex = 0;
	  } else if (unit2 > maxIndex) {
		unitIndex = unit2 % maxIndex;
	  } else {
		unitIndex = unit2;
	  }
	  ennemyUnit = team1[trueAim][unitIndex];
	  atk =
		thisUnit["weapon"]["power"][team2Aim[i]] +
		thisUnit["weaponProficiency"][thisUnit["weapon"]["weaponType"]] +
		thisUnit["weaponProficiency"][
		  thisUnit["weapon"]["attackStyle"][team2Aim[i]]
		] +
		thisUnit["weaponProficiency"]["weapon"] +
		thisUnit["attacks"][thisUnit["weapon"]["attackType"][team2Aim[i]]];
	  res =
		ennemyUnit["resistance"][
		  thisUnit["weapon"]["attackType"][team2Aim[i]]
		] +
		ennemyUnit["resistance"]["defense"] +
		ennemyUnit["resistance"]["phyDefense"];
	  damageCalc = Math.max(0, atk - res);
	  if (ennemyUnit["health"] > 0 && ennemyUnit["health"] - damageCalc <= 0) {
		console.log(ennemyUnit["name"], "died from the next attack.");
	  }
	  ennemyUnit["health"] -= damageCalc;
	  console.log(
		"T2:",
		thisUnit["name"],
		"has done",
		damageCalc,
		"damage to",
		ennemyUnit["name"],
		"with",
		thisUnit["weapon"]["name"] + "!"
	  );
	  //console.log("Atk.:",atk,"=",thisUnit['weapon']['power'][team2Aim[i]],"(",team2Aim[i], i,") +", thisUnit['weaponProficiency'][thisUnit['weapon']["weaponType"]])
	  //console.log("Def.:",res,"=",ennemyUnit["resistance"][thisUnit['weapon']["attackType"]],"+",ennemyUnit["resistance"]["defense"],"+",ennemyUnit["resistance"]["phyDefense"]);
	}
  }
  for (let team in [team1, team2]) {
	for (let i = 0; i < [team1, team2][team].length; i++) {
	  [team1, team2][team][i] = [team1, team2][team][i].filter(
		(unit) => unit["health"] > 0
	  );
	}
	chooseAim([team1, team2][team], 1);
  }
  return team1, team2;
}

function battle(team1, team2) {
  let nbrT1 = 0;
  let nbrT2 = 0;
  team1.forEach((e1) => e1.forEach((e2) => (nbrT1 += 1)));
  team2.forEach((e1) => e1.forEach((e2) => (nbrT2 += 1)));
  var turn = 0;
  while (nbrT1 > 0 && nbrT2 > 0 && turn < 50) {
	team1, (team2 = fight(team1, team2));
	team1 = team1.filter((row) => row.length > 0);
	team2 = team2.filter((row) => row.length > 0);
	console.log(team1, team2);
	nbrT1 = 0;
	nbrT2 = 0;
	team1.forEach((e1) => e1.forEach((e2) => (nbrT1 += 1)));
	team2.forEach((e1) => e1.forEach((e2) => (nbrT2 += 1)));
	turn++;
  }
}

// Different AI difficulties depending on what stats they take for account to aim. The more stats it takes into account, the more precise it is.
// First level is just weapon.
// Second level is weapon and proficiency.
// Third levels is weapon, proficiency and attack type compared to ennemy defense type.
function chooseAim(team, level) {
  let aimList = [];
  if (level == 1) {
	for (let eachRow in team) {
	  let sumDamage = [0, 0, 0];
	  for (let eachUnit in team[eachRow]) {
		let thisUnit = team[eachRow][eachUnit];
		for (let eachRange in thisUnit["weapon"]["power"]) {
		  sumDamage[eachRange] += thisUnit["weapon"]["power"][eachRange];
		}
	  }
	  let maxDmg = 0;
	  // console.log(sumDamage);
	  for (let eachRange in sumDamage) {
		if (sumDamage[eachRange] > maxDmg) {
		  aimList[eachRow] = eachRange;
		  maxDmg = sumDamage[eachRange];
		}
	  }
	}
  } else if (level == 2) {
	for (let eachRow in team) {
	  let sumDamage = [0, 0, 0];
	  for (let eachUnit in team[eachRow]) {
		let thisUnit = team[eachRow][eachUnit];
		// console.log(thisUnit);
		for (let eachRange in thisUnit["weapon"]["power"]) {
		  sumDamage[eachRange] +=
			thisUnit["weapon"]["power"][eachRange] +
			thisUnit["weaponProficiency"][thisUnit["weapon"]["weaponType"]] +
			thisUnit["weaponProficiency"][thisUnit["weapon"]["attackStyle"]] +
			thisUnit["weaponProficiency"]["weapon"];
		  // console.log(sumDamage[eachRange]);
		}
	  }
	  let maxDmg = 0;
	  for (let eachRange in sumDamage) {
		if (sumDamage[eachRange] > maxDmg) {
		  aimList[eachRow] = eachRange;
		  maxDmg = sumDamage[eachRange];
		}
	  }
	}
  } else if (level == 3) {
	for (let eachRow in team) {
	  let sumDamage = [0, 0, 0];
	  for (let eachUnit in team[eachRow]) {
		let thisUnit = team[eachRow][eachUnit];
		// console.log(thisUnit);
		for (let eachRange in thisUnit["weapon"]["power"]) {
		  sumDamage[eachRange] +=
			thisUnit["weapon"]["power"][eachRange] +
			thisUnit["weaponProficiency"][thisUnit["weapon"]["weaponType"]] +
			thisUnit["weaponProficiency"][thisUnit["weapon"]["attackStyle"]] +
			thisUnit["weaponProficiency"]["weapon"];
		  let totalRes = 0;
		  team2[eachRange].forEach((e1) => {
			totalRes += e1["resistance"][thisUnit["weapon"]["attackType"]];
		  });
		  totalRes /= team2[eachRange].length;
		  sumDamage[eachRange] +=
			thisUnit["attacks"][thisUnit["weapon"]["attackType"]] - totalRes;
		  // console.log(sumDamage[eachRange]);
		}
	  }
	  let maxDmg = 0;
	  for (let eachRange in sumDamage) {
		if (sumDamage[eachRange] > maxDmg) {
		  aimList[eachRow] = eachRange;
		  maxDmg = sumDamage[eachRange];
		}
	  }
	}
  }
  return aimList;
}

function computePortage() {
	let portage = 0;
	let portageNeeded = 0;
	for (const index in inventory) {
		if (allItems[index]['type'] === "mount") {
			portage += inventory[index]['volume'] * allItems[index]['carryValue'];
		}
		else if (allItems[index]['type'] === "carrier") {
			portage += inventory[index]['volume'] * allItems[index]['carryValue'];
		}
		portageNeeded += inventory[index]['volume'] * allItems[index]['weight'];
	}
	for (const carry of gatherer['carrier']) {
		portage += carry['carryValue'];
	}
	return [portage, portageNeeded];
}

function tableCreate(node) {
	tbl = document.createElement('table');
	tbl.style.width = '100%';
	tbl.style.height = '100%';
	tbl.style.border = '1px solid black';

	console.log(gatherer)
  
	for (let i = 1; i < 4; i++) {
		const tr = tbl.insertRow();
		const td = tr.insertCell();
		td.appendChild(document.createTextNode(`Row ${3 - i + 1}`));
		td.classList.add("armyRowCell");
		for (let unit in gatherer["row"+i]) {
			const td = tr.insertCell();
			td.style.width = '15vw';
			td.appendChild(document.createTextNode(gatherer["row"+i][unit]['name']));
			td.classList.add("unitCell");
	  }
	}
	node.appendChild(tbl);
  }

function manageBattle() {
	console.log("MANAGE BATTLE");

	let actionBar = document.getElementById("actionMenu");
	document.getElementById("center-image").classList.add("hidden");

	let middleMenu = document.getElementById("middle menu");
	let playerSide = document.createElement("div");
	playerSide.classList.add("unitList");
	let enemySide = document.createElement("div");
	enemySide.classList.add("unitList");
	middleMenu.appendChild(playerSide);
	middleMenu.appendChild(enemySide);
	tableCreate(playerSide);

	let titleText = document.createElement("p");
	titleText.textContent = "TURN 1";
	actionBar.appendChild(titleText);
}

function yourTurn(phase) {
  console.log("YOUR TURN");
  var node = document.getElementById("actionMenu");
  if (phase == "special") {
	var newButton = document.createElement("button");
	tempIDs.push("yourTurn_trade");
	newButton.setAttribute("id", "yourTurn_trade");
	newButton.textContent = "Trade";
	node.appendChild(newButton);
	newButton.addEventListener("click", function () {
	  changeMenu(this.id);
	});
  } else if (phase == "crewAssignment") {
	tempIDs.push("yourTurn_deploy");
	var newButton = document.createElement("button");
	newButton.setAttribute("id", "yourTurn_deploy");
	newButton.textContent = "Deploy units";
	node.appendChild(newButton);
	newButton.addEventListener("click", function () {
	  changeMenu(this.id);
	});
  } else if (phase == "gathering") {
	tempIDs.push("yourTurn_gather");
	var newButton = document.createElement("button");
	newButton.setAttribute("id", "yourTurn_gather");
	newButton.addEventListener("click", function () {
	  changeMenu(this.id);
	});
	newButton.textContent = "Gather ressources";
	node.appendChild(newButton);
  } else if (phase == "fight") {
	yourTurn("travel");
  } else if (phase == "travel") {
	var node = document.getElementById("actionMenu");

	tempIDs.push("travelQuestion");
	var newText = document.createElement("p");
	newText.setAttribute("id", "travelQuestion");
	newText.textContent = "Would you like to move?";
	node.appendChild(newText);
	newText.addEventListener("click", function () {
	  changeMenu(this.id);
	});
	const computation = computePortage();
	console.log(computation);
	if (computation[0] >= computation[1]) {
		tempIDs.push("yourTurn_travel");
		var newButton = document.createElement("button");
		newButton.setAttribute("id", "yourTurn_travel");
		newButton.textContent = "Travel";
		node.appendChild(newButton);
		newButton.addEventListener("click", function () {
		  changeMenu(this.id);
		});}
	tempIDs.push("yourTurn_Stay");
	var newButton = document.createElement("button");
	newButton.setAttribute("id", "yourTurn_Stay");
	newButton.textContent = "Stay";
	node.appendChild(newButton);
	newButton.addEventListener("click", function () {
	  changeMenu("uSure", [
		["ressourcesConsumption", false],
		["travel", "false"],
	  ]);
	});
  }
}

// Function: Erases all previously created buttons with certain id.
function erasePreviousDestinations() {
  // querySelectorAll : search for all entry in document with selected arguments
  // arguments here are Id start with 'dest_'
  // forEach takes each element returned by the query and remove them.
  // e is each element and it applies what's after => to the e
  document.querySelectorAll('[id^="dest_"]').forEach((e) => e.remove());
}

function turnX() {
  ["turnX", "turnX_button"].forEach((e) => tempIDs.push(e));

  var node = document.getElementById("actionMenu");

  var newText = document.createElement("h1");
  newText.setAttribute("id", "turnX");
  newText.textContent = "Turn " + String(numberOfTurns);

  var newButton = document.createElement("button");
  newButton.setAttribute("id", "turnX_button");
  newButton.innerHTML = "Next";
  newButton.addEventListener("click", function () {
	changeMenu("special");
  });

  node.appendChild(newText);
  node.appendChild(newButton);
  // Define next caravan ressources evolution depending on the needs of the crew members.
  ["water", "money", "food"].forEach((e) => {
	let bonusNode = document.getElementById("bonus_" + e);
	bonus = 0;
	crewMembers.forEach((e2) => {
	  if (e in e2["needs"]) {
		bonus -= e2["needs"][e] - e2["passiveEarning"][e];
	  } else {
		crewMembers.forEach((e2) => (bonus += e2["passiveEarning"][e]));
	  }
	});
	if (bonus >= 0) {
	  bonus = "+" + bonus;
	  bonusNode.style.color = "green";
	} else {
	  bonusNode.style.color = "red";
	}
	bonusNode.innerHTML = String(bonus);
  });
  statusTurn = "deployUnits";
}

function areUSure(directions) {
  var node = document.getElementById("actionMenu");

  tempIDs.push("uSureText");
  var newText = document.createElement("h2");
  newText.textContent = "Are you sure?";
  newText.setAttribute("id", "uSureText");
  node.appendChild(newText);

  var horizonzalNode = document.createElement("div");
  horizonzalNode.setAttribute("id", "horizonzalNode");
  node.appendChild(horizonzalNode);

  tempIDs.push("yesButton");
  var newButton = document.createElement("button");
  newButton.setAttribute("id", "yesButton");
  newButton.textContent = "Yes";
  horizonzalNode.appendChild(newButton);
  newButton.addEventListener("click", function () {
	changeMenu(directions[0][0], directions[0][1]);
  });
  newButton.classList.add("smallerButton");
  tempIDs.push("noButton");
  var newButton = document.createElement("button");
  newButton.setAttribute("id", "noButton");
  newButton.textContent = "No";
  newButton.classList.add("smallerButton");
  horizonzalNode.appendChild(newButton);
  newButton.addEventListener("click", function () {
	changeMenu(directions[1][0], directions[1][1]);
  });
}

// Function: Change player location and do what has to been done after the movement
// TO BE MODIFIED -> maybe not the same inner HTML
function changeLocation(button_id) {
  console.log("CHANGE LOCATION");
  // slice (cut the string in several part, here it deletes the 5 first caracters) the button id to get the right string.
  playerLocation = JSON.parse(
	JSON.stringify(returnLocationData(button_id.slice(5)))
  );
  document.getElementById("locationName").textContent = playerLocation["name"];
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
		let luck = playerLocation["possibleDestinations"][i]["luck"];
		gatherer['scout'].forEach(e => luck += e['vision'] / 10);
		if (luck >= Math.random()) {
				possibleDestinations.push(returnLocationData(playerLocation["possibleDestinations"][i]["type"])
			);
		}
	}

  var horizonzalNode = document.createElement("div");
  horizonzalNode.setAttribute("id", "horizonzalNode");
  node.appendChild(horizonzalNode);
  console.log(possibleDestinations);
  for (var i = 0; i < possibleDestinations.length; i++) {
	possibleDestinationText.innerHTML =
	  possibleDestinationText.innerHTML + possibleDestinations[i]["name"];
	if (i < possibleDestinations.length - 1) {
	  possibleDestinationText.innerHTML =
		possibleDestinationText.innerHTML + ", ";
	}
	var newDestination = document.createElement("img");
	newDestination.src =
	  "../Images/" + possibleDestinations[i]["type"] + ".png";
	newDestination.style.height = "100px";
	newDestination.style.width = "100px";
	newDestination.style.margin = "10px";
	horizonzalNode.appendChild(newDestination);
	newDestination.setAttribute(
	  "id",
	  "dest_" + possibleDestinations[i]["type"]
	);
	buttonID = "dest_" + possibleDestinations[i]["type"];
	tempIDs.push(buttonID);
	newDestination.addEventListener("click", function () {
	  changeLocation(this.id);
	});
  }
}

function changeTextNarration() {
  console.log("Change Text");
  text = document.getElementById("narration_text");
  if (++currentTextPos >= textList["id_" + String(currentTextNumber)].length) {
	removeTempIDs();
	centerImage = document.getElementById("center-image");
	centerImage.src = "../Images/Illustration.jpg";
	changeMenu("turnX");
  } else if (
	currentTextPos ==
	textList["id_" + String(currentTextNumber)].length - 1
  ) {
	document.getElementById("narration_button").innerHTML = "End";
  }
  text.textContent =
	textList["id_" + String(currentTextNumber)][currentTextPos];
}

function killPeople(numberOfDeath) {
  console.log("Death", numberOfDeath);
  for (let i = 0; i<numberOfDeath; i++) {
	randIndex = Math.floor(Math.random() * crewTotal.length);
	let unit = crewTotal[randIndex];
	crewTotal = crewTotal.filter(item => item !== unit);
	crewMembers = crewMembers.filter(item => item !== unit);
	for (let job in gatherer) {
		gatherer[job] = gatherer[job].filter(item => item !== unit);}
	}
}

function foodConsumption () {
	let foodConsumption;
	return foodNbr;
}

function manageEndTurnEvent () {
	if (!playerLocation['doEnemySpawn']) {
		return changeMenu("turnX");
	}
	if (numberOfTurns > -1) {
		let pBattle = 1;
		pBattle += (crewTotal.length) / 100;
		let pRandom = Math.random();
		if (pRandom < pBattle) {
			manageArmy();
		}
	}
	return changeMenu("turnX");
}

function ressourcesConsumption(doTravel) {
	console.log("Crew Total", crewTotal, famineTurns);
	var waterConsumption = 0;
	crewTotal.forEach((e) => (waterConsumption += e["needs"]["water"]));
	var foodConsumption = 0;
	crewTotal.forEach((e) => (foodConsumption += e["needs"]["food"]));
	console.log("Consumptions: water", waterConsumption, "food", foodConsumption);
	if (doTravel) {
		water -= waterConsumption;
	} else {
		water -= Math.floor(waterConsumption / 2);
	}
	// Check if player has enough food to feed all of the crew.
	let tempsFC = foodConsumption;
	for (let i in inventory) {
		if (allItems[i]['type'] == "food") {
			let neededVolume = Math.ceil(tempsFC / allItems[i]['foodValue']);
			tempsFC -=  allItems[i]['foodValue'] * Math.min(neededVolume, inventory[i]['volume']);
			if (tempsFC == 0) {break;}
		}
	}
	// If yes it feeds all of the crew, that's why there is two times the same 'function'
	if (tempsFC == 0) {
		for (let i in inventory) {
			if (allItems[i]['type'] == "food") {
				let neededVolume = Math.ceil(foodConsumption / allItems[i]['foodValue']);
				foodConsumption -=  allItems[i]['foodValue'] * Math.min(neededVolume, inventory[i]['volume']);
				inventory[i]['volume'] -= Math.min(neededVolume, inventory[i]['volume']);
				if (foodConsumption == 0) {break;}
			}
		}
	// Bc otherwise it doesn't feed them at all and you get to keep the food for the next turn.
	} else {
		console.log("Famine", foodConsumption);
		famineTurns += 1;
		morale -= 10; // 10 ?? get someone to check that
		killPeople(Math.pow(2, famineTurns) - 2);
	}
  morale /= 1.05;
  if (water <= 0) {
	console.log("Water", waterConsumption);
	killPeople(water * -1);
	water = 0;
  }
  if (crewTotal.length <= 0) {
	return changeMenu("Defeat", "Death");
  }
  if (morale < 0) {
	if (authority > morale * 1 + 1) {
	  morale = 1;
	  authority += morale;
	} else {
	  return changeMenu("Defeat", "Revolt");
	}
  }
  numberOfTurns++;
  updateRessourcesDisplay();
  console.log(inventory);
  return manageEndTurnEvent();
}

function gatherResolution() {
  console.log("Gather Resolution !");
  ["continueButton"].forEach((e) => tempIDs.push(e));
  let i = 0;
  for (let ressources in playerLocation['gatheringValues']) {
	ressources = ressources.substring(0, ressources.length - 5);
	if (gatherer[ressources].length != 0) {
	  break;
	} else {
	  i++;
	}
  }
  if (i == Object.keys(playerLocation['gatheringValues']).length) {
	var ressourceObtained = document.createElement("p");
	ressourceObtained.innerHTML =
	  "No one was assigned to ressource gathering this turn!";
	ressourceObtained.setAttribute("id", "nothingObtained");
	document.getElementById("actionMenu").appendChild(ressourceObtained);
	tempIDs.push("nothingObtained");
  }

  for (let ressources in playerLocation['gatheringValues']) {
	ressources = ressources.substring(0, ressources.length - 5);
	if (gatherer[ressources].length == 0) {
	  continue;
	}
	var ressourceObtained = document.createElement("p");
	var newRessources = 0;
	for (let eachGatherer in gatherer[ressources]) {
		eachGatherer = gatherer[ressources][eachGatherer];
		console.log("Gatherer", eachGatherer);
		newRessources += playerLocation["gatheringValues"][ressources + "Yield"] * (eachGatherer['skills']['gatheringFactor'] + eachGatherer['skills'][ressources+'GatheringFactor'])
		+ eachGatherer['skills']['gatheringAbs']
		+ eachGatherer['skills'][ressources+'GatheringAbs'];
	}
	
	ressourceObtained.innerHTML =
	  String(newRessources) +
	  " " +
	  Capitalize(ressources) +
	  " obtained from " +
	  gatherer[ressources].length +
	  " people !";
	ressourceObtained.setAttribute("id", ressources + "Obtained");
	document.getElementById("actionMenu").appendChild(ressourceObtained);
	tempIDs.push(ressources + "Obtained");

	// Depletion
	playerLocation["gatheringValues"][ressources + "Yield"] -= 1;

	if (ressources == "morale") {
	  morale += parseInt(newRessources);
	} else if (ressources == "water") {
	  water += parseInt(newRessources);
	} else if (ressources == "food") {
	  inventory[1]['volume'] += parseInt(newRessources);
	}
  }

  var continueButton = document.createElement("button");
  continueButton.addEventListener("click", function () {
	manageCarrier();
  });
  continueButton.setAttribute("id", "continueButton");
  continueButton.innerHTML = "Continue";
  document.getElementById("actionMenu").appendChild(continueButton);
	statusTurn = "deployUnits";
}

function manageDeployDistribution() {
  saveSessionStorage();
  window.location.href = "../mainPage/AttributionPage/roleAttribution.html";
}


function Defeat(option) {
  tempIDs.push("dyingText");
  var dyingText = document.createElement("p");
  dyingText.setAttribute("id", "dyingText");
  dyingText.innerHTML = `You died on turn ${String(numberOfTurns)}.`;
  document.getElementById("actionMenu").appendChild(dyingText);
}

function manageTrade() {
  saveSessionStorage();
  window.location.href = "../mainPage/shopPage/shop.html";
}

function manageCarrier() {
	statusTurn = "deployCarrier";
	saveSessionStorage();
	window.location.href = "../mainPage/AttributionPage/roleAttribution.html";
}

function manageArmy() {

	statusTurn = "fight";
	saveSessionStorage();
	window.location.href = "../mainPage/AttributionPage/roleAttribution.html";

	let enemyTypeRand = Math.random();
	for (let enemyType in playerLocation['enemyType']) {
		if (enemyTypeRand <= playerLocation['enemyType'][eachType]) {
			break;
		}
	}

	let numberOfEnnemy = 0;
	if (enemyType == "bandit") {
		numberOfEnnemy = Math.getRandomIntInclusive(5, Math.max(7, Math.round(crewTotal.length/4)))
	}
	

	for (let i = 0; i < numberOfEnnemy; i++) {
		groupOfEnemies[Math.floor(Math.random() * 3)].push()
	}


	tempIDs.push("ennemyApprochingText");
	var ennemyApprochingText = document.createElement("p");
	ennemyApprochingText.setAttribute("id", "ennemyApprochingText");
	ennemyApprochingText.textContent = "Ennemy in sight: a group of bandits is approaching you.";
	node.appendChild(ennemyApprochingText);

	tempIDs.push("deployArmy");
	var deployArmy = document.createElement("button");
	deployArmy.setAttribute("id", "deployArmy");
	deployArmy.textContent = "Deploy Army";
	node.appendChild(deployArmy);

	deployArmy.addEventListener("click", function () {
	  statusTurn = "fight";
		saveSessionStorage();
		window.location.href = "../mainPage/AttributionPage/roleAttribution.html";
	});
	
}

function changeMenu(newMenu = "None", option = null) {
  updateRessourcesDisplay();
  removeTempIDs();
  if (newMenu == "turnX") {
	return turnX();
  }
  if (newMenu == "special") {
	if (playerLocation["isTradable"]) {
	  return yourTurn("special");
	} else {
	  return changeMenu("crewAssignment");
	}
  }
  if (newMenu == "yourTurn_trade") {
	return manageTrade();
  }
  if (newMenu == "crewAssignment") {
	return yourTurn("crewAssignment");
  }
  if (newMenu == "yourTurn_deploy") {
	return manageDeployDistribution();
  }
  if (newMenu == "gathering") {
	return yourTurn(newMenu);
  }
  if (newMenu == "yourTurn_gather") {
	return changeMenu("gatherResolution");
  }
  if (newMenu == "gatherResolution") {
	return gatherResolution();
  }
  if (newMenu == "travel") {
	return yourTurn(newMenu);
  }
  if (newMenu == "uSure") {
	return areUSure(option);
  }
  if (newMenu == "yourTurn_travel") {
	return defineNewDestinations(changeMenu);
  }
  if (newMenu == "ressourcesConsumption") {
	return ressourcesConsumption(option);
  }
  if (newMenu == "Defeat") {
	return Defeat(option);
  } else if (newMenu.slice(0, 5) == "dest_") {
	changeLocation(newMenu, defineNewDestinations);
  }
}

onLoad();

// renders the invntory items as they would be seen in the inventory page
function renderItems(filterType = 'all') {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Clear previous items

    inventory.forEach(item => {
        if (filterType === 'all' || item.type === filterType) {
            //creates the itembox
            const itemElement = document.createElement('div');
            //harvests rarity variable to assign color later
            itemElement.className = `inventory-item rarity-${item.rarity.toLowerCase()}`;
            
            //adds item img to the grid item card
            const imgElement = document.createElement('img');
            imgElement.src = item.imgFile;
            imgElement.alt = item.name;
            itemElement.appendChild(imgElement);

            //adds title
            const titleElement = document.createElement('div');
            titleElement.className = 'item-title';
            titleElement.textContent = item.name;
            itemElement.appendChild(titleElement);

            //adds the info button for each item
            //there is probably a better way to do this but idk
            const infoImg = document.createElement('img');
            infoImg.src = "info.png"; 
            infoImg.alt = "Info";
            infoImg.className = 'info-img';
            itemElement.appendChild(infoImg);
            
            //creates extra info element that is presented during hover
            const extraInfoElement = document.createElement('div');
            extraInfoElement.className = 'extra-info';
            //this line formats the info presented during hover
            //added the assigned to element to the extra info, the spacing needs to be fixed
            extraInfoElement.innerHTML = `Type: ${item.type}<br>Description: ${item.description}<br>Quantity: ${item.quantity}<br>Value: ${item.value}<br>Assigned To:${item.assignedTo}`;
            itemElement.appendChild(extraInfoElement);

            //removes title,img,info button during hover over info button
            infoImg.addEventListener('mouseenter', () => {
                infoImg.style.display = 'none';
                extraInfoElement.style.display = 'block';
                titleElement.style.display='none';
                imgElement.style.display='none';
            });
            //redisplayes the title img,info button after hover, while hiding extra info
            infoImg.addEventListener('mouseleave', () => {
                infoImg.style.display = 'block';
                extraInfoElement.style.display = 'none';
                titleElement.style.display='block';
                imgElement.style.display='block';
            });

            itemList.appendChild(itemElement);
        }
    });
}

// This will make the inventory appear when the inventory button is pressed
const inventoryButton = document.getElementById('inventoryButton');
const inventoryPage = document.getElementById('inventoryPage');

inventoryButton.addEventListener('click', function() {
    inventoryPage.classList.toggle('hidden');
    inventoryPage.classList.toggle('visible');
});

//THE INVENTORY BUTTON DOESNT FUCKING WORK ANYMORE AHHHHHHHHHHHHHHHHHHH
inventoryButton.addEventListener('click', function() {
    console.log('Inventory button clicked'); // Check if the event listener callback is executed
    // Rest of the code for toggling the inventory page
});




