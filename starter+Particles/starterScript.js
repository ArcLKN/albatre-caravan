function save(varName, value) {
	console.log(typeof value);
	if (typeof value == "number") {value = String(value);}
	else if (typeof value == "object") {value = JSON.stringify(value);}
	else if (typeof value == "boolean") {value = String(value);}

	sessionStorage.setItem(String(varName), value);
}

// Define starting values.
function initSessionStorage () {
	// Number of people player has, thus number of people he can use.
	save("crewTotal", 10);
	// Distribution of the crew, the total can't be > crewTotal.
	save("crewTypes", {scouts: 0,guards: 0,carriers: 0}); // Free crew can become carriers to carry more goods.
	save("idleCrew", 10); // Number of remaining people to distribute.
	save("morale", 10);
	save("money", 10);
	save("authority", 10);
	save("water", 10);
	save("numberOfTurns", 0);
	save("famineTurns", 0);
	save("inventory", [{name: "food", quantity: 0}]);
	save("playerLocation", {
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
	});
	save("gatherer", {water: 0,food: 0,morale: 0})
}

function goPlay() {
	window.location.href = "../cinematicPage/cinematic.html";
}

document.getElementById("play").onclick = goPlay;
initSessionStorage();