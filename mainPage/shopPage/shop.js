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
  argent = parseInt(sessionStorage.getItem("money"));
  water = parseInt(sessionStorage.getItem("water"));
  inventaire = JSON.parse(sessionStorage.getItem("inventory"));
  playerLocation = JSON.parse(sessionStorage.getItem("playerLocation"));
  gatherer = JSON.parse(sessionStorage.getItem("gatherer"));
  statusTurn = sessionStorage.getItem("statusTurn");
  allItems = JSON.parse(sessionStorage.getItem("allItems"));
}

// All the variables we want to save and share through every JS files.
function saveSessionStorage() {
  save("statusTurn", statusTurn);
  save("money", argent);
  save("water", water);
  save("inventory", inventaire);
  save("playerLocation", playerLocation);
  save("gatherer", gatherer);
}

// Simply used to capitalize a word. let capitalizedWord = Capitalize(the_word_you_want_to_capitalize);
function Capitalize(e) {
  return e[0].toUpperCase() + e.slice(1);
}

// Affiche l'inventaire
function displayInventory(){
	["player", "shop"].forEach(e => {
		let eInventaire;
		if (e == "player") {
			if (!playerLocation['sellableGoods']) {return;}
			eInventaire = inventaire;
		}
		else {
			eInventaire = inventaireMagasin;
		}

		for (let eachItem in eInventaire) {
			let thisItem = allItems[eachItem];
			console.log("Item", eachItem, thisItem);
			console.log(thisItem);
			let itemVolume;
			let itemPrice;
			if (e == "player") {
				console.log("SGoods", playerLocation['sellableGoods'], eachItem);
				if (!playerLocation['sellableGoods'][eachItem]) {
					continue
				}
				itemVolume = eInventaire[eachItem]['volume'];
				itemPrice = playerLocation['sellableGoods'][eachItem]['price'];
			}
			else {
				itemVolume = playerLocation['buyableGoods'][eachItem]['volume'];
				itemPrice = playerLocation['buyableGoods'][eachItem]['price'];
			}

			var nouvelleDiv = document.createElement("div");
			nouvelleDiv.classList.add("BigItem");
			//nouvelleDiv.innerText = "div numéro:"+i;

			var image = document.createElement("img");
			//image.src = thisItem['image']; // Quand les objets auront des images.

			var divname = document.createElement("div");
			divname.classList.add("name");
			divname.innerText = Capitalize(thisItem["name"]);//elem numero i de la liste avec l'attribut "name"
			

			var divquantité = document.createElement("div");
			divquantité.classList.add("quantity");
			if (e == "player") {
				divquantité.setAttribute("id", eachItem+"Qtt");
			}
			else {
				divquantité.setAttribute("id", eachItem+"ShopQtt");
			}
			divquantité.innerText = "Quantité dans l'inventaire : " + itemVolume;
		
			var divprix = document.createElement("div");
			divprix.classList.add("prix");
			divprix.innerText = itemPrice+"$";

			nouvelleDiv.appendChild(image);
			nouvelleDiv.appendChild(divname);
			nouvelleDiv.appendChild(divquantité);
			nouvelleDiv.appendChild(divprix);
			var inputquantité = document.createElement("input");
			inputquantité.classList.add("input");
			inputquantité.type = "number";
			inputquantité.value = 0;
			inputquantité.min = 0;
			if (e == "player") {
				inputquantité.setAttribute("id", eachItem+"Input");
				inputquantité.oninput = function () {
				sellItem(eachItem, this.value);
				inputquantité.max = Math.min(itemVolume, playerLocation['sellableGoods'][eachItem]['volume']);
			};
			}
			else {
				inputquantité.setAttribute("id", eachItem+"ShopInput");
				inputquantité.oninput = function () {
				buyItem(eachItem, this.value);
				};
				inputquantité.max = itemVolume;
			}
		nouvelleDiv.appendChild(inputquantité);
		if (e == "player") {
			var parent = document.getElementById("container");
			parent.appendChild(nouvelleDiv);//ajoute la div ds container
		}
		else {
			var parentM = document.getElementById("containerMagasin");
			parentM.appendChild(nouvelleDiv);//ajoute la div ds container
		}
		
	}
	})
}

