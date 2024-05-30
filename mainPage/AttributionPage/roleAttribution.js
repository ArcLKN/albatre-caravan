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
  allItems = JSON.parse(sessionStorage.getItem("allItems"));
  allTraits = JSON.parse(sessionStorage.getItem("allTraits"));
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

// ---------- START VARIABLES ----------

let crewList = document.getElementById("crewMembers");
let displayCrewTotal = document.getElementById("crew-total");
let displayHorseTotal = document.getElementById("horse-total");
let displayWeaponTotal = document.getElementById("weapon-total");
let displayPortageTotal = document.getElementById("portage-total");
let displayWaterTotal = document.getElementById("water-total");
let displayFoodTotal = document.getElementById("food-total");
let displayMoralTotal = document.getElementById("moral-total");
let displayMoneyTotal = document.getElementById("money-total");

let selectAllChar = document.getElementById("select-all");
let deselectAllChar = document.getElementById("deselect-all");
let totalSkills = document.getElementById("total-skills");

// ---------- END VARIABLES ----------

// ---------- START FUNCTIONS INITIALIZATION ----------

function Capitalize(e) {
  return e[0].toUpperCase() + e.slice(1);
}

let portage = 0;
let portageNeeded = 0;

//Display the total of crew members (METTRE LES VALEURS !!)
function displayResources() {
  displayCrewTotal.innerHTML = `Crew: ${crewTotal.length}`;
  let nbrWeapons = 0;
  let nbrMounts = 0;
  let nbrFood = 0;
  for (let index in inventory) {
    if (allItems[index]["type"] == "weapon") {
      nbrWeapons += inventory[index]["volume"];
    } else if (allItems[index]["type"] == "mount") {
      nbrMounts += inventory[index]["volume"];
    } else if (allItems[index]["type"] == "carrier") {
      portage += inventory[index]["volume"] * allItems[index]["carryValue"];
    } else if (allItems[index]["type"] == "food") {
      nbrFood += inventory[index]["volume"];
    }
    portageNeeded += inventory[index]["volume"] * allItems[index]["weight"];
  }
  for (let carry in gatherer["carrier"]) {
    portage += gatherer["carrier"][carry]["carryValue"];
  }
  displayHorseTotal.innerHTML = " " + `Mounts: ${nbrMounts}`;
  displayWeaponTotal.innerHTML = " " + `Weapons: ${nbrWeapons}`;
  displayWaterTotal.innerHTML = " " + `Water: ${water}`;
  displayFoodTotal.innerHTML = " " + `Food: ${nbrFood}`;
  displayMoralTotal.innerHTML = " " + `Morale: ${Math.round(morale)}`;
  displayMoneyTotal.innerHTML = " " + `Money: ${money}`;
  displayPortageTotal.innerHTML =
    " " + `Portage: ${portageNeeded} / ${portage}`;
}

function updateTotal(menu) {
  let totalNode = document.getElementById("total-skills");
  let totalScore = 0;

  if (["water", "food", "morale"].includes(menu)) {
    for (let eachUnit in gatherer[menu]) {
      totalScore +=
        playerLocation["gatheringValues"][menu + "Yield"] *
          (gatherer[menu][eachUnit]["skills"]["gatheringFactor"] +
            gatherer[menu][eachUnit]["skills"][menu + "GatheringFactor"]) +
        gatherer[menu][eachUnit]["skills"]["gatheringAbs"] +
        gatherer[menu][eachUnit]["skills"][menu + "GatheringAbs"];
    }
  } else if (menu == "carrier") {
    for (let eachUnit in gatherer[menu]) {
      totalScore += gatherer[menu][eachUnit]["carryValue"];
    }
  } else if (menu == "scout") {
    for (let eachUnit in gatherer[menu]) {
      totalScore += gatherer[menu][eachUnit]["vision"];
    }
  }
  totalNode.textContent = String(totalScore);
}

