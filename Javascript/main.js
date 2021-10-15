/*---------------------------------------------------*/
/*------------Barre de recherche principal ----------*/
/*---------------------------------------------------*/

// Récupération des caractères dans la Search Bar 
const searchBarinput = document.getElementById('searchBarInput');
searchBarinput.addEventListener('keyup', (e) => {
    console.log(e.target.value);
})

/*---------------------------------------------------*/
/*------------Filtre par ingrédient -----------------*/
/*---------------------------------------------------*/

// Liste déroulante INGREDIENTS 
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
let ingredientKeys = '';

// Array qui contient la totalité des ingrédients présent dans le JSON
let arrayIngredient = [];

// Cet array contient les mots clés 
let filterWordsList = [];

// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}
// Récupération des données saisies dans la liste déroulante
let ingredientSansDoublon = [];

// Récupération de la liste d'ingrédient provenant du  JSON
const boucleIngrédient = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        for(list of recette.ingredients){
            arrayIngredient.push(list.ingredient);   
        };
    };

    // Suppression des doublons   
    let ingredientSansDoublon = deleteDoublon(arrayIngredient);
    // affichage Ecran de la liste déroulante
    for(element of ingredientSansDoublon){
        selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`
    }
})

console.log('Liste des ingredient avant traitement :', arrayIngredient)


/*--- BOUTON LISTE DEROULANTE INGREDIENT ----*/
searchBarIngredient.addEventListener('keyup',(e) => {
    
    /*--- Récupération des éléments dans la barre de saisie de l'utilisateur----*/
    let inputIngredientBtn = e.target.value;
    console.log("searchBarIngredient :", inputIngredientBtn);
   
    /*--- Remplissage de la liste de filtre ----*/
    let ingredientSansDoublon = deleteDoublon(arrayIngredient);
    for(element of ingredientSansDoublon){
        if(inputIngredientBtn === element){
            filterWordsList.push(inputIngredientBtn);
        }
    }
    console.log("Liste mise avant retrait du mot choisi", ingredientSansDoublon);
     /*--- Traitement des mots clés ----*/
    for(element of filterWordsList){
        // Retrait de l'ingrédient choisi dans la liste d'ingrédient générale
        const index = ingredientSansDoublon.indexOf(element)
        if(index > -1){ 
            ingredientSansDoublon.splice(index, 1);
        }
        // Affichage de l'ingredient choisi en étiquette HTML
        if(element === inputIngredientBtn){
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block">${element}<i id="close-Btn-${element}" class="far fa-times-circle"></i></div> `
            searchBarIngredient.value="";
        }
    }

    console.log("Liste mise à jour apres retrait mot choisi", ingredientSansDoublon);
   
    /*--- Suppression des éléments choisis dans la liste ----*/
    selectIngredient.innerHTML ="";
    for(element of ingredientSansDoublon){
        selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`
    }

    console.log("filterWords", filterWordsList);
});



/*--------------------------------------------------------------------------*/
/*------------Filtre par ustensile-------------------------------------------*/
/*-------------------------------------------------------------------------*/

// Sortie JSON
const mainSemantic = document.querySelector("main");
const loadRecette = fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){

        // Boucle création d'un nouvel objet recette
        for(item of data.recipes) {
            const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);

            // Création d'un squelette HTML pour chaque recette 
            mainSemantic.innerHTML +=`
            <article>
            <div class="illustrationRecette"></div>
            <div class="titreTempsCuisson"> 
                <h3>${recette.name}</h3>
                <div class ="tempsCuisson">
                    <img class="timerClock" src="Maquettes/timer.png"></img>
                    <p>${recette.time} min</p>
                </div>
            
            </div>
            <div class="description-card">
                <div class="liste-ingredient" id ="liste-ingredient-id-${recette.id}"></div>
                <p class="description-recette">${recette.description}</p>
            </div>
            </article>
            `
            // Affichage des ingrédients 
            for(ingredient of recette.ingredients){
            // Factory méthode pour l'affichage des données si UNIT ou QUANTITY sont undefined
            function generateUnit(){
                if(ingredient.unit == undefined){
                    return `<p class="ingredients"> ${ingredient.ingredient} : ${ingredient.quantity}</p>`;
                } else if (ingredient.quantity == undefined){
                    return `<p class="ingredients"> ${ingredient.ingredient}</p>`;
                }
                return `<p class="ingredients"> ${ingredient.ingredient} : ${ingredient.quantity}  ${ingredient.unit} </p>` ;
            }
            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
            listIngred.innerHTML +=`${generateUnit()}` ;
        };
    };
    
});