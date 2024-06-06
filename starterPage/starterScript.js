function save(varName, value) {
  if (typeof value == "number") {
    value = String(value);
  } else if (typeof value == "object") {
    value = JSON.stringify(value);
  } else if (typeof value == "boolean") {
    value = String(value);
  }

  sessionStorage.setItem(String(varName), value);
}

let listCrewImages = {
  male: 37,
  female: 51,
};

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
      "Apophis",
      "Anapa",
      "Apries",
      "Apmatenu",
      "Babafemi",
      "Boubou",
      "Chepseskaf",
      "Cheres",
      "Chaths",
      "Dedoun",
      "Djehuti",
      "Ethan",
      "Eate",
      "Euphrate",
      "Fouad",
      "Hagar",
      "Horus",
      "Geb",
      "Gizeh",
      "Hapi",
      "Hemen",
      "Houroun",
      "Horos",
      "Horus",
      "Hor-Merty",
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
      "Khephren",
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
      "Sokar",
      "Sopdou",
      "Thoutmosis",
      "Thoth",
      "Toutankharton",
      "Toutankhamon",
      "Vizir",
      "Yamanu",
      "Yinepu",
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
      "Yamanut",
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
  image: null,
  name: "",
  gender: null,
  age: null,
  max_health: 10,
  health: 10,
  carryValue: 10,
  vision: 5,
  attacks: {
    damageAbs: 0,
    piercing: 0,
    slashing: 0,
    melee: 0,
    distance: 0,
    elemental: 0,
    blunt: 0,
    poison: 0,
    fire: 0,
    ice: 0,
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
    ice: 0,
  },
  skills: {
    gatheringFactor: 1,
    gatheringAbs: 0,
    foodGatheringAbs: 0,
    waterGatheringAbs: 0,
    moraleGatheringAbs: 0,
    foodGatheringFactor: 0,
    waterGatheringFactor: 0,
    moraleGatheringFactor: 0,
  },
  special: {},
  needs: {
    water: 1,
    food: 1,
    morale: 1,
  },
  passiveEarning: {
    morale: 0,
    food: 0,
    money: 0,
    water: 0,
  },
  weaponProficiency: {
    weapon: 0,
    melee: 0,
    distance: 0,
    sword: 0,
    spear: 0,
    bow: 0,
    mace: 0,
  },
  weapon: {
    name: "Hand",
    power: [1, 0, 0],
    attackType: ["blunt", "blunt", "blunt"],
    weaponType: "mace",
    attackStyle: ["melee", "melee", "melee"],
  },
  mount: {},
  armor: {
    name: "Cloth",
  },
  injuries: 0,
  stamina: 10,
};

var luckTrait = [0.6, 0.7, 0.8, 0.9, 0.95];

var genderArr = ["male", "female"];

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
  //"brave", // Doesn't lose morale after fight maybe.  // TBA
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
  "hard-working",
  "heartless",
  "overweight",
  "anorexic",
  "child of the Nil", // Will always find more ressources.
  "noble", // Requires way more ressources but enlighten others bc it's a privilege to be with a noble, and is very competent in term of warfare.
  "orphan", // Doesn't require ressources but is bad at everything.
];