function manageDEr(menu, idInput) {
  if (document.getElementById(idInput).checked == true) {
    let tempCrew = [];
    for (let eachMember in crew) {
      if (crew[eachMember]["id"] == idInput) {
        gatherer[menu].push(crew[eachMember]);
        if (menu == "carrier") {
          portage += crew[eachMember]["carryValue"];
          displayPortageTotal.innerHTML =
            " " + `Portage: ${portageNeeded} / ${portage}`;
        }
      } else {
        tempCrew.push(crew[eachMember]);
      }
    }
    crew = tempCrew;
  } else {
    let tempCrew = [];
    for (let eachMember in gatherer[menu]) {
      if (gatherer[menu][eachMember]["id"] != idInput) {
        tempCrew.push(gatherer[menu][eachMember]);
      } else {
        crew.push(gatherer[menu][eachMember]);
        if (menu == "carrier") {
          portage -= gatherer[menu][eachMember]["carryValue"];
          displayPortageTotal.innerHTML =
            " " + `Portage: ${portageNeeded} / ${portage}`;
        }
      }
    }
    gatherer[menu] = tempCrew;
  }
  updateTotal(menu);
}

//Checks if a member is assigned to the scout role
function scoutCheck(idInput) {
  manageDEr("scout", idInput);
}

//Checks if a member is assigned to the guard role
function guardCheck(idInput) {
  manageDEr("guard", idInput);
}

//Checks if a member is assigned to the guard role
function row1Check(idInput) {
  manageDEr("row1", idInput);
}
//Checks if a member is assigned to the guard role
function row2Check(idInput) {
  manageDEr("row2", idInput);
}
//Checks if a member is assigned to the guard role
function row3Check(idInput) {
  manageDEr("row3", idInput);
}

//Checks if a member is assigned to the carrier role
function carrierCheck(idInput) {
  manageDEr("carrier", idInput);
}

//Checks if a member is assigned to the water gathering role
function waterCheck(idInput) {
  manageDEr("water", idInput);
}

//Checks if a member is assigned to the food gathering role
function foodCheck(idInput) {
  manageDEr("food", idInput);
}

//Checks if a member is assigned to the morale gathering role
function moraleCheck(idInput) {
  manageDEr("morale", idInput);
}

// Create item depending of itemName.
function searchItemFromName(nameItem) {
  for (var eachItem in allItems) {
    if (allItems[eachItem]["name"] == nameItem) {
      return eachItem;
    }
  }
}

function equipItem(itemId, memberId) {
  if (itemId < 1000 && inventory[itemId]["volume"] <= 0) {
    return;
  }
  let thisMember;
  for (let eachMember in crewTotal) {
    if (crewTotal[eachMember]["id"] == memberId) {
      thisMember = crewTotal[eachMember];
    }
  }
  console.log(itemId, allItems[itemId]["type"], thisMember, memberId);
  previousItem = thisMember[allItems[itemId]["type"]];
  thisMember[allItems[itemId]["type"]] = allItems[itemId];
  // Update the unequipped item volume in inventory and text.
  // Might cause a problem if player has no more of this item. But idk if it's possible.
  if (searchItemFromName(previousItem["name"]) < 1000) {
    inventory[searchItemFromName(previousItem["name"])]["volume"] += 1;
    document.getElementById(
      "itemQtt" + searchItemFromName(previousItem["name"])
    ).textContent =
      "x" +
      String(inventory[searchItemFromName(previousItem["name"])]["volume"]);
  }
  // Update the equipped item volume in inventory and text.
  if (itemId < 1000) {
    inventory[searchItemFromName(allItems[itemId]["name"])]["volume"] -= 1;
    document.getElementById("itemQtt" + itemId).textContent =
      "x" +
      String(inventory[searchItemFromName(allItems[itemId]["name"])]["volume"]);
  }
  document.getElementById(
    "item" + searchItemFromName(previousItem["name"])
  ).style.backgroundColor = "white";
  document.getElementById("item" + itemId).style.backgroundColor = "LightGreen";
}

