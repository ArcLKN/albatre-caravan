//Crew related variables
let crew = [
  {
    name: "Joanne",
    lastName: "Andriamahandry",
    Age: 18,
    Sex: "Female",
  },
  {
    name: "Neyla",
    lastName: "Mazouz",
    Age: 19,
    Sex: "Female",
  },
  {
    name: "Ethan",
    lastName: "Gandiboyina",
    Age: 19,
    Sex: "Male",
  },
  {
    name: "Raphael",
    lastName: "Greiner",
    Age: 19,
    Sex: "Male",
  },
];
let crewTypes = {
  scouts: 0,
  guards: 0,
  carriers: 0, // Free crew becomes carriers to carry more goods.
};
let crewTotal = crew.length;
let idleCrew; // Number of remaining people to distribute.
let crewList = document.getElementById("crewMembers");
let displayCrewTotal = document.getElementById("crew-total");

//Inventory variable
let inventory = [];
let displayHorseTotal = document.getElementById("horse-total");
let displayWeaponTotal = document.getElementById("weapon-total");

//Display the total of crew members
displayCrewTotal.innerHTML = `Crew: ${crewTotal}` + " | ";

// !!! METTRE LES VALEURS !!!
displayHorseTotal.innerHTML = " " + `Horses: ` + " | ";
displayWeaponTotal.innerHTML = " " + `Weapons: `;

//Function that create a member component (his image, his informations, his role...)
function createMember() {
  for (let eachPerson in crew) {
    let person = document.createElement("div");
    let personAbout = document.createElement("div");
    let attributionContainer = document.createElement("div");
    let personImage = document.createElement("img");
    let personFullName = document.createElement("span");
    let attributionCheck = document.createElement("input");

    person.classList.add("member");
    personAbout.classList.add("member-about");
    attributionContainer.classList.add("checkbox");
    personImage.src = "personImage-" + eachPerson + ".jpg";
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

function roleAttribution() {}

createMember();
roleAttribution();