let resultat = 0;
const finali = document.querySelector("#finali");

const computeButton = document.querySelector('#compute');
computeButton.onclick = function() {
	checkTransaction();
};
const terminateButton = document.querySelector('#terminer');
terminateButton.onclick = function() {
	statusTurn = "deployUnits";
	saveSessionStorage();
	window.location.href = "../gamePage.html";
};

const continueButton = document.querySelector('#continue');
continueButton.onclick = keepTransa;

let previousValues = {
}
let previousShopValues = {
}

function defPreviousValues () {
	Object.keys(inventaire).forEach(e => previousValues[e] = 0);
	Object.keys(inventaireMagasin).forEach(e => previousShopValues[e] = 0);
}

function sellItem (thisItem, newValue) {
	let resultatNode = document.getElementById("finali");
	resultatNode.textContent = parseInt(resultatNode.textContent) + (newValue - previousValues[thisItem]) * playerLocation["sellableGoods"][thisItem]['price'];
	changeTriangle();
	previousValues[thisItem] = newValue;

	var divquantité = document.getElementById(thisItem+"Qtt");
	var displayQ = divquantité.querySelector(".display-quantity");
	if (!displayQ) {
		displayQ = document.createElement("div");
		displayQ.classList.add("display-quantity");
		divquantité.appendChild(displayQ);
	}
	displayQ.innerText = "You're selling  "+ newValue +"  "+ allItems[thisItem]['name'] ;  
}
function buyItem (thisItem, newValue) {
	
	let thisInput = document.getElementById(thisItem+"ShopInput");
	console.log(thisInput)
	let resultatNode = document.getElementById("finali");
	console.log(resultatNode);
	resultatNode.textContent = parseInt(resultatNode.textContent) - (newValue - previousShopValues[thisItem]) * playerLocation["buyableGoods"][thisItem]['price'];
	console.log(resultatNode.textContent);
	changeTriangle();
	previousShopValues[thisItem] = newValue;
	console.log(newValue);

	var divquantitéM = document.getElementById(thisItem+"ShopQtt");
	var displayQ = divquantitéM.querySelector(".display-quantity");
	if (!displayQ) {
		displayQ = document.createElement("div");
		displayQ.classList.add("display-quantity");
		divquantitéM.appendChild(displayQ);
	}
	displayQ.innerText = "You're buying  "+ newValue +"  "+ allItems[thisItem]['name'] ;
}

// Gère l'affichage de la flèche indiquant qui doit de l'argent à qui
// Manage the display of the arrow indicator of who owns money to who.
function changeTriangle() {
   let resultatNode = document.getElementById("finali");
   let res = parseInt(resultatNode.textContent);
   let triangle = document.getElementById("triangle");
	if (res === 0) { 
		triangle.style.borderColor = "transparent transparent transparent transparent"  
	//on perd de l'argent          
	} else if(res < 0) {     
		res = Math.abs(res);
		//prob avec la valeure absolue
		triangle.style.borderColor = "transparent transparent transparent brown" 
		triangle.style.left = "55%";
	//on gagne de l'argent
	} else { 
		triangle.style.borderColor = "transparent brown transparent transparent";
		triangle.style.left = "41%";
	}
}