function showItemInventory(itemType, itemId) {
  document.querySelectorAll('[class="inventory"]').forEach((e) => e.remove());
  let inventoryDiv = document.createElement("div");
  inventoryDiv.classList.add("inventory");
  let wpButtonNode = document.getElementById(itemId);
  let memberId = itemId.slice(11);
  let actualItemId;
  for (let eachMember in crewTotal) {
    if (crewTotal[eachMember]["id"] == memberId) {
      actualItemId = searchItemFromName(
        crewTotal[eachMember][itemType]["name"]
      );
    }
  }

  let memberNode = wpButtonNode.parentNode.parentNode;
  memberNode.parentNode.insertBefore(inventoryDiv, memberNode.nextSibling);

  let newItemNode = document.createElement("div");
  newItemNode.classList.add("itemGroup");

  let itemButton = document.createElement("button");

  let itemName = document.createElement("p");
  console.log("member ID", memberId);
  if (itemType == "weapon") {
    itemName.textContent = "Hand";
    itemButton.addEventListener("click", function () {
      equipItem(1000, memberId);
    });
    itemButton.setAttribute("id", "item1000");
    if (actualItemId == "1000") {
      itemButton.style.backgroundColor = "LightGreen";
    }
  } else {
    itemName.textContent = "Cloth";
    itemButton.addEventListener("click", function () {
      equipItem(1001, memberId);
    });
    itemButton.setAttribute("id", "item1001");
    if (actualItemId == "1001") {
      itemButton.style.backgroundColor = "LightGreen";
    }
  }

  inventoryDiv.appendChild(newItemNode);
  newItemNode.appendChild(itemButton);
  newItemNode.appendChild(itemName);

  for (let eachItem in inventory) {
    if (allItems[eachItem]["type"] == itemType) {
      let newItemNode = document.createElement("div");
      newItemNode.classList.add("itemGroup");

      let itemButton = document.createElement("button");
      itemButton.setAttribute("id", "item" + eachItem);
      itemButton.addEventListener("click", function () {
        equipItem(eachItem, memberId);
      });
      let itemName = document.createElement("p");
      itemName.textContent = allItems[eachItem]["name"];
      let itemQtt = document.createElement("p");
      itemQtt.setAttribute("id", "itemQtt" + eachItem);
      itemQtt.textContent = "x" + inventory[eachItem]["volume"];

      inventoryDiv.appendChild(newItemNode);
      newItemNode.appendChild(itemButton);
      newItemNode.appendChild(itemName);
      newItemNode.appendChild(itemQtt);

      if (actualItemId == eachItem) {
        itemButton.style.backgroundColor = "LightGreen";
      }
    }
  }
}

function removeCharacterBox() {
  document.querySelectorAll('[class="member"]').forEach((e) => e.remove());
}

