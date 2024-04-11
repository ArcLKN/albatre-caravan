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
  statusTurn = sessionStorage.getItem("statusTurn");
  crew = JSON.parse(sessionStorage.getItem("crew"));
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
  save("statusTurn", statusTurn);
  save("crew", crew);
}

// ---------- END MANDATORY VARIABLE FUNCTIONS ----------

loadSessionStorage();

// ---------- START CREW AND INVENTORY VARIABLES ----------

let crewList = document.getElementById("crewMembers");
let displayCrewTotal = document.getElementById("crew-total");
let displayHorseTotal = document.getElementById("horse-total");
let displayWeaponTotal = document.getElementById("weapon-total");
let scoutAttribution = document.getElementById("roleScout");
let guardAttribution = document.getElementById("roleGuard");
let carrierAttribution = document.getElementById("roleCarrier");

let confirmationBtn = document.getElementById("confirm");

// ---------- END CREW AND INVENTORY VARIABLES ----------

// ---------- START FUNCTIONS INITIALIZATION ----------

//Display the total of crew members (METTRE LES VALEURS !!)
function displayResources() {
  displayCrewTotal.innerHTML = `Crew: ${crewTotal}` + " | ";
  displayHorseTotal.innerHTML = " " + `Horses: ` + " | ";
  displayWeaponTotal.innerHTML = " " + `Weapons: `;
}

function manageDEr(menu, idInput) {
  if (document.getElementById(idInput).checked == true) {
    for (let eachMember in crew) {
      if (crew[eachMember]["id"] == idInput) {
        gatherer[menu].push(crew[eachMember]);
      }
    }
  } else {
    let tempCrew = [];
    for (let eachMember in gatherer[menu]) {
      if (gatherer[menu][eachMember]["id"] != idInput) {
        tempCrew.push(gatherer[menu][eachMember]);
      }
    }
    gatherer[menu] = tempCrew;
  }
  console.log(gatherer);
}

//Checks if a member is assigned to the scout role
function scoutCheck(idInput) {
  manageDEr("scout", idInput);
}

//Checks if a member is assigned to the guard role
function guardCheck(idInput) {
  manageDEr("guard", idInput);
}

function removeCharacterBox() {
  document.querySelectorAll('[class="member"]').forEach((e) => e.remove());
}

//Function that create a member component (his image, his informations, his role...)
function createMemberAndAssign(menu = "") {
  removeCharacterBox();

  for (let eachPerson in crew) {
    let isNotIdle = false;
    for (let eachMenu in gatherer) {
      if (eachMenu == menu) {
        continue;
      }
      for (let eachConnard in gatherer[eachMenu]) {
        console.log(gatherer[eachMenu]);
        if (crew[eachPerson]["id"] == gatherer[eachMenu][eachConnard]["id"]) {
          isNotIdle = true;
        }
      }
    }
    if (isNotIdle) {
      continue;
    }

    let person = document.createElement("div");
    let personAbout = document.createElement("div");
    let attributionContainer = document.createElement("div");
    let personImage = document.createElement("img");
    let personFullName = document.createElement("span");
    let attributionCheck = document.createElement("input");
    person.classList.add("member");
    let newId = crew[eachPerson]["id"];
    attributionCheck.setAttribute("id", newId);
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
    for (let eachGatherer in gatherer[menu]) {
      if (gatherer[menu][eachGatherer]["id"] == crew[eachPerson]["id"]) {
        attributionCheck.checked = true;
      }
    }

    if (menu == "scout") {
      attributionCheck.addEventListener("click", function () {
        scoutCheck(this.id);
      });
    } else if (menu == "guard") {
      attributionCheck.addEventListener("click", function () {
        guardCheck(this.id);
      });
    }
  }
}

//Scout category click event
scoutAttribution.addEventListener("click", function () {
  createMemberAndAssign("scout");
});

//Guard category event
guardAttribution.addEventListener("click", function () {
  createMemberAndAssign("guard");
});

confirmationBtn.addEventListener("click", () => {
  statusTurn = "deployUnits";
  saveSessionStorage();

  window.location.href = "../gamePage.html";
});

// ---------- END FUNCTIONS INITIALIZATION ----------

// ---------- START FUNCTIONS CALLING ----------

loadSessionStorage();
displayResources();
createMemberAndAssign("scout");

// ---------- END FUNCTIONS CALLING ----------
