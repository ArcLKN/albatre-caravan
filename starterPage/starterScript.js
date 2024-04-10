function save(varName, value) {
  console.log(typeof value);
  if (typeof value == "number") {
    value = String(value);
  } else if (typeof value == "object") {
    value = JSON.stringify(value);
  } else if (typeof value == "boolean") {
    value = String(value);
  }

  sessionStorage.setItem(String(varName), value);
}

var listOfNames = {
  firstname: {
    male: [
    	"Abbas",
    	"Abraxas",
    	"Ahmosis",
    	"Akhenaton",
		"Arienkhut",
		"Atum",
		"Atem",
		"Aten",
		"Aton",
		"Asar",
		"Amun",
		"Amon",
		"Amonet",
		"Amon-Tet",
		"Amon-Ra",
		"Ammon",
		"Amenhemti",
		"Amenemhat",
		"Amenemap",
		"Amenhotep",
		"Asim",
		"Anubis",
		"Anoubis",
		"Apis",
		"Anapa",
		"Apries",
		"Apmatenu",
		"Babafemi",
		"Boubou",
		"Cheres",
		"Chaths",
		"Djehuti",
		"Ethan",
		"Eate",
		"Euphrate",
		"Fouad",
		"Hagar",
		"Horus",
		"Geb",
		"Hapi",
		"Horos",
		"Horus",
		"Hebunurotant",
		"Heru",
		"Iah",
		"Imhotep",
		"Jonathan",
		"Kemet",
		"Khet-ef",
		"Khem",
		"Karnak",
		"Kher-ab",
		"Kauib",
		"Koush",
		"Koushi",
		"Khnum",
		"Khonsu",
		"Ludim",
		"Madu",
		"Mehemet",
		"Mehmed",
		"Melek",
		"Menthesuphis",
		"Moss",
		"Menkara",
		"Mbizi",
		"Mesochris",
		"Montu",
		"Naouscheri",
		"Nu",
		"Nakht",
		"Nezemab",
		"Nahab",
		"Onnophris",
		"Onouphrios",
		"Onuphrius",
		"Osiris",
		"Ptah",
		"Pisem",
		"Philitis",
		"Petsibast",
		"Ra",
		"Ramsès",
		"Re",
		"Raphael",
		"Rashaken",
		"Ubaid",
		"Stephinates",
		"Sua",
		"Sutekh",
		"Serapis",
		"Seth",
		"Snerseth",
		"Sethi",
		"Senusnet",
		"Sobek",
		"Thoutmosis",
		"Thoth",
		"Toutankharton",
		"Toutankhamon",
		"Vizir",
		"Yamanu",
		"Yinepu"
    ],
    female: [
    	"Âat",
    	"Âhaneith",
    	"Ahathoor",
		"Aziza",
		"Amonet",
		"Amunet",
		"Amaunet",
		"Ahmsès",
		"Ahmès",
		"Ammit",
		"Anuket",
		"Anukis",
		"Anouke",
		"Auset",
		"Ankt",
		"Ashayet",
		"Bast",
		"Bastet",
		"Baset",
		"Chepsout",
		"Chione",
		"Cléo",
		"Cléopâtre",
		"Djefatnebty",
		"Djéseret",
		"Esi",
		"Hatchepsout",
		"Hathor",
		"Hénouttamehou",
		"Henhenet",
		"Hénoutsen",
		"Henouttaneb",
		"Hétephernebty",
		"Hétepti",
		"Heqet",
		"Hereret",
		"Hut-Heru",
		"Hibis",
		"Imeret",
		"Imentet",
		"Inenek",
		"Inhapy",
		"Iset",
		"Iside",
		"Isis",
		"Iunit",
		"Iusaaset",
		"Ízisz",
		"Joanne",
		"Jamila",
		"Junit",
		"Khénémet",
		"Khenout",
		"Kiya",
		"Maat",
		"Ma'at",
		"Mafdet",
		"Mehet-weret",
		"Menhit",
		"Menka",
		"Mérésânkh",
		"Meret",
		"Méretnebty",
		"Meretseger",
		"Meskhenet",
		"Moutnofret",
		"Mut",
		"Meritamon",
		"Mérytamon",
		"Mesbet",
		"Moutnedjemet",
		"Myrrhe",
		"Naunet",
		"Nebethetepet",
		"Nebet-Hut",
		"Nebtou",
		"Nebtuwi",
		"Nebty",
		"Neferou",
		"Neferou-Ptah",
		"Neferoure",
		"Nefertkaou",
		"Neferousobek",
		"Neferoupito",
		"Neferupito",
		"Neferet",
		"Neferhetepes",
		"Nefti",
		"Nehmetawy",
		"Neith",
		"Nit",
		"Nitocris",
		"Nuit",
		"Nuru",
		"Nour",
		"Nanu",
		"Nefertari",
		"Nefertiti",
		"Neyla",
		"Nephthys",
		"Neferoubity",
		"Nubie",
		"Pakhet",
		"Qetesh",
		"Raet",
		"Raet-tawy",
		"Ranpatnafrat",
		"Renenutet",
		"Sais",
		"Shai",
		"Shait",
		"Saosis",
		"Safiya",
		"Satre",
		"Satet",
		"Sit-aah",
		"Selk",
		"Selket",
		"Sekhmet",
		"Semat",
		"Sénet",
		"Serket",
		"Seshat",
		"Salifa",
		"Sagira",
		"Sua",
		"Sopdet",
		"Sothis",
		"Talibah",
		"Taweret",
		"Thebe",
		"Tabia",
		"Tefnut",
		"Tenenet",
		"Thermuthis",
		"Thoueris",
		"Yamanut"
    ],
  },
  surname: ["Joestar", "Neith"],
};

