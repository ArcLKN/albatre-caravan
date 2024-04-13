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
	crewTotal = JSON.parse(sessionStorage.getItem("crewTotal"));
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
	crew = JSON.parse(sessionStorage.getItem("crewMembers"));
	console.log(crew);
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
	save("crewMembers", crew);
}

// ---------- END MANDATORY VARIABLE FUNCTIONS ----------

loadSessionStorage();

// ---------- START CREW AND INVENTORY VARIABLES ----------

let crewList = document.getElementById("crewMembers");
let displayCrewTotal = document.getElementById("crew-total");
let displayHorseTotal = document.getElementById("horse-total");
let displayWeaponTotal = document.getElementById("weapon-total");

// ---------- END CREW AND INVENTORY VARIABLES ----------

// ---------- START FUNCTIONS INITIALIZATION ----------

function Capitalize(e) {
	return e[0].toUpperCase() + e.slice(1);
}

//Display the total of crew members (METTRE LES VALEURS !!)
function displayResources() {
	displayCrewTotal.innerHTML = `Crew: ${crewTotal.length}` + " | ";
	displayHorseTotal.innerHTML = " " + `Horses: ` + " | ";
	displayWeaponTotal.innerHTML = " " + `Weapons: `;
}

function manageDEr(menu, idInput) {
	if (document.getElementById(idInput).checked == true) {
		let tempCrew = [];
		for (let eachMember in crew) {
			if (crew[eachMember]["id"] == idInput) {
				gatherer[menu].push(crew[eachMember]);
			}
			else {
				tempCrew.push(crew[eachMember]);
			}
		}
		crew = tempCrew;
	} else {
		let tempCrew = [];
		for (let eachMember in gatherer[menu]) {
			if (gatherer[menu][eachMember]["id"] != idInput) {
				tempCrew.push(gatherer[menu][eachMember]);
				
			}
			else {
				crew.push(gatherer[menu][eachMember]);
			}
		}
		gatherer[menu] = tempCrew;
	}
	console.log(crew);
	console.log(gatherer[menu]);
}

//Checks if a member is assigned to the scout role
function scoutCheck(idInput) {
	manageDEr("scout", idInput);
}

//Checks if a member is assigned to the guard role
function guardCheck(idInput) {
	manageDEr("guard", idInput);
}

//Checks if a member is assigned to the carrier role
function carrierCheck(idInput) {
	manageDEr("carrier", idInput);
}

//Checks if a member is assigned to the carrier role
function waterCheck(idInput) {
	manageDEr("water", idInput);
}

//Checks if a member is assigned to the carrier role
function foodCheck(idInput) {
	manageDEr("food", idInput);
}

//Checks if a member is assigned to the carrier role
function moraleCheck(idInput) {
	manageDEr("morale", idInput);
}

function removeCharacterBox() {
	document.querySelectorAll('[class="member"]').forEach((e) => e.remove());
}