//Function that create a member component (his image, his informations, his role...)
function createMemberAndAssign(menu = "") {
  removeCharacterBox();
  document.querySelectorAll('[class="inventory"]').forEach((e) => e.remove());
  updateTotal(menu);

  // Clone the button
  const clonedSelectButton = selectAllChar.cloneNode(true);
  const clonedDeselectButton = deselectAllChar.cloneNode(true);

  // Replace the original button with the cloned one
  selectAllChar.parentNode.replaceChild(clonedSelectButton, selectAllChar);
  deselectAllChar.parentNode.replaceChild(
    clonedDeselectButton,
    deselectAllChar
  );

  selectAllChar = clonedSelectButton;
  deselectAllChar = clonedDeselectButton;

  // Now, the clonedButton has no event listeners attached to it

  selectAllChar.addEventListener("click", function () {
    for (let eachMember in crew) {
      gatherer[menu].push(crew[eachMember]);
      document.querySelectorAll("input").forEach((e) => (e.checked = true));
    }
    crew = [];
    updateTotal(menu);
  });

  deselectAllChar.addEventListener("click", function () {
    for (let eachMember in gatherer[menu]) {
      crew.push(gatherer[menu][eachMember]);
      document.querySelectorAll("input").forEach((e) => (e.checked = false));
    }
    gatherer[menu] = [];
    updateTotal(menu);
  });

  for (let eachPerson in crewTotal) {
    let isNotIdle = false;
    for (let eachMenu in gatherer) {
      if (eachMenu == menu) {
        continue;
      }
      for (let eachConnard in gatherer[eachMenu]) {
        if (
          crewTotal[eachPerson]["id"] == gatherer[eachMenu][eachConnard]["id"]
        ) {
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

    personImage.src = "../../" + crewTotal[eachPerson]["image"];
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

        if (["water", "food", "morale"].includes(menu)) {
          let bonus = 0;
          if ("skills" in allTraits[eachTrait]) {
            if ("gatheringAbs" in allTraits[eachTrait]["skills"]) {
              bonus += allTraits[eachTrait]["skills"]["gatheringAbs"];
            }
            if (menu + "GatheringAbs" in allTraits[eachTrait]["skills"]) {
              bonus += allTraits[eachTrait]["skills"][menu + "GatheringAbs"];
            }
          }
          if (bonus > 0) {
            nodeTrait.style.backgroundColor = "LightGreen";
          } else if (bonus < 0) {
            nodeTrait.style.backgroundColor = "LightPink";
          }
        } else if (menu == "scout") {
          if ("vision" in allTraits[eachTrait]) {
            if (allTraits[eachTrait]["vision"] > 0) {
              nodeTrait.style.backgroundColor = "LightGreen";
            } else if (allTraits[eachTrait]["vision"] < 0) {
              nodeTrait.style.backgroundColor = "LightPink";
            }
          }
        } else if (menu == "carrier") {
          if ("vision" in allTraits[eachTrait]) {
            if (allTraits[eachTrait]["carryValue"] > 0) {
              nodeTrait.style.backgroundColor = "LightGreen";
            } else if (allTraits[eachTrait]["carryValue"] < 0) {
              nodeTrait.style.backgroundColor = "LightPink";
            }
          }
        }
      }
    }

    if (["water", "food", "morale"].includes(menu)) {
      let ressourcesObtained =
        playerLocation["gatheringValues"][menu + "Yield"] *
          (crewTotal[eachPerson]["skills"]["gatheringFactor"] +
            crewTotal[eachPerson]["skills"][menu + "GatheringFactor"]) +
        crewTotal[eachPerson]["skills"]["gatheringAbs"] +
        crewTotal[eachPerson]["skills"][menu + "GatheringAbs"];
      let ressourceText = document.createElement("p");
      if (ressourcesObtained > 0) {
        ressourceText.innerHTML = "+";
        ressourceText.style.color = "green";
      } else if (ressourcesObtained < 0) {
        ressourceText.innerHTML = "-";
        ressourceText.style.color = "red";
      } else {
        ressourceText.innerHTML = "";
        ressourceText.style.color = "grey";
      }
      ressourceText.innerHTML += String(ressourcesObtained);
      endRowPerson.appendChild(ressourceText);
    } else if (menu == "carrier") {
      let carryText = document.createElement("p");
      carryText.innerHTML = String(crewTotal[eachPerson]["carryValue"]);
      endRowPerson.appendChild(carryText);
    } else if (menu == "scout") {
      let carryText = document.createElement("p");
      carryText.innerHTML = String(crewTotal[eachPerson]["vision"]);
      endRowPerson.appendChild(carryText);
    }

    if (["row1", "row2", "row3"].includes(menu)) {
      let weaponEquipButton = document.createElement("button");
      weaponEquipButton.setAttribute(
        "id",
        "weaponEquip" + crewTotal[eachPerson]["id"]
      );
      weaponEquipButton.classList.add("weaponEquipButton");
      weaponEquipButton.addEventListener("click", function () {
        showItemInventory("weapon", this.id);
      });
      endRowPerson.appendChild(weaponEquipButton);
      let armorEquipButton = document.createElement("button");
      armorEquipButton.setAttribute(
        "id",
        "armor-Equip" + crewTotal[eachPerson]["id"]
      );
      armorEquipButton.classList.add("armorEquipButton");
      armorEquipButton.addEventListener("click", function () {
        showItemInventory("armor", this.id);
      });
      endRowPerson.appendChild(armorEquipButton);
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
    } else if (menu == "row1") {
      attributionCheck.addEventListener("click", function () {
        row1Check(this.id);
      });
    } else if (menu == "row2") {
      attributionCheck.addEventListener("click", function () {
        row2Check(this.id);
      });
    } else if (menu == "row3") {
      attributionCheck.addEventListener("click", function () {
        row3Check(this.id);
      });
    }
  }
}

// ---------- END FUNCTIONS INITIALIZATION ----------

// ---------- START FUNCTIONS CALLING ----------

function removeAssignedCrew() {
  if (!("waterYield" in playerLocation["gatheringValues"])) {
    for (let eachG in gatherer["water"]) {
      crew.push(gatherer["water"][eachG]);
    }
    gatherer["water"] = [];
  }
  if (!("foodYield" in playerLocation["gatheringValues"])) {
    for (let eachG in gatherer["food"]) {
      crew.push(gatherer["food"][eachG]);
    }
    gatherer["food"] = [];
  }
  if (!("moraleYield" in playerLocation["gatheringValues"])) {
    for (let eachG in gatherer["morale"]) {
      crew.push(gatherer["morale"][eachG]);
    }
    gatherer["morale"] = [];
  }
}

function onLoad() {
  removeAssignedCrew();
  console.log("Status", statusTurn);
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
        document
          .querySelectorAll(".active")
          .forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
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
        document
          .querySelectorAll(".active")
          .forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
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
        document
          .querySelectorAll(".active")
          .forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
        createMemberAndAssign("morale");
      });
      roleDiv.appendChild(newButton);
    }

    let roleList = ["scout", "guard"];
    roleList.forEach((e) => {
      let newButton = document.createElement("button");
      newButton.setAttribute("id", "role" + Capitalize(e));
      newButton.textContent = Capitalize(e);
      newButton.addEventListener("click", function () {
        document
          .querySelectorAll(".active")
          .forEach((e) => e.classList.remove("active"));
        this.classList.add("active");
        createMemberAndAssign(e);
      });
      roleDiv.appendChild(newButton);
    });
    createMemberAndAssign("scout");
  } else if (statusTurn == "deployCarrier") {
    confirmationBtn.addEventListener("click", () => {
      statusTurn = "deployCarrier";
      saveSessionStorage();
      window.location.href = "../gamePage.html";
    });
    let roleList = ["carrier"];
    roleList.forEach((e) => {
      let newButton = document.createElement("button");
      newButton.setAttribute("id", "role" + Capitalize(e));
      newButton.textContent = Capitalize(e);
      newButton.addEventListener("click", function () {
        createMemberAndAssign(e);
      });
      roleDiv.appendChild(newButton);
    });
    createMemberAndAssign("carrier");
  } else if (statusTurn == "fight") {
    confirmationBtn.addEventListener("click", () => {
      statusTurn = "beginFight";
      saveSessionStorage();
      window.location.href = "../gamePage.html";
    });
    let roleList = ["row1", "row2", "row3"];
    roleList.forEach((e) => {
      let newButton = document.createElement("button");
      newButton.setAttribute("id", "role" + Capitalize(e));
      newButton.textContent = Capitalize(e);
      newButton.addEventListener("click", function () {
        createMemberAndAssign(e);
      });
      roleDiv.appendChild(newButton);
    });
    createMemberAndAssign("row1");
  }
}

onLoad();
displayResources();

// ---------- END FUNCTIONS CALLING ----------
