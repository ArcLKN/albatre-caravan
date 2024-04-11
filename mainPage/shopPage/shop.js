var inventaire = [ // inventaire à adapter au jeu
    {name: "water", quantité: 15, prix: 5},
    {name: "grass", quantité: 25, prix: 2},
    {name: "air", quantité: 35, prix: 1},
    
    
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

var images = [ //je sais que mes images sont horribles, la on peut placer les images correspondantes aux items de l'inventaire
    "placeholder.jpeg", "placeholder.jpeg", "placeholder.jpeg"

]

var imagesMagasin = [//images des items du magasin
    "placeholder.jpeg", "placeholder.jpeg", "placeholder.jpeg"

]





let lengthInventaire = inventaire.length;

let lengthInventaireMagasin = inventaireMagasin.length;

function displayInventory() {//pas utilisé ici 
    for(let item in inventaire){
        var newItem = document.createElement("p");
        newItem.textContent = inventaire[item]["name"] + inventaire[item]["quantité"] + inventaire[item]["prix"];
        document.body.appendChild(newItem);

    }
}



duplicatediv();

function duplicatediv(){//afficher dans le shop
    for (i=0; i<lengthInventaire; i++){
        var nouvelleDiv = document.createElement("div");
        nouvelleDiv.classList.add("BigItem");
        //nouvelleDiv.innerText = "div numéro:"+i;

        var image = document.createElement("img");
        image.src = images[i];

        var divname = document.createElement("div");
        divname.classList.add("name");
        divname.innerText = inventaire[i]["name"];//elem numero i de la liste avec l'attribut "name"
        

        var divquantité = document.createElement("div");       
        divquantité.classList.add("quantité"+i);
        divquantité.innerText = "Quantité dans l'inventaire: "+inventaire[i]["quantité"];
    
        var divprix = document.createElement("div");
        divprix.classList.add("prix");
        divprix.innerText = inventaire[i]["prix"]+"$";

        nouvelleDiv.appendChild(divprix);
        nouvelleDiv.appendChild(divname);
        nouvelleDiv.appendChild(divquantité);
        

        var inputquantité = document.createElement("input");
        inputquantité.classList.add("input"+i);
        inputquantité.type = "number";
        inputquantité.max = inventaire[i]["quantité"];
        inputquantité.value = 0;
        inputquantité.min = 0;

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
duplicatedivM();

let a = 0;
let prix = 100;
let argent = 100; //valeur à accorder à l'argent qu'on possède dans le jeu
const resultat = document.querySelector("#résultat");
const finali = document.querySelector("#finali");

function vendre() {//flèche du bas pour enlèever de notre inventaire l'objet et donc vendre
    for (let i = 0; i < lengthInventaire; i++) {
        let input = document.querySelector(".input" + i); // Sélectionner l'input correspondant
        let valeurPrix = parseInt(input.value);; // Récupérer la valeur de l'input
        let price = inventaire[i]["prix"]; //Récupérer le prix de l'inventaire
        let divquantité = document.querySelector(".quantité" + i); 

        let divQuantiteAffichee = document.createElement("div");
        //divQuantiteAffichee.textContent = "Quantité: " + valeurPrix; // Initialiser avec la valeur actuelle de la quantité
        divquantité.appendChild(divQuantiteAffichee);

        input.addEventListener("change", function() {//quand on click la fonction se déclanche
            let valeurPrixnv = parseInt(input.value); // Récupérer la nouvelle valeur de l'input

            if (valeurPrixnv > valeurPrix) { //si on click sur la flèche du haut on remet l'item dans l'inventaire donc on gagne pas cet argent donc le prix du ticket augmente
                argent = argent - price;
                console.log("argent en poche:",argent);
                prix = prix + price;
                a = a + price;
                changeColor();
                finali.innerText = a;
                resultat.innerText = prix;
            } else if (valeurPrixnv < valeurPrix) { //si on click sur la flèche du bas on vend un item donc le prix u ticket baisee
                argent = argent + price;
                console.log("argent en poche:",argent);
                prix = prix - price;
                changeColor();
                resultat.innerText = prix; //si le prix est négatif on gagne de l'argent 
            }
            // Mettre à jour la valeur précédente
            valeurPrix = valeurPrixnv;
            inventaire[i].quantité = valeurPrixnv;//mettre à jour la quantité dans l'inventaire
            console.log("quantité dans l'inventaire", inventaire[i].quantité)
            
            divQuantiteAffichee.textContent = "You're selling  " + valeurPrixnv +" "+inventaire[i].name;            
    
        });

    }

}

vendre();//ça marche qu'avec les flèches






function acheter() {
    for (let i = 0; i < lengthInventaireMagasin; i++) {
        let inputM = document.querySelector(".inputM" + i); // Sélectionner l'input correspondant
        let MdivquantitéM = document.querySelector(".Mquantité" + i); // pour pouvoir l'update après

        let divQuantiteAfficheeM = document.createElement("div");
        MdivquantitéM.appendChild(divQuantiteAfficheeM);

        inputM.addEventListener("input", function() {
            let ancienneValeurPrixM = parseInt(inputM.getAttribute('data-old-value')) || 0; // Récupérer l'ancienne valeur de l'input
            let nouvelleValeurPrixM = parseInt(inputM.value) || 0; // Récupérer la nouvelle valeur de l'input
            let priceM = inventaireMagasin[i]["prix"]; //Récupérer le prix de l'article

            let difference = nouvelleValeurPrixM - ancienneValeurPrixM;

            argent -= priceM * Math.abs(difference);

            changeColor();
            resultat.innerText = argent;

            inventaireMagasin2[i].quantité = nouvelleValeurPrixM;
            console.log("quantité achetée", inventaireMagasin2[i].quantité);

            // Mettre à jour l'affichage de la quantité
            divQuantiteAfficheeM.textContent = "You're buying " +  nouvelleValeurPrixM +" "+inventaireMagasin[i].name; 

            newItems();

            // Mettre à jour la valeur de l'attribut data-old-value
            inputM.setAttribute('data-old-value', nouvelleValeurPrixM);
        });
    }
}







acheter();//ça marche pas

    




function newItems() {//met les items achetés dans notre inventaire
    for (let i = 0; i < lengthInventaireMagasin; i++) {
        if (inventaireMagasin2[i].quantité > 0) {
            let itemExists = false;
            for (let j = 0; j < inventaire.length; j++) {
                if (inventaire[j].name === inventaireMagasin[i].name) { //vérifie que l'item existe pas déjà
                    itemExists = true;
                    inventaire[j].quantité = inventaireMagasin2[i].quantité;//s'il existe déja on change juste la quantité de l'élément préexistant 
                    break;
                }
            }
            if (!itemExists) {
                inventaire.push({
                    name: inventaireMagasin[i].name,
                    quantité: inventaireMagasin2[i].quantité,
                    prix: inventaireMagasin[i].prix
                });
            }
        }
    }
    console.log(inventaire);
}




function changeColor() {
    if (prix < 0){
        transa.style.backgroundColor = "red" ;//on gagne de l'argent
    }else{
        transa.style.backgroundColor = "green" ;//on en perd
    }

}
