
// Variables 
let allRecetteList = [];
let meals = [];
let filterWordList =[];


// Récupération des recettes dans recette.JSON
let loadAllRecette = async() => {
    let meals = await fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){
        allRecetteList = data.recipes;
        displayRecettes(data.recipes);
    });
}

// Injection des recette dans HTML en POO
const displayRecettes = (recettes) => {
    const mainSemantic = document.querySelector("main");
    for(item of recettes) {
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        mainSemantic.innerHTML += recette.render();
    };
}

// Affichage des recettes au chargement de la page 
loadAllRecette();



// Récupération des données saisies dans la liste déroulante
let listIngredientNoDoublon = [];
let listAppareilNoDoublon = [];
let listUstensileNoDoublon = [];


// Récupération de la liste d'ingrédient provenant du  JSON
const boucleIngredientListe = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        for(list of recette.ingredients){
            listIngredientRaw.push(list.ingredient);   
        };
        for(element of recette.appliance){
            listAppareilRaw.push(element);
        }
        for(element of recette.ustensils){
            listUstensileRaw.push(element);
        }
    };
   
    // Suppression des doublons   
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);



    // affichage listes déroulante
    /*
    listIngredientNoDoublon.map((element) => {
        return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
    })
    */
    
    listAppareilNoDoublon.map((element) => {
        return searchBarAppareil.innerHTML +=`<option value="${element}">${element}</option>`;
    })

    listUstensileNoDoublon.map((element) => {
        return  searchBarUstensile.innerHTML +=`<option value="${element}">${element}</option>`;
    })

})


// Variables du DOM
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
const selectAppareil = document.getElementById('selectAppareil');
const selectUstensile = document.getElementById('selectUstensile');
const noResultatBloc = document.querySelector('.no-resultat-bloc');
const listeIngredientInjected = document.getElementById('listeIngredientInjected');
const listeAppareilInjected = document.getElementById('listeAppareilInjected');
const listeUstensileInjected = document.getElementById('listeUstensileInjected');

// Liste des éléments brut présent dans le JSON. Attention aux doublons.
let listIngredientRaw = [];
let listAppareilRaw = [];
let listUstensileRaw = [];
let listSearchAnswer = [];


// Cet array contient les mots clés filtrant choisi par l'utilisateur
let filterWordsList = [];
let resultatFilter = [];
let testCompiler = [];
let filterWordListMainBar = [];


// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

// Fonction de supression des mots clés
function deleteKeyWord(list, element){
    capitalizeFirstLetter(element);
    const index = list.indexOf(element)
    if(index > -1 || index === -1){ 
        list.splice(index, 1);
        return list;
    }
}


const filtreTexte = (arr, requete) => {
    return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
    }

// Fonction permettant de faire un string en lettre capitale
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


// Fonction permettant de transformer un array en String
let ingredientIntoString =""
function transformIngredientIntoString(array){
    let IngredientFromPropertyValuesListe = "";
    let propertyValues = [];
    // Dans le tableau ingredient, les elements sont des objets
   
    ingredientIntoString = array.filter((item) => {
        for(element of item.ingredients){ //Pour chaque objet du tableau
            propertyValues = Object.values(element); //Convertir l'objet en Array
            IngredientFromPropertyValuesListe = propertyValues.shift(); // Extraction du premier element de la list ingredient
        }
        return IngredientFromPropertyValuesListe.toLowerCase();
    });
}


let affichageIngredients = "";
// Fonction permettant d'afficher les recettes qui ont été trouvé suite à une recherche

function recetteDisplay(array){

    const mainSemantic = document.querySelector("main");
    mainSemantic.innerHTML ="";

    for(item of array){
        const recetteResultat = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        mainSemantic.innerHTML += recetteResultat.render();
    };
    
}