//Function that create a member component (his image, his informations, his role...)
function createMemberAndAssign(menu = "") {
	removeCharacterBox();

	for (let eachPerson in crewTotal) {
		let isNotIdle = false;
		for (let eachMenu in gatherer) {
			if (eachMenu == menu) {
				continue;
			}
			for (let eachConnard in gatherer[eachMenu]) {
				if (crewTotal[eachPerson]["id"] == gatherer[eachMenu][eachConnard]["id"]) {
					isNotIdle = true;
				}
			}
		}
		if (isNotIdle) {
			continue;
		}

		let person = document.createElement("div");
		let personAbout = document.createElement("div");
		let endRowPerson = document.createElement("div");
		endRowPerson.classList.add("endRowPerson");
		let attributionContainer = document.createElement("div");
		let namePtrait = document.createElement("div");
		let traitBox = document.createElement("div");
		let personImage = document.createElement("img");
		let personFullName = document.createElement("span");
		let attributionCheck = document.createElement("input");
		person.classList.add("member");
		let newId = crewTotal[eachPerson]["id"];
		attributionCheck.setAttribute("id", newId);
		personAbout.classList.add("member-about");
		attributionContainer.classList.add("checkbox");
		
		personImage.src = "../../"+crewTotal[eachPerson]['image'];
		personFullName.classList.add("description");
		personFullName.innerHTML = crewTotal[eachPerson]["name"];
		attributionCheck.type = "checkbox";
		attributionCheck.name = "check";
		attributionCheck.classList.add("check");
		person.appendChild(personAbout);
		person.appendChild(endRowPerson);
		
		personAbout.appendChild(personImage);
		personAbout.appendChild(namePtrait);
		namePtrait.appendChild(personFullName);
		namePtrait.classList.add("namePtrait");
		namePtrait.appendChild(traitBox);
		traitBox.classList.add("traitBox");
		attributionContainer.appendChild(attributionCheck);
		crewList.appendChild(person);

		for (let eachTrait in crewTotal[eachPerson]["special"]) {
				if (crewTotal[eachPerson]["special"][eachTrait]) {
						let nodeTrait = document.createElement("span");
						nodeTrait.innerHTML = eachTrait;
						nodeTrait.classList.add("trait");
						traitBox.appendChild(nodeTrait);
				}
		}

		if (["water", "food", "morale"].includes(menu)) {
				let ressourcesObtained = playerLocation["gatheringValues"][menu + "Yield"] * (crewTotal[eachPerson]['skills']['gatheringFactor'] + crewTotal[eachPerson]['skills'][menu+'GatheringFactor'])
				+ crewTotal[eachPerson]['skills']['gatheringAbs']
				+ crewTotal[eachPerson]['skills'][menu+'GatheringAbs'];
				let ressourceText = document.createElement("p");
				if (ressourcesObtained > 0) {
						ressourceText.innerHTML = "+";
						ressourceText.style.color = "green";
				}
				else if (ressourcesObtained < 0) {
						ressourceText.innerHTML = "-";
						ressourceText.style.color = "red";
				}
				else {
						ressourceText.innerHTML = "";
						ressourceText.style.color = "grey";
				}
				ressourceText.innerHTML += String(ressourcesObtained);
				endRowPerson.appendChild(ressourceText);
		}

		endRowPerson.appendChild(attributionContainer);


		for (let eachGatherer in gatherer[menu]) {
			if (gatherer[menu][eachGatherer]["id"] == crewTotal[eachPerson]["id"]) {
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
		} else if (menu == "carrier") {
			attributionCheck.addEventListener("click", function () {
				carrierCheck(this.id);
			});
		} else if (menu == "water") {
			attributionCheck.addEventListener("click", function () {
				waterCheck(this.id);
			});
		} else if (menu == "food") {
			attributionCheck.addEventListener("click", function () {
				foodCheck(this.id);
			});
		} else if (menu == "morale") {
			attributionCheck.addEventListener("click", function () {
				moraleCheck(this.id);
			});
		}

	}
}

// ---------- END FUNCTIONS INITIALIZATION ----------

// ---------- START FUNCTIONS CALLING ----------

function removeAssignedCrew() {
	if (!("waterYield" in playerLocation["gatheringValues"])) {
		for (let eachG in gatherer['water']) {
			crew.push(gatherer['water'][eachG])
		}
		gatherer['water'] = [];
	}
	if (!("foodYield" in playerLocation["gatheringValues"])) {
		for (let eachG in gatherer['food']) {
			crew.push(gatherer['food'][eachG])
		}
		gatherer['food'] = [];
	}
	if (!("moraleYield" in playerLocation["gatheringValues"])) {
		for (let eachG in gatherer['morale']) {
			crew.push(gatherer['morale'][eachG])
		}
		gatherer['morale'] = [];
	}
}

function onLoad () {
	removeAssignedCrew() 
		console.log("Status",statusTurn);
		let roleDiv = document.getElementById("role");
		let confirmationBtn = document.getElementById("confirm");

		if (statusTurn == "deployUnits") {
				confirmationBtn.addEventListener("click", () => {
						statusTurn = "gatherResolution";
						saveSessionStorage();
						window.location.href = "../gamePage.html";
				});
				if (
						"waterYield" in playerLocation["gatheringValues"] &&
						playerLocation["gatheringValues"]["waterYield"] > 0
				) {
						let newButton = document.createElement("button");
						newButton.setAttribute("id", "roleWater");
						newButton.textContent = "Water Gatherer";
						newButton.addEventListener("click", function () {
								createMemberAndAssign("water");
						});
						roleDiv.appendChild(newButton);
				}
				if (
						"foodYield" in playerLocation["gatheringValues"] &&
						playerLocation["gatheringValues"]["foodYield"] > 0
				) {
				let newButton = document.createElement("button");
				newButton.setAttribute("id", "roleFood");
				newButton.textContent = "Food Gatherer";
				newButton.addEventListener("click", function () {
								createMemberAndAssign("food");
						});
				roleDiv.appendChild(newButton);
				}
				if (
				"moraleYield" in playerLocation["gatheringValues"] &&
				playerLocation["gatheringValues"]["moraleYield"] > 0
				) {
				let newButton = document.createElement("button");
				newButton.setAttribute("id", "roleMorale");
				newButton.textContent = "Morale Gatherer";
				newButton.addEventListener("click", function () {
								createMemberAndAssign("morale");
						});
				roleDiv.appendChild(newButton);
				}
		}
		else {
				confirmationBtn.addEventListener("click", () => {
						statusTurn = "deployUnits";
						saveSessionStorage();
						window.location.href = "../gamePage.html";
				});
				let roleList = ["scout", "guard", "carrier"];
				roleList.forEach(e => {
						let newButton = document.createElement("button");
						newButton.setAttribute("id", "role"+Capitalize(e));
						newButton.textContent = Capitalize(e);
						newButton.addEventListener("click", function () {
								createMemberAndAssign(e);
						});
						roleDiv.appendChild(newButton);
				})
				createMemberAndAssign("scout");
		}
}

onLoad();
displayResources();

// ---------- END FUNCTIONS CALLING ----------