// Update values and inventories after comnputation.
function update() {
	let resultatNode = document.getElementById("finali");
	let res = parseInt(resultatNode.textContent);

	//update inventaire

	["player", "shop"].forEach(e => {
		let eInventaire;
		if (e == "player") {
			if (!playerLocation['sellableGoods']) {return;}
			eInventaire = inventaire;
		}
		else {
			eInventaire = inventaireMagasin;
		}
		for(let eachItem in eInventaire) {
			let itemVolume;
			let itemPrice;
			if (e == "player") {
				if (!playerLocation['sellableGoods'][eachItem]) {
					continue
				}
				itemVolume = eInventaire[eachItem]['volume'];
				itemPrice = playerLocation['sellableGoods'][eachItem]['price'];
			}
			else {
				itemVolume = playerLocation['buyableGoods'][eachItem]['volume'];
				itemPrice = playerLocation['buyableGoods'][eachItem]['price'];
			}
			let inputID;
			if (e == "player") {
				inputID = eachItem+"Input";
			}
			else {
				inputID = eachItem+"ShopInput";
			}
			//quantité vendu
			let quantitySold = parseInt(document.getElementById(inputID).value);

			//console.log("quantitySold",quantitySold);
			//console.log("firstQuantity",firstQuantity);
			let nvQuantity = itemVolume - quantitySold;
			//mettre à jour la quantité
			eInventaire[eachItem]["volume"] = nvQuantity;
			// Update max quantity attribute of input.
			
			if (e == "player") {
				document.getElementById(eachItem+"Qtt").innerText = "Quantité dans l'inventaire : "+nvQuantity;
				document.getElementById(inputID).max = Math.min(nvQuantity, playerLocation['sellableGoods'][eachItem]['volume']);
			}
			else {
				if (inventaire[eachItem]) {inventaire[eachItem]["volume"] += quantitySold;}
				else {inventaire[eachItem] = {volume: quantitySold};}
				document.getElementById(eachItem+"ShopQtt").innerText = "Quantité dans l'inventaire : "+nvQuantity;
				document.getElementById(inputID).max = nvQuantity;
			}
			// Reset values
			document.getElementById("finali").innerText = "0";
			defPreviousValues();
			document.getElementById(inputID).value = 0;
		}
	})
}

// Fonction qui demande à l'utilisateur s'il veut continuer ses achats après avoir appuyé sur compute.
// Function that ask the user if he wants to continue shopping.


// Remove transaction recap
function keepTransa(){
	let recap = document.getElementById("recap");
	recap.style.display = "none";
	let texts = document.querySelectorAll(".text");
	texts.forEach(text => text.remove());

}

// Check if player has enough money.
function checkTransaction () {
	let resultatNode = document.getElementById("finali");
	let res = parseInt(resultatNode.textContent);
	if (argent >= res * -1) {
		displayNew();
		update();
	}
}

loadSessionStorage()
var inventaireMagasin = playerLocation["buyableGoods"];
console.log(inventaire);
console.log(inventaireMagasin);
displayInventory();
defPreviousValues();

function displayNew () {
	let recap = document.getElementById("recap");
	recap.style.display = "inline-block";
	let parent = document.getElementById("recap");
	for(let eachItem in inventaire) {
		var newItem = document.createElement("p");
		newItem.classList.add("text");
		let priceItem = 0;
		if (playerLocation['sellableGoods'] && playerLocation['sellableGoods'][eachItem]) {priceItem = playerLocation["sellableGoods"][eachItem]["price"];}

		newItem.textContent = allItems[eachItem]["name"] + "        :       quantity: " + inventaire[eachItem]["volume"];
		parent.appendChild(newItem);
	}
}

/*function displayNew () { //y a update argent dedans aussi
	let recap = document.getElementById("recap");
	recap.style.display = "inline-block";
	let parent = document.getElementById("recap");
	var newItem = document.createElement("p");

	newItem.classList.add("text");
	let money = document.getElementById("résultat");
	//update argent
	
	argent = argent + res;
	money.textContent = argent;

	["player", "shop"].forEach(e => {
		let eInventaire;
		if (e == "player") {
			if (!playerLocation['sellableGoods']) {return;}
			eInventaire = inventaire;
		}
		else {
			eInventaire = inventaireMagasin;
		}
		for(let eachItem in eInventaire) {
			let itemVolume;
			let itemPrice;
			if (e=="player"){
				inputID = eachItem+"Input";
				let quantitySold = parseInt(document.getElementById(inputID).value);
				newItem.textContent = allItems[eachItem]["name"] + ":quantity: " + inventaire[eachItem]["volume"] + "-" + quantity;
			}
			else{
				inputID = eachItem+"ShopInput";
				let quantityBought = parseInt(document.getElementById(inputID).value);
				newItem.textContent = allItems[eachItem]["name"] + ":quantity: " + inventaireMagasin[eachItem]["volume"] + "+" + quantity;
				parent.appendChild(newItem);
			}
		}
	}	
}*/
