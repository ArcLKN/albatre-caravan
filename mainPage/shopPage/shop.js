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
  crewMembers = JSON.parse(sessionStorage.getItem("crewMembers"));
  money = parseInt(sessionStorage.getItem("money"));
  water = parseInt(sessionStorage.getItem("water"));
  inventaire = JSON.parse(sessionStorage.getItem("inventory"));
  playerLocation = JSON.parse(sessionStorage.getItem("playerLocation"));
  gatherer = JSON.parse(sessionStorage.getItem("gatherer"));
  statusTurn = sessionStorage.getItem("statusTurn");
}

// All the variables we want to save and share through every JS files.
function saveSessionStorage() {
  save("statusTurn", statusTurn);
  save("crewMembers", crewMembers);
  save("money", money);
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
            eInventaire = inventaire;
        }
        else {
            eInventaire = inventaireMagasin;
        }

        for (let eachItem in eInventaire) {
            let isSellable = false;
            let thisItem = eInventaire[eachItem];
            console.log(thisItem);
            let sellableItem;
            if (e == "player") {
                for (let eachSellableItem in playerLocation['sellableGoods']) {
                    if (playerLocation['sellableGoods']['name'] == thisItem['name']) {
                        let sellableItem = playerLocation['sellableGoods'];
                        isSellable = true;
                    }
                }
                if (!isSellable) {
                    continue
                }
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
                divquantité.setAttribute("id", thisItem['name']+"Qtt");
            }
            else {
                divquantité.setAttribute("id", thisItem['name']+"ShopQtt");
            }
            divquantité.innerText = "Quantité dans l'inventaire : " + thisItem["volume"];
        
            var divprix = document.createElement("div");
            divprix.classList.add("prix");
            divprix.innerText = thisItem["price"]+"$";

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
                inputquantité.setAttribute("id", thisItem['name']+"Input");
                inputquantité.oninput = function () {
                sellItem(thisItem, this.value);
                inputquantité.max = Math.min(thisItem["volume"], sellableItem['volume']);
            };
            }
            else {
                inputquantité.setAttribute("id", thisItem['name']+"ShopInput");
                inputquantité.oninput = function () {
                buyItem(thisItem, this.value);
                };
                inputquantité.max = thisItem["volume"];
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
    update();
    newItems();
    displayNew();
};
const terminateButton = document.querySelector('#terminer');
terminateButton.onclick = function() {
    statusTurn = "trade";
    saveSessionStorage();
    window.location.href = "../gamePage.html";
};

const continueButton = document.querySelector('#continue');
continueButton.onclick = keepTransa;

let argent = 100;

let previousValues = {
}
let previousShopValues = {
}

function defPreviousValues () {
    inventaire.forEach(e => previousValues[e['name']] = 0);
    inventaireMagasin.forEach(e => previousShopValues[e['name']] = 0);
}