specialNames = [
  "Amen",
  "Ammon",
  "Amon",
  "Amonet",
  "Amonet",
  "Amon-Ra",
  "Amun",
  "Amunet",
  "Anapa",
  "Anoubis",
  "Anubis",
  "Apis",
  "Asar",
  "Atem",
  "Aten",
];

baseUnit = {
	id: 0,
	name: "",
	gender: null,
	age: null,
	max_health: 10,
	health: 10,
	attacks : {
		damageAbs: 0,
		piercing: 0,
		slashing: 0,
		melee: 0,
		distance: 0,
		elemental: 0,
		blunt: 0,
		poison: 0,
		fire: 0,
		ice: 0
	},
	resistance: {
		defense: 0,
		phyDefense: 0,
		elemDefense: 0,
		piercing: 0,
		slashing: 0,
		blunt: 0,
		poison: 0,
		fire: 0,
		ice: 0
	},
	skills: {
		gatheringFactor: 1,
		gatheringAbs: 0,
		foodGatheringAbs: 0,
		waterGatheringAbs: 0,
		moraleGatheringAbs: 0,
		foodGatheringFactor: 1,
		waterGatheringFactor: 1,
		moraleGatheringFactor: 1
	},
	special: {
		hungry: false, // Needs two times more food.
		drought: false, // Needs two times more water.
		ascetic: false, // Doesn't gain pleasure from going outside, but will not die from famine < 3.
		faithful: false, // Will not be part of the revolt if there is one.
		lucky: false, // Will always find one more ressource.
		entertainer: false, // Will give one free moral each turn.
		dowser: false, // Give one water each turn.
		sick: false, // Less max health or more easily sick. Sickness event.
		archer: false,
		warrior: false,
		protector: false,
		healthy: false,
		mummy: false, // Doesn't need anything.
		lancer: false,
		swordsman: false,
		farmer: false,
		strong: false,
		normie: false,
	},
	needs: {
		water: 1,
		food: 1,
		morale: 1
	},
	passiveEarning : {
		morale: 0,
		food: 0,
		money: 0,
		water: 0
	},
	weaponProficiency: {
		weapon: 0,
		melee: 0,
		distance: 0,
		sword: 0,
		lance: 0,
		bow: 0,
		mace: 0
	},
	weapon: {
		name: "hand",
		power: [1, 0, 0],
		attackType: "blunt",
		weaponType: "mace",
		attackStyle: "melee"
	},
	injuries: 0
}