specialsTraitsManager = {
  hungry: {
    needs: {
      food: 1,
    },
  },
  drought: {
    needs: {
      water: 1,
    },
  },
  ascetic: {
    skills: {
      moraleGatheringFactor: -1,
    },
    needs: {
      morale: -1,
    },
  },
  faithful: {},
  lucky: {
    skills: {
      gatheringAbs: 1,
    },
  },
  entertainer: {
    passiveEarning: {
      morale: 1,
    },
  },
  dowser: {
    passiveEarning: {
      water: 1,
    },
  },
  sick: {
    health: -2,
    endurance: -2,
  },
  archer: {
    weaponProficiency: {
      bow: 1,
    },
    vision: 5,
  },
  warrior: {
    weaponProficiency: {
      melee: 1,
    },
    attacks: {
      damageAbs: 1,
    },
    resistance: {
      phyDefense: 1,
    },
    endurance: 2,
  },
  protector: {
    resistance: {
      phyDefense: 1,
      defense: 1,
    },
    health: 5,
  },
  healthy: {
    health: 2,
    endurance: 2,
  },
  mummy: {
    needs: {
      water: -1,
      food: -1,
      morale: -1,
    },
  },
  spearman: {
    weaponProficiency: {
      spear: 1,
    },
    attacks: {
      piercing: 1,
    },
  },
  swordsman: {
    weaponProficiency: {
      sword: 1,
    },
    attacks: {
      slashing: 1,
    },
  },
  farmer: {
    skills: {
      foodGatheringAbs: 1,
    },
  },
  strong: {
    skills: {
      waterGatheringAbs: 1,
    },
    health: 2,
    attacks: {
      damageAbs: 1,
    },
    resistance: {
      phyDefense: 1,
    },
    carryValue: 10,
  },
  fragile: {
    resistance: {
      phyDefense: -1,
    },
  },
  weak: {
    resistance: {
      phyDefense: -1,
      defense: -1,
    },
    carryValue: -1,
  },
  aggressive: {
    resistance: {
      phyDefense: -1,
    },
    weaponProficiency: {
      melee: 1,
    },
  },
  coward: {
    resistance: {
      phyDefense: 1,
    },
    attacks: {
      melee: -1,
    },
  },
  depressed: {
    skills: {
      moraleGatheringAbs: -1,
    },
    needs: {
      morale: -1,
    },
  },
  unlucky: {
    skills: {
      gatheringAbs: -1,
    },
  },
  clumsy: {
    skills: {
      foodGatheringAbs: -1,
      waterGatheringAbs: -1,
    },
    weaponProficiency: {
      weapon: -1,
    },
  },
  cheerful: {
    skills: {
      moraleGatheringAbs: 1,
    },
  },
  optimistic: {
    needs: {
      morale: -1,
    },
    passiveEarning: {
      morale: 1,
    },
  },
  pesimistic: {
    needs: {
      morale: -1,
    },
    passiveEarning: {
      morale: -1,
    },
  },
  charming: {
    skills: {
      moraleGatheringAbs: 1,
    },
    passiveEarning: {
      morale: 1,
    },
    resistance: {
      phyDefense: 1,
    },
  },
  exhausted: {
    skills: {
      gatheringAbs: -1,
    },
    resistance: {
      defense: -1,
    },
    attacks: {
      damageAbs: -1,
    },
    carryValue: -2,
    endurance: -4,
  },
  chivalrous: {
    resistance: {
      defense: 1,
    },
    weaponProficiency: {
      melee: 1,
    },
    health: 2,
  },
  "weapon master": {
    weaponProficiency: {
      weapon: 2,
    },
  },
  heartless: {
    attacks: {
      damageAbs: 1,
    },
    passiveEarning: { morale: -1 },
  },
  overweight: {
    health: -2,
    needs: {
      food: 1,
    },
    resistance: {
      phyDefense: 1,
    },
    endurance: -2,
  },
  anorexic: {
    health: -2,
    needs: {
      food: -1,
    },
    resistance: {
      phyDefense: -1,
    },
  },
  "hard-working": {
    skills: {
      gatheringAbs: 1,
    },
    carryValue: 2,
  },
  hunter: {
    skills: {
      foodGatheringAbs: 1,
    },
    weaponProficiency: {
      bow: 1,
    },
  },
  "child of the Nil": {
    skills: {
      waterGatheringAbs: 1,
      foodGatheringAbs: 1,
    },
    health: 5,
    vision: 5,
  },
  noble: {
    needs: {
      food: 1,
      water: 1,
    },
    weaponProficiency: {
      weapon: 1,
      sword: 1,
    },
    passiveEarning: {
      money: 2,
      morale: 1,
    },
  },
  orphan: {
    needs: {
      food: -1,
      water: -1,
    },
    health: -2,
    skills: {
      gatheringAbs: -1,
    },
    weaponProficiency: {
      weapon: -1,
    },
  },
  slave: {
    health: -2,
    skills: {
      moraleGatheringAbs: -1,
    },
  },
  Horus: {
    vision: 10,
    attacks: {
      damageAbs: 1,
    },
    resistance: {
      defense: 1,
    },
  },
  Osiris: {
    skills: {
      foodGatheringAbs: 2,
      waterGatheringAbs: 1,
      moraleGatheringAbs: 2,
    },
    health: 10,
  },
  normie: {},
  bandit: {
    health: -3,
    defense: -1,
  },
  legionary: {
    health: 4,
    resistance: {
      phyDefense: 1,
    },
  },
  scorpio: {
    health: -5,
    resistance: {
      phyDefense: -1,
    },
    weapon: {
      type: "weapon",
      quantity: 0,
      value: 0,
      name: "Scorpion Stinger",
      power: [2, 2, 0],
      attackType: ["piercing", "piercing", "piercing"],
      weaponType: "sword",
      attackStyle: ["melee", "melee", "melee"],
      description: "Scorpion stinger",
      weight: 0,
      rarity: "common",
    },
  },
};