function sellItem (thisItem, newValue) {
    let resultatNode = document.getElementById("finali");
    resultatNode.textContent = parseInt(resultatNode.textContent) + (newValue - previousValues[thisItem['name']]) * thisItem['price'];
    changeTriangle();
    previousValues[thisItem['name']] = newValue;

    var divquantité = document.getElementById(thisItem['name']+"Qtt");
    var displayQ = divquantité.querySelector(".display-quantity");
    if (!displayQ) {
        displayQ = document.createElement("div");
        displayQ.classList.add("display-quantity");
        divquantité.appendChild(displayQ);
    }
    displayQ.innerText = "You're selling  "+ newValue +"  "+ thisItem['name'] ;  
}
function buyItem (thisItem, newValue) {
    
    let thisInput = document.getElementById(thisItem['name']+"ShopInput");
    console.log(thisInput)
    let resultatNode = document.getElementById("finali");
    console.log(resultatNode);
    resultatNode.textContent = parseInt(resultatNode.textContent) - (newValue - previousShopValues[thisItem['name']]) * thisItem['price'];
    console.log(resultatNode.textContent);
    changeTriangle();
    previousShopValues[thisItem['name']] = newValue;
    console.log(newValue);

    var divquantitéM = document.getElementById(thisItem['name']+"ShopQtt");
    var displayQ = divquantitéM.querySelector(".display-quantity");
    if (!displayQ) {
        displayQ = document.createElement("div");
        displayQ.classList.add("display-quantity");
        divquantitéM.appendChild(displayQ);
    }
    displayQ.innerText = "You're buying  "+ newValue +"  "+ thisItem['name'] ;
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
    let money = document.getElementById("résultat");
    let res = parseInt(resultatNode.textContent);
    //update argent
    
    argent= argent + res;
    money.textContent = argent;
    //update inventaire

    ["player", "shop"].forEach(e => {
        let eInventaire;
        if (e == "player") {
            eInventaire = inventaire;
        }
        else {
            eInventaire = inventaireMagasin;
        }
        for(let eachItem in eInventaire) {
            let thisItem = eInventaire[eachItem];
            let isSellable = false;
            let sellableItem;
            if (e == "player") {
                for (let eachSellableItem in playerLocation['sellableGoods']) {
                    if (playerLocation['sellableGoods']['name'] == thisItem['name']) {
                        let sellableItem = playerLocation['sellableGoods'];
                        isSellable = true;
                    }
                }
                if (!isSellable) {
                    continue
                }
            }
            let inputID;
            if (e == "player") {
                inputID = thisItem['name']+"Input";
            }
            else {
                inputID = thisItem['name']+"ShopInput";
            }
            //quantité vendu
            let quantitySold = parseInt(document.getElementById(inputID).value);

            //quantité de base dans l'inventaire
            let firstQuantity = thisItem["volume"];
            //console.log("quantitySold",quantitySold);
            //console.log("firstQuantity",firstQuantity);
            let nvQuantity = firstQuantity - quantitySold;
            //mettre à jour la quantité
            thisItem["volume"] = nvQuantity;
            // Update max quantity attribute of input.
            
            if (e == "player") {
                document.getElementById(thisItem['name']+"Qtt").innerText = "Quantité dans l'inventaire : "+nvQuantity;
                document.getElementById(inputID).max = min(nvQuantity, sellableItem['volume']);
            }
            else {
                document.getElementById(thisItem['name']+"ShopQtt").innerText = "Quantité dans l'inventaire : "+nvQuantity;
                document.getElementById(inputID).max = nvQuantity;
            }
            // Reset values
            document.getElementById("finali").innerText = "0";
            defPreviousValues();
            document.getElementById(inputID).value = 0;
        }
    })
}

function newItems(){
    for(let eachItem in inventaireMagasin){
        let thisItem = inventaireMagasin[eachItem];
        let inputID = thisItem['name']+"ShopInput";
        let inputElement = document.getElementById(inputID);
        //quantité achetée
        let quantityBought = parseInt(inputElement.value);
        if (quantityBought>0){
            inventaire.push({
                name: thisItem["name"],
                quantité: quantityBought,
                prix: thisItem["price"]
            });
        }
    }
    console.log("INV", inventaire);
}

// Fonction qui demande à l'utilisateur s'il veut continuer ses achats après avoir appuyé sur compute.
// Function that ask the user if he wants to continue shopping.
function displayNew () {
    let recap = document.getElementById("recap");
    recap.style.display = "inline-block";
    let parent = document.getElementById("recap")
    for(let eachItem in inventaire) {
        let thisItem = inventaire[eachItem];
        var newItem = document.createElement("p");
        newItem.classList.add("text");
        newItem.textContent = thisItem["name"] + "        :       quantity: " + thisItem["volume"]+"        price:  " + thisItem["price"];
        parent.appendChild(newItem);
    }
}

// Remove transaction recap
function keepTransa(){
    let recap = document.getElementById("recap");
    recap.style.display = "none";
    let texts = document.querySelectorAll(".text");
    texts.forEach(text => text.remove());

}

loadSessionStorage()
var inventaireMagasin = playerLocation["buyableGoods"];
console.log(inventaire);
console.log(inventaireMagasin);
displayInventory();
defPreviousValues();