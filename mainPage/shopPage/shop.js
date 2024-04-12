var inventaire = [ // inventaire à adapter au jeu
    {name: "water", quantité: 15, prix: 5},
    {name: "grass", quantité: 25, prix: 2},
    {name: "air", quantité: 35, prix: 1},
    {name: "neyla", quantité: 5, prix: 10},
    
];



var inventaireMagasin = [ //same here 
    {name: "sword", quantité: 15, prix: 5},
    {name: "papyrus", quantité: 25, prix: 2},
    {name: "shield", quantité: 35, prix: 1}
]

var inventaireMagasin2 = [ //juste la pour être modifié les quantités à mettre dans notre inventaire en vrai je pense pas que ça soir necessaire j'avais juste peur de foutre le bordel 
    {name: "sword", quantité: 0, prix: 5},
    {name: "papyrus", quantité: 0, prix: 2},
    {name: "shield", quantité: 0, prix: 1}
]

//je sais que mes images sont horribles, la on peut placer les images correspondantes aux items de l'inventaire
var images = [
    "placeholder.jpeg", "placeholder.jpeg", "placeholder.jpeg"

]

//images des items du magasin
var imagesMagasin = [
    "placeholder.jpeg", "placeholder.jpeg", "placeholder.jpeg"

]

let lengthInventaire = inventaire.length;

let lengthInventaireMagasin = inventaireMagasin.length;

// Affiche l'inventaire
function displayInventory(){
    for (let eachItem in inventaire) {
        let thisItem = inventaire[eachItem];
        var nouvelleDiv = document.createElement("div");
        nouvelleDiv.classList.add("BigItem");
        //nouvelleDiv.innerText = "div numéro:"+i;

        var image = document.createElement("img");
        //image.src = thisItem['image']; // Quand les objets auront des images.

        var divname = document.createElement("div");
        divname.classList.add("name");
        divname.innerText = thisItem["name"];//elem numero i de la liste avec l'attribut "name"
        

        var divquantité = document.createElement("div");
        divquantité.classList.add("quantity");
        divquantité.setAttribute("id", "idQtt"+thisItem['name']);
        divquantité.innerText = "Quantité dans l'inventaire : " + thisItem["quantité"];
    
        var divprix = document.createElement("div");
        divprix.classList.add("prix");
        divprix.innerText = thisItem["prix"]+"$";

        nouvelleDiv.appendChild(divprix);
        nouvelleDiv.appendChild(divname);
        nouvelleDiv.appendChild(divquantité);
        

        var inputquantité = document.createElement("input");
        inputquantité.classList.add("input");
        inputquantité.setAttribute("id", thisItem['name']+"Input");
        inputquantité.type = "number";
        inputquantité.max = thisItem["quantité"];
        inputquantité.value = 0;
        inputquantité.min = 0;
        inputquantité.oninput = function () {
        sellItem(thisItem, this.value);
      };

        divquantité.appendChild(inputquantité);
        
        var parent = document.getElementById("container");
        parent.appendChild(image);
        parent.appendChild(nouvelleDiv);//ajoute la div ds container
        
    }
}
//Affiche l'inventaire du magasin
function displayInventoryShop(){
    for (let eachItem in inventaireMagasin){
        let thisItem = inventaireMagasin[eachItem];
        var nouvelleDivM = document.createElement("div");
        nouvelleDivM.classList.add("BigItem");
        //nouvelleDivM.innerText = "div numéro:"+i;

        var imageM = document.createElement("img");
        //image.src = imagesMagasin[i];

        var divnameM = document.createElement("div");
        divnameM.classList.add("name");
        divnameM.innerText = thisItem["name"];//elem numero i de la liste avec l'attribut "name"
        
        var divquantitéM = document.createElement("div");       
        divquantitéM.classList.add("quantity");
        divquantitéM.setAttribute("id", "idQtt"+thisItem['name']);
        divquantitéM.innerText = "Quantité dans le magasin: "+thisItem["quantité"];
    
        var divprixM = document.createElement("div");
        divprixM.classList.add("prix");
        divprixM.innerText = thisItem["prix"]+"$";

        nouvelleDivM.appendChild(divprixM);
        nouvelleDivM.appendChild(divnameM);
        nouvelleDivM.appendChild(divquantitéM);
        

        var inputquantitéM = document.createElement("input");
        inputquantitéM.classList.add("input");
        inputquantitéM.setAttribute("id", thisItem['name']+"ShopInput");
        inputquantitéM.type = "number";
        inputquantitéM.max = thisItem["quantité"];
        inputquantitéM.value = 0;
        inputquantitéM.min = 0;
        inputquantitéM.oninput = function () {
            buyItem(thisItem, this.value);
          };

        divquantitéM.appendChild(inputquantitéM);
        
        var parentM = document.getElementById("containerMagasin");
        parentM.appendChild(imageM);
        parentM.appendChild(nouvelleDivM);//ajoute la div ds container
    }
}
displayInventory();
displayInventoryShop();