let lootTable = {
  legionary: {
    items: {
      8: 0.3,
      9: 0.3,
      5: 0.2,
    },
    minMoney: 10,
    maxMoney: 50,
  },
  bandit: {
    items: {
      2: 0.1,
      3: 0.1,
      4: 0.1,
      5: 0.2,
      10: 0.1,
    },
    minMoney: 0,
    maxMoney: 20,
  },
  scorpio: {
    items: {
      13: 0.1,
      14: 0.2,
    },
    minMoney: 0,
    maxMoney: 0,
  },
};

var baseCrewNumber = 20;
var crewMembers = [];
for (i = 0; i < baseCrewNumber; i++) {
  crewMembers.push(createCharacter());
}

var allItems = {
  0: {
    type: "carrier",
    name: "Camel",
    value: 500,
    volume: 2,
    price: 1000,
    carryValue: 100,
    weight: 0,
    rarity: "common",
    imgFile: "../Images/ItemImages/camel.png",
  },
  1: {
    type: "food",
    name: "Food",
    foodValue: 1,
    volume: 0,
    value: 10,
    description: "Miam miam",
    weight: 1,
    rarity: "common",
    imgFile: "../Images/ItemImages/food.png",
  },
  2: {
    type: "weapon",
    name: "bow",
    volume: 0,
    value: 10,
    power: [1, 2, 3],
    attackType: ["blunt", "piercing", "piercing"],
    weaponType: "bow",
    attackStyle: ["melee", "distance", "distance"],
    description: "Classic wooden bow.",
    weight: 1,
    rarity: "common",
    imgFile: "../Images/ItemImages/bow.png",
  },
  3: {
    type: "weapon",
    volume: 0,
    value: 10,
    name: "spear",
    power: [2, 3, 0],
    attackType: ["slashing", "piercing", "piercing"],
    weaponType: "spear",
    attackStyle: ["melee", "melee", "distance"],
    description: "Classic wooden bow.",
    weight: 1,
    rarity: "common",
    imgFile: "../Images/ItemImages/spear.png",
  },
  4: {
    type: "weapon",
    volume: 0,
    value: 100,
    name: "sword",
    power: [3, 2, 0],
    attackType: ["slashing", "slashing", "piercing"],
    weaponType: "sword",
    attackStyle: ["melee", "melee", "distance"],
    description: "Classic wooden bow.",
    weight: 1,
    rarity: "common",
    imgFile: "../Images/ItemImages/sword.png",
  },
  5: {
    type: "food",
    name: "Rations",
    foodValue: 1,
    volume: 100,
    price: 6,
    weight: 1,
    value: 3,
    rarity: "common",
    imgFile: "../Images/ItemImages/rations.png",
  },
  6: {
    type: "goods",
    name: "Papyrus",
    volume: 50,
    value: 5,
    price: 20,
    weight: 1,
    rarity: "common",
    imgFile: "../Images/ItemImages/papyrus.png",
  },
  7: {
    type: "mount",
    name: "Horse",
    volume: 0,
    value: 250,
    price: 500,
    carryValue: 30,
    weight: 0,
    rarity: "common",
    imgFile: "../Images/ItemImages/horse.png",
  },
  8: {
    type: "armor",
    name: "Lorica Segmentata",
    volume: 0,
    value: 250,
    price: 500,
    weight: 5,
    rarity: "legendary",
    imgFile: "../Images/ItemImages/lorcia_segmentata.png",
    resistance: {
      defense: 0,
      phyDefense: 1,
      elemDefense: 0,
      piercing: 0,
      slashing: 0,
      blunt: 0,
      poison: 0,
      fire: 0,
      ice: 0,
    },
  },
  9: {
    type: "weapon",
    volume: 0,
    value: 50,
    name: "Gladius",
    power: [3, 2, 0],
    attackType: ["slashing", "slashing", "piercing"],
    weaponType: "sword",
    attackStyle: ["melee", "melee", "distance"],
    description:
      "Sword stolen from a dead legionary. It is made of fine metal.",
    weight: 1,
    rarity: "uncommon",
    imgFile: "../Images/ItemImages/gladius.png",
  },
  10: {
    type: "armor",
    name: "Leather Armor",
    volume: 0,
    value: 50,
    price: 100,
    weight: 5,
    rarity: "rare",
    imgFile: "../Images/ItemImages/leather.png",
    resistance: {
      defense: 0,
      phyDefense: 0,
      elemDefense: 0,
      piercing: 0,
      slashing: 1,
      blunt: 0,
      poison: 0,
      fire: 0,
      ice: 0,
    },
  },
  11: {
    type: "other",
    name: "Bandage",
    volume: 0,
    price: 20,
    weight: 0,
    rarity: "rare",
    imgFile: "../Images/ItemImages/bandage.png",
  },
  12: {
    type: "weapon",
    name: "Nomad Bow",
    volume: 0,
    value: 40,
    power: [1, 3, 2],
    attackType: ["blunt", "piercing", "piercing"],
    weaponType: "bow",
    attackStyle: ["melee", "distance", "distance"],
    description: "Powerful bow at close range but less at longer range.",
    weight: 1,
    rarity: "uncommon",
  },
  13: {
    type: "goods",
    name: "Scorpion Venom",
    volume: 0,
    value: 30,
    weight: 1,
    rarity: "Uncommon",
  },
  14: {
    type: "goods",
    name: "Scorpion Tail",
    volume: 0,
    value: 10,
    weight: 1,
    rarity: "common",
  },
  800: {
    type: "weapon",
    quantity: 0,
    value: 0,
    name: "Scorpion Stinger",
    power: [2, 1, 0],
    attackType: ["piercing", "piercing", "piercing"],
    weaponType: "sword",
    attackStyle: ["melee", "melee", "melee"],
    description: "Scorpion stinger",
    weight: 0,
    rarity: "common",
  },
  12: {
    type: "weapon",
    name: "Nomad Bow",
    volume: 0,
    value: 40,
    power: [1, 3, 2],
    attackType: ["blunt", "piercing", "piercing"],
    weaponType: "bow",
    attackStyle: ["melee", "distance", "distance"],
    description: "Powerful bow at close range but less at longer range.",
    weight: 1,
    rarity: "uncommon",
  },
  13: {
    type: "goods",
    name: "Scorpion Venom",
    volume: 0,
    price: 30,
    weight: 1,
    rarity: "Uncommon",
  },
  14: {
    type: "goods",
    name: "Scorpion Tail",
    volume: 0,
    price: 10,
    weight: 1,
    rarity: "common",
  },
  800: {
    type: "weapon",
    quantity: 0,
    value: 0,
    name: "Scorpion Stinger",
    power: [2, 1, 0],
    attackType: ["piercing", "piercing", "piercing"],
    weaponType: "sword",
    attackStyle: ["melee", "melee", "melee"],
    description: "Scorpion stinger",
    weight: 0,
    rarity: "common",
  },
  1000: {
    type: "weapon",
    name: "Hand",
    value: "priceless",
    weight: 0,
    rarity: "common",
    power: [1, 0, 0],
    attackType: ["blunt", "blunt", "blunt"],
    weaponType: "mace",
    attackStyle: ["melee", "melee", "melee"],
  },
  1001: {
    type: "armor",
    name: "Cloth Armor",
    value: 25,
    weight: 0,
    rarity: "common",
    imgFile: "../Images/ItemImages/cloth.png",
  },
};