var luckTrait = [0.6, 0.7, 0.8, 0.9, 0.95];

var genderArr = ["male", "female"];

function manageSpecials(unit, trait) {
	// console.log(unit['special'][special]);
	if (trait == "hungry") {
		unit['needs']['food'] += 1;
	}
	else if (trait == "drought") {
		unit['needs']['water'] += 1;
	}
	else if (trait == "ascetic") {
		unit['skills']['moraleGatheringFactor'] = 0;
	}
	else if (trait == "faithful") {}
	else if (trait == "lucky") {
		unit['skills']['gatheringAbs'] += 1;
	}
	else if (trait == "entertainer") {
		unit['passiveEarning']['morale'] += 1;
	}
	else if (trait == "dowser") {
		unit['passiveEarning']['water'] += 1;
	}
	else if (trait == "sick") {
		unit['health'] -= 2;
	}
	else if (trait == "archer") {
		unit['weaponProficiency']['bow'] += 1;
	}
	else if (trait == "warrior") {
		unit['attacks']['damageAbs'] += 1;
		unit['resistance']['phyDefense'] += 1;
		unit['weaponProficiency']['melee'] += 1;
	}
	else if (trait == "protector") {
		unit['resistance']['defense'] += 1;
		unit['resistance']['phyDefense'] += 1;
		unit['health'] += 5;
	}
	else if (trait == "healthy") {
		unit['health'] += 2;
	}
	else if (trait == "mummy") {
		unit['needs']['water'] = 0;
		unit['needs']['morale'] = 0;
		unit['needs']['food'] = 0;
	}
	else if (trait == "spearman") {
		unit['attacks']['piercing'] += 1;
		unit['weaponProficiency']['spear'] += 1;
	}
	else if (trait == "swordsman") {
		unit['attacks']['slashing'] += 1;
		unit['weaponProficiency']['sword'] += 1;
	}
	else if (trait == "farmer") {
		unit['skills']['foodGatheringAbs'] += 1;
	}
	else if (trait == "strong") {
		unit['skills']['waterGatheringAbs'] += 1;
		unit['health'] += 2;
		unit['attacks']['damageAbs'] += 1;
		unit['resistance']['defense'] += 1;
	}
	else if (trait == "fragile") {
		unit['resistance']['phyDefense'] -= 1;
	}
	else if (trait == "weak") {
		unit['resistance']['phyDefense'] -= 1;
		unit['resistance']['defense'] -= 1;
	}
	else if (trait == "aggressive") {
		unit['resistance']['phyDefense'] -= 1;
		unit['weaponProficiency']['melee'] += 1;
	}
	else if (trait == "coward") {
		unit['resistance']['phyDefense'] += 1;
		unit['weaponProficiency']['melee'] -= 1;
	}
	else if (trait == "depressed") {
		unit['skills']['moraleGatheringAbs'] -= 1;
		unit['needs']['morale'] += 1;
	}
	else if (trait == "unlucky") {
		unit['skills']['gatheringAbs'] -= 1;
	}
	else if (trait == "clumsy") {
		unit['skills']['foodGatheringAbs'] -= 1;
		unit['skills']['waterGatheringAbs'] -= 1;
		unit['weaponProficiency']['weapon'] -= 1;
	}
	else if (trait == "cheerful") {
		unit['skills']['moraleGatheringAbs'] += 1;
	}
	else if (trait == "optimistic") {
		unit['needs']['morale'] -= 1;
		unit['passiveEarning']['morale'] += 1;
	}
	else if (trait == "pesimistic") {
		unit['needs']['morale'] -= 1;
		unit['passiveEarning']['morale'] -= 1;
	}
	else if (trait == "charming") {
		unit['skills']['moraleGatheringAbs'] += 1;
		unit['passiveEarning']['morale'] += 1;
		unit['resistance']['phyDefense'] += 1;
	}
	else if (trait == "exhausted") {
		unit['skills']['GatheringAbs'] += 1;
		unit['resistance']['defense'] -= 1;
		unit['attacks']['damageAbs'] -= 1;
	}
	else if (trait == "chivalrous") {
		unit['resistance']['defense'] += 1;
		unit['weaponProficiency']['melee'] += 1;
		unit['health'] += 2;
	}
	else if (trait == "weapon master") {
		unit['weaponProficiency']['weapon'] += 1;
	}
	else if (trait == "heartless") {
		unit['attacks']['damageAbs'] += 1;
		unit['passiveEarning']['morale'] -= 1;
	}
	return unit;
}

