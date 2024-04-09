// ---------- START MANDATORY VARIABLE FUNCTIONS ----------

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
function saveSessionStorage() {
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

// ---------- END MANDATORY VARIABLE FUNCTIONS ----------

loadSessionStorage();

// ---------- START CREW AND INVENTORY VARIABLES ----------

//Crew related variables
let crew = [
  {
    name: "Joanne",
    lastName: "Andriamahandry",
    Age: 18,
    Sex: "Female",
    role: ((scout = false), (guard = false), (carrier = false)),
  },
  {
    name: "Neyla",
    lastName: "Mazouz",
    Age: 19,
    Sex: "Female",
    role: ((scout = false), (guard = false), (carrier = false)),
  },
  {
    name: "Ethan",
    lastName: "Gandiboyina",
    Age: 19,
    Sex: "Male",
    role: ((scout = false), (guard = false), (carrier = false)),
  },
  {
    name: "Raphael",
    lastName: "Grosnoir",
    Age: 19,
    Sex: "Male",
    role: ((scout = false), (guard = false), (carrier = false)),
  },
];

let crewList = document.getElementById("crewMembers");
let displayCrewTotal = document.getElementById("crew-total");
let displayHorseTotal = document.getElementById("horse-total");
let displayWeaponTotal = document.getElementById("weapon-total");
let scoutAttribution = document.getElementById("roleScout");
let guardAttribution = document.getElementById("roleGuard");
let carrierAttribution = document.getElementById("roleCarrier");

// ---------- END CREW AND INVENTORY VARIABLES ----------

// ---------- START FUNCTIONS INITIALIZATION ----------

//Display the total of crew members (METTRE LES VALEURS !!)
function displayResources() {
  displayCrewTotal.innerHTML = `Crew: ${crewTotal}` + " | ";
  displayHorseTotal.innerHTML = " " + `Horses: ` + " | ";
  displayWeaponTotal.innerHTML = " " + `Weapons: `;
}

scoutAttribution.addEventListener("click", function () {
  createMemberAndAssign("scout");
});
guardAttribution.addEventListener("click", function () {
  createMemberAndAssign("guard");
});

function scoutCheck(idInput) {
  if (document.getElementById(idInput).checked == true) {
    console.log("trop belle bb" + idInput);
  }
}
function guardCheck(idInput) {
  console.log("trop belle bb" + idInput);
}

//Function that create a member component (his image, his informations, his role...)
function createMemberAndAssign(menu = "scout") {
  for (let eachPerson in crew) {
    let person = document.createElement("div");
    let personAbout = document.createElement("div");
    let attributionContainer = document.createElement("div");
    let personImage = document.createElement("img");
    let personFullName = document.createElement("span");
    let attributionCheck = document.createElement("input");
    if (menu == "scout") {
      attributionCheck.addEventListener("click", function () {
        scoutCheck(this.id);
      });
    } else if (menu == "guard") {
      attributionCheck.addEventListener("click", function () {
        guardCheck(this.id);
      });
    }
    person.classList.add("member");
    attributionCheck.setAttribute(
      "id",
      "personne" + Math.floor(Math.random() * 100000)
    );
    personAbout.classList.add("member-about");
    attributionContainer.classList.add("checkbox");
    personImage.src = "/Images/personImage-" + eachPerson + ".jpg";
    personFullName.classList.add("description");
    personFullName.innerHTML =
      crew[eachPerson]["name"] + " " + crew[eachPerson]["lastName"];
    attributionCheck.type = "checkbox";
    attributionCheck.name = "check";
    attributionCheck.classList.add("check");
    person.appendChild(personAbout);
    person.appendChild(attributionContainer);
    personAbout.appendChild(personImage);
    personAbout.appendChild(personFullName);
    attributionContainer.appendChild(attributionCheck);

    crewList.appendChild(person);
  }
}

// ---------- END FUNCTIONS INITIALIZATION ----------

// ---------- START FUNCTIONS CALLING ----------

displayResources();
createMemberAndAssign();

// ---------- END FUNCTIONS CALLING ----------