//changed volume to "amount" since we already have a volume for each
baseInventory = {
  0: { volume: 1 },
  1: { volume: 80 },
  2: { volume: 2 },
  3: { volume: 2 },
  4: { volume: 2 },
  7: { volume: 2 },
  6: { volume: 10 },
  11: {
    volume: 5,
  },
};

function inputTrait(newTraitName, newUnit) {
  let newTrait = specialsTraitsManager[newTraitName];
  newUnit["special"][newTraitName] = true;
  for (let property in newTrait) {
    if (typeof newTrait[property] == "object") {
      for (let subProperty in newTrait[property]) {
        newUnit[property][subProperty] += newTrait[property][subProperty];
      }
    } else {
      newUnit[property] += newTrait[property];
    }
  }
  return newUnit;
}

function createCharacter() {
  var newUnit = JSON.parse(JSON.stringify(baseUnit));
  newUnit["id"] = "id" + Math.random().toString(16).slice(2);
  newUnit["gender"] = genderArr[Math.floor(genderArr.length * Math.random())];
  newUnit["name"] =
    listOfNames["firstname"][newUnit["gender"]][
      Math.floor(
        listOfNames["firstname"][newUnit["gender"]].length * Math.random()
      )
    ];
  newUnit["age"] = 18 + Math.floor(60 * Math.random());
  newUnit["image"] =
    "Images/crew/" +
    newUnit["gender"] +
    "/" +
    String(
      Math.floor(Math.random() * (listCrewImages[newUnit["gender"]] - 1))
    ) +
    ".png";
  if (newUnit["name"] == "Jonathan") {
    console.log("Easter Egg");
    newUnit["image"] = "Images/crew/jonathan.png";
    newUnit = inputTrait("strong", newUnit);
  } else if (newUnit["name"] == "Horus" && Math.floor(Math.random() * 5) == 0) {
    console.log("Easter Egg");
    newUnit = inputTrait("Horus", newUnit);
    newUnit["image"] = "Images/crew/horus.png";
  } else if (
    newUnit["name"] == "Osiris" &&
    Math.floor(Math.random() * 5) == 0
  ) {
    console.log("Easter Egg Osiris");
    newUnit = inputTrait("Osiris", newUnit);
    newUnit["image"] = "Images/crew/osiris.png";
  }
  if (newUnit["age"] > 65) {
    newUnit["health"] -= 1;
  }
  for (let i = 0; i < luckTrait.length; i++) {
    if (Math.random() > luckTrait[i]) {
      let newTraitName =
        specialsTraits[Math.floor(specialsTraits.length * Math.random())];
      let newTrait = specialsTraitsManager[newTraitName];
      if (newTraitName in newUnit["special"]) {
        continue;
      }
      newUnit["special"][newTraitName] = true;
      for (let property in newTrait) {
        if (typeof newTrait[property] == "object") {
          for (let subProperty in newTrait[property]) {
            newUnit[property][subProperty] += newTrait[property][subProperty];
          }
        } else {
          newUnit[property] += newTrait[property];
        }
      }
    }
  }
  newUnit["max_health"] = newUnit["health"];
  return newUnit;
}