var specialsTraits = [
	"hungry", // Needs two times more food.
	"drought", // Needs two times more water.
	"ascetic", // Doesn't gain pleasure from going outside, but will not die from famine < 3.
	"faithful", // Will not be part of the revolt if there is one.  // TBA
	"lucky", // Will always find one more ressource.
	"entertainer", // Will give one free moral each turn.
	"dowser", // Give one water each turn.
	"sick", // Less max health or more easily sick. Sickness event.  // TBA
	"archer",
	"warrior",
	"protector",
	"healthy",
	"mummy", // Doesn't need anything.
	"spearman",
	"swordsman",
	"farmer",
	"strong",
	"normie",
	"fragile",
	"weak",
	"brave", // Doesn't lose morale after fight maybe.  // TBA
	"aggressive",
	"coward",
	"depressed",
	"unlucky",
	"clumsy",
	"cheerful",
	"optimistic",
	"pesimistic",
	"charming",
	"exhausted",
	"chivalrous",
	"weapon master",
	"hard-working", // TBA
	"heartless"
]

function createCharacter () {
	var newUnit = JSON.parse(JSON.stringify(baseUnit));
	newUnit['id'] = "id" + Math.random().toString(16).slice(2);
	newUnit["gender"] = genderArr[Math.floor(genderArr.length * Math.random())];
	newUnit["name"] = listOfNames["firstname"][newUnit["gender"]][Math.floor(listOfNames["firstname"][newUnit["gender"]].length * Math.random())];
	newUnit["age"] = 18 + Math.floor(60 * Math.random());
	if (newUnit['age'] > 65) {newUnit['health'] -= 1;}
	for (let i=0; i < luckTrait.length; i++) {
			if (Math.random() > luckTrait[i]) {
				let newTrait = specialsTraits[Math.floor(specialsTraits.length * Math.random())]
				newUnit['special'][newTrait] = true;
				manageSpecials(newUnit, newTrait);
			};
	}
	newUnit = manageSpecials(newUnit);
	newUnit['max_health'] = newUnit["health"];
	return newUnit;
}

var baseCrewNumber = 10;
var crewMembers = [];

for (i = 0; i < baseCrewNumber; i++) {
  crewMembers.push(createCharacter());
}

// Define starting values.
function initSessionStorage() {
  save("crewMembers", crewMembers);
  // Number of people player has, thus number of people he can use.
  save("crewTotal", 10);
  // Distribution of the crew, the total can't be > crewTotal.
  save("crewTypes", { scouts: 0, guards: 0, carriers: 0 }); // Free crew can become carriers to carry more goods.
  save("idleCrew", 10); // Number of remaining people to distribute.
  save("morale", 10);
  save("money", 10);
  save("authority", 10);
  save("water", 10);
  save("numberOfTurns", 0);
  save("famineTurns", 0);
  save("inventory", [{ name: "food", quantity: 0 }]);
  save("playerLocation", {
    type: "desert",
    name: "Desert",
    isTradable: false,
    description: "Bunch of sand.",
    gatheringValues: {},
    possibleEvents: [],
    possibleDestinations: [
      { type: "village", luck: 0.1 },
      { type: "nil_shore", luck: 1 },
      { type: "desert", luck: 1 },
      { type: "oasis", luck: 0.1 },
      { type: "desert_city", luck: 0.1 },
    ],
  });
  save("gatherer", { water: 0, food: 0, morale: 0 });
}

function goPlay() {
  window.location.href = "../cinematicPage/cinematic.html";
}

document.getElementById("play").onclick = goPlay;
initSessionStorage();