// Fonction de fermeture des étiquettes filtrantes
function closeCrossFilter() {
    filterWordList.filter((element) => {

        // SUPPRESSION DU MOT CLE APPAREIL
        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlockAppareil = document.getElementById("keyword-block-"+element);
      
        closeBtnAppareilFilter.addEventListener("click", function () {
       

            // supression étiquette HTML
            keywordBlockAppareil.style.display ="none"; 
            deleteKeyWord(filterWordList, element);
          
            // Message si pas de resultat
            noResultatDiplay()

            
            // Application de l'algorithme
            algorithmeFilterCloseCross();

            listApparMiseAJour.unshift(listeApparForDeleteing);
            listeApparForDeleteing.pop();
        })
    
    
        // SUPPRESSION  MOT CLE INGREDIENT
       const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
       const  keywordBlockIngredient = document.getElementById("keyword-block-"+element);
        // Au clic sur la croix d'une etiquette de mot clé
        closeBtnIngredientFilter.addEventListener("click", (e) => {
  
            // supression étiquette HTML
            keywordBlockIngredient.style.display ="none";  // Retrait du visuel etiquette
         
            
            // Message si pas de resultat
            noResultatDiplay();

            // Application de l'algorithme
            algorithmeFilterCloseCross();

            //Retour du mot clé dans la liste 
            console.log(listeIngredForDeleteing);

            /*
            listeIngredForDeleteing.filter((el)=>{
                el !== e.target.id.includes(el);
                return 
            })
            */

            console.log("avant ",listIngredMiseAJour);


         
           listIngredMiseAJour.unshift(listeIngredForDeleteing);

           listeIngredForDeleteing.pop();
        
            console.log("apres",listIngredMiseAJour);
        

            
        })
    
    
        // SUPPRESSION  MOT CLE USTENSILE
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlockUstensile = document.getElementById("keyword-block-"+element);
        
    
         closeBtnUstensileFilter.addEventListener("click", function() {
    
            // supression étiquette HTML
            keywordBlockUstensile.style.display ="none"; 
            listUstensileNoDoublon.push(element);
          

            // Message si pas de resultat
            noResultatDiplay()

            
            // Application de l'algorithme
            algorithmeFilterCloseCross();

            listUstMiseAJour.unshift(listeUstForDeleteing);
            listeUstForDeleteing.pop();
           
        })
    })  

}


// Algorithme pour filtrer les données lorsqu'on clique sur la croix d'un filtre
function algorithmeFilterCloseCross(){
  
    if(filterWordList.length != 0 && userSearchWord.length <= 2 ){
        filterWordList.filter((element) => {

            resultatFilter = allRecetteList.filter((recette) => {
                let resultat = []
            
                for(const ingredient of recette.ingredients)
                    if(
                        ingredient.ingredient.toLowerCase().includes(element) ||
                        recette.appliance.toString().toLowerCase().includes(element) ||
                        recette.ustensils.toString().toLowerCase().includes(element) 
                    ){
                        return resultat
                    }
                
                resultatFilter = resultat
            })
            
        })
    } 

    if(filterWordList.length != 0 && userSearchWord.length >= 3 ){
        filterWordList.filter((element) => {

            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
            
                for(const ingredient of recette.ingredients)
                    if(
                        ingredient.ingredient.toLowerCase().includes(element) ||
                        recette.appliance.toString().toLowerCase().includes(element) ||
                        recette.ustensils.toString().toLowerCase().includes(element) 
                    ){
                        return resultat
                    }
                
                resultatFilter = resultat
            })
            
        })
    } 

    if(filterWordList.length === 0 && userSearchWord.length >= 3 ){
        resultatFilter = allRecetteList.filter((recette) => {
            let resultat = [];
            for(const ingredient of recette.ingredients)
                if(
                    ingredient.ingredient.toLowerCase().includes(userSearchWord) ||
                    recette.name.toLowerCase().includes(userSearchWord) ||
                    recette.appliance.toString().toLowerCase().includes(userSearchWord) ||
                    recette.ustensils.toString().toLowerCase().includes(userSearchWord) 
                ){
                    return resultat
                }
            
            resultatFilter = resultat
        })
       
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 && userSearchWord.length <= 2){
        recetteDisplay(allRecetteList);
    }
}




// Affichage "auncun résultat ne correspond à votre recherche"
function noResultatDiplay(){
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    } else{
        noResultatBloc.innerHTML = "";
    }
}
     
// Variable renvoyant un message d'erreur si aucun résultat ne correspond à la recherche 
const NoResultatForResearch = `<h3 class ="no-resultat-by-searchbar"> AUCUNE RECETTE NE CORRESPOND A VOTRE RECHERCHE <h3>`

let ingredientTest ="";