// Define starting values.
function initSessionStorage() {
  save("allTraits", specialsTraitsManager);
  save("statusTurn", "narration");
  save("baseUnit", baseUnit);
  save("allItems", allItems);
  save("crewMembers", crewMembers);
  // Number of people player has, thus number of people he can use.
  save("crewTotal", crewMembers);
  // Distribution of the crew, the total can't be > crewTotal.
  save("crewTypes", { scouts: 0, guards: 0, carriers: 0 }); // Free crew can become carriers to carry more goods.
  save("idleCrew", crewMembers.lenght); // Number of remaining people to distribute.
  save("morale", 100);
  save("money", 1000);
  save("authority", 10);
  save("water", 50);
  save("numberOfTurns", 0);
  save("famineTurns", 0);
  save("inventory", baseInventory);
  save("playerLocation", {
    type: "nil_shore",
    name: "Nil shore",
    isTradable: false,
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
  });
  save("gatherer", {
    water: [],
    food: [],
    morale: [],
    scout: [],
    guard: [],
    carrier: [],
    row1: [],
    row2: [],
    row3: [],
  });
  save("groupOfEnemies", { row1: [], row2: [], row3: [] });
  save("lootTable", lootTable);
  save("audioCurrentTime", 0);
}

function goPlay() {
  window.location.href = "../cinematicPage/cinematic.html";
}

document.getElementById("play").onclick = goPlay;
initSessionStorage();