let resultat = 0;
const finali = document.querySelector("#finali");

let previousValues = {

}

let previousShopValues = {

}


function defPreviousValues () {
    inventaire.forEach(e => previousValues[e['name']] = 0);
    inventaireMagasin.forEach(e => previousShopValues[e['name']] = 0);
}
defPreviousValues();


function sellItem (thisItem, newValue) {
    let thisInput = document.getElementById(thisItem['name']+"Input");
    let resultatNode = document.getElementById("finali");
    resultatNode.textContent = parseInt(resultatNode.textContent) + (newValue - previousValues[thisItem['name']]) * thisItem['prix'];
    changeTriangle();
    previousValues[thisItem['name']] = newValue;

    var divquantité = document.getElementById("idQtt"+thisItem['name']);
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
    resultatNode.textContent = parseInt(resultatNode.textContent) - (newValue - previousShopValues[thisItem['name']]) * thisItem['prix'];
    console.log(resultatNode.textContent);
    changeTriangle();
    previousShopValues[thisItem['name']] = newValue;
    console.log(newValue);

    var divquantitéM = document.getElementById("idQtt"+thisItem['name']);
    var displayQ = divquantitéM.querySelector(".display-quantity");
    if (!displayQ) {
        displayQ = document.createElement("div");
        displayQ.classList.add("display-quantity");
        divquantitéM.appendChild(displayQ);
    }
    displayQ.innerText = "You're buying  "+ newValue +"  "+ thisItem['name'] ;
    
}


function changeTriangle() {
   let resultatNode = document.getElementById("finali");
   let res = parseInt(resultatNode.textContent);
   let triangle = document.getElementById("triangle");
    if (res === 0){ 
        triangle.style.borderColor = "transparent transparent transparent transparent"  
    //on perd de l'argent          
    }else if(res < 0){     
        res = Math.abs(res);
        //prob avec la valeure absolue
        triangle.style.borderColor = "transparent transparent transparent brown" 
        triangle.style.left = "55%";
    //on gagne de l'argent
    }else { 
        triangle.style.borderColor = "transparent brown transparent transparent";
        triangle.style.left = "41%";
    }
    

}

const compute = document.querySelector('#compute');
compute.onclick = function() {
    update();
    newItems();
    displayNew();
};

const con = document.querySelector('#continue');
con.onclick = keepTransa;



function update() {
    let resultatNode = document.getElementById("finali");
    let money = document.getElementById("résultat");
    let res = parseInt(resultatNode.textContent);
    //update argent
    let argent = 100;
    argent= argent + res;
    money.textContent = argent
    //update inventaire
    for(let eachItem in inventaire){
        let thisItem = inventaire[eachItem];
        let inputID = thisItem['name']+"Input";
        let inputElement = document.getElementById(inputID);
        //quantité vendu
        let quantitySold = parseInt(inputElement.value);
        //quantité de base dans l'inventaire
        let firstQuantity = thisItem["quantité"];
        console.log("quantitySold",quantitySold);
        console.log("firstQuantity",firstQuantity);
        let nvQuantity = firstQuantity - quantitySold;
        //mettre à jour la quantité
        thisItem["quantité"] = nvQuantity;
        console.log(inventaire);

    }
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
                prix: thisItem["prix"]
            });
        }
            
    }console.log(inventaire);
    
}


function displayNew () {
    let recap = document.getElementById("recap");
    recap.style.display = "inline-block";

    let parent = document.getElementById("recap")
    for(let eachItem in inventaire) {
        let thisItem = inventaire[eachItem];
        var newItem = document.createElement("p");
        newItem.classList.add("text");
        newItem.textContent = thisItem["name"] + "        :       quantity: " + thisItem["quantité"]+"        price:  " + thisItem["prix"];
        parent.appendChild(newItem);

    }
}



function keepTransa(){
    let recap = document.getElementById("recap");
    recap.style.display = "none";
    let texts = document.querySelectorAll(".text");
    texts.forEach(text => text.remove());

}
