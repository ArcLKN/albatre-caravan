var inventaire = [ // inventaire à adapter au jeu
    {name: "water", quantité: 15, prix: 5},
    {name: "grass", quantité: 25, prix: 2},
    {name: "air", quantité: 35, prix: 1},
    {name: "Neyla", quantité: 5, prix: 10},
    
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
function duplicatedivM(){
    for (i=0; i<lengthInventaireMagasin; i++){
        var nouvelleDivM = document.createElement("div");
        nouvelleDivM.classList.add("BigItem");
        //nouvelleDivM.innerText = "div numéro:"+i;

        var image = document.createElement("img");
        image.src = imagesMagasin[i];

        var divnameM = document.createElement("div");
        divnameM.classList.add("name");
        divnameM.innerText = inventaireMagasin[i]["name"];//elem numero i de la liste avec l'attribut "name"
        
        var divquantitéM = document.createElement("div");       
        divquantitéM.classList.add("Mquantité"+i);
        divquantitéM.innerText = "Quantité dans le magasin: "+inventaireMagasin[i]["quantité"];
    
        var divprixM = document.createElement("div");
        divprixM.classList.add("prix");
        divprixM.innerText = inventaireMagasin[i]["prix"]+"$";

        nouvelleDivM.appendChild(divprixM);
        nouvelleDivM.appendChild(divnameM);
        nouvelleDivM.appendChild(divquantitéM);
        

        var inputquantitéM = document.createElement("input");
        inputquantitéM.classList.add("inputM"+i);
        inputquantitéM.type = "number";
        inputquantitéM.max = inventaireMagasin[i]["quantité"];
        inputquantitéM.value = 0;
        inputquantitéM.min = 0;

        divquantitéM.appendChild(inputquantitéM);
        
        var parentM = document.getElementById("containerMagasin");
        parentM.appendChild(image);
        parentM.appendChild(nouvelleDivM);//ajoute la div ds container
    }
}
displayInventory();
duplicatedivM();

let a = 0; // ???
let argent = 100; //valeur à accorder à l'argent qu'on possède dans le jeu
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
    previousValues[thisItem['name']] = newValue;
    changeColor();
}

function buyItem (thisItem, newValue) {
    let thisInput = document.getElementById(thisItem['name']+"ShopInput");
    let resultatNode = document.getElementById("finali");
    resultatNode.textContent = parseInt(resultatNode.textContent) - (newValue - previousValues[thisItem['name']]) * thisItem['prix'];
    previousValues[thisItem['name']] = newValue;
    changeColor();
}


function changeColor() {
    if (prix < 0){
        transa.style.backgroundColor = "red" ;//on gagne de l'argent
    }else{
        transa.style.backgroundColor = "green" ;//on en perd
    }

}
