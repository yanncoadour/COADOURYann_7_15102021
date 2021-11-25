let ingredientListe = [];
let listIngredMiseAJour = [];
let  listeIngredForDeleteing = [];

const liFromSearch = document.querySelectorAll('.li');
const blocListIngred = document.getElementById('bloc-liste-ingredient');



// Liste filtre avec tous les ingrédients 
searchBarIngredient.addEventListener('click', (e) => {

    // Importer la liste des ingrédients brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);

    // Affichage des ingrédient dès l'ouverture du filtre 
    listIngredientNoDoublon.map((element) => {
        return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
    })
    ingredientListe.push(listIngredientNoDoublon);
    

    // Ecouteur d'évenement : sur chaque ingrédient de la liste
        for(element of listIngredientNoDoublon){
            const elementIngredient = document.getElementById(element);
            elementIngredient.addEventListener('click',(e)=> {
    
                // Variable correspondant a l'ingrédient choisi par l'utilisateur directement dans la liste
                let ingredSelectByUser = e.target.id;
    
                // L'ingrédient selectionné par l'utilisateur va remplir une liste de filtre commun à tous les filtres
                filterWordList.push(ingredSelectByUser.toLowerCase());
                listeIngredForDeleteing.push(ingredSelectByUser.toLowerCase())
    
                // Générer un tag pour signifier à l'utilisateur que le filtre qu'il à choisi est actif 
                const keyWordSelect = document.getElementById('keyWordSelect');
                for(element of listIngredientNoDoublon){
                    if(element === ingredSelectByUser){
                        keyWordSelect.innerHTML +=`<div class="keyword-block-bleu" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `;
                    }
                } 
    
        
                // Mise à jour des éléments de la liste suite au choix d'ingrédient de l'utilisateur 
                if(listeIngredForDeleteing.length === 1){
                    listeIngredForDeleteing.filter((element) =>{
                        for(const item of listIngredientNoDoublon){
                            if(item.toLowerCase() === element){
                                listeIngredientInjected.innerHTML = "";
                                listIngredMiseAJour = listIngredientNoDoublon.filter((ingred) => ingred !== ingredSelectByUser);
                                listIngredMiseAJour.map((element) => {
                                    return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }
                if(listeIngredForDeleteing.length >= 2){
                    listeIngredForDeleteing.filter((element) =>{
                        console.log(listIngredMiseAJour);
                        for(const item of listIngredMiseAJour){
                            if(item.toLowerCase() === element){
                                listeIngredientInjected.innerHTML = "";
                            
                                listIngredMiseAJour = listIngredMiseAJour.filter((ingred) => ingred !== ingredSelectByUser);
                                listIngredMiseAJour.map((element) => {
                                    return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }

                
                
                // Fonction de filtre Algorithme
                filterIngredientAlgorithme();
    
                // Affichage message d'erreur si aucun résultat existe
                noResultatDiplay();
    
                // Fonction pour supprimer une étiquette en cliquant sur la croix 
                closeCrossFilter();
            })
        } 
})
    

    
    
// L'utilsateur recherch un ingrédient à l'aide de la barre de recherche 
searchBarIngredient.addEventListener('keyup', (e) => {
    
    // Déclaration variable correspondant à la recherche
    let filterWordIngredient = e.target.value.toLowerCase();

    // Importer la liste des ingrédients brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);

     // Générer dynamiquement les ingredients selon la recherche utilisateur
    if(filterWordIngredient.length >= 1){
        ingredientListe = listIngredientNoDoublon.filter((ingredient) => {
            if(ingredient.toLowerCase().includes(filterWordIngredient)){
                return ingredientListe
            }
        })
    }

    // Affichage dynamique des ingredients en HTML 
    if(filterWordIngredient.length === 0){
        listeIngredientInjected.innerHTML ="";
        ingredientListe.map((element) => {
            return   listeIngredientInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })
    }

    if(filterWordIngredient.length >= 1){
        listeIngredientInjected.innerHTML ="";
     
        ingredientListe.map((element) => {
            return   listeIngredientInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })
    }
  
    // Affichage HTML 
    if(ingredientListe.length <= 6 ){
        listeIngredientInjected.style.columns = "1";
        blocListIngred.style.width = 200 + "px"
        listeIngredientInjectedContainer.style.width = 212 + "px";
        appareilButton.style.left = 60 +"px";
        ustensileButton.style.right = 370 +"px";

    } else{
        listeIngredientInjected.style.columns = "3"; 
        blocListIngred.style.width = 532 + "px";
        listeIngredientInjectedContainer.style.width = 544 + "px";
        appareilButton.style.left = 400 +"px";
        ustensileButton.style.right = 50 +"px";
    }


    



      
    // Récupérer l'ingredient choisi par l'utilisateur
    let ingredSelectByUser ="";
    for(item of ingredientListe){
        const elementIngredient = document.getElementById(item);
        elementIngredient.addEventListener('click',(e)=> {
            ingredSelectByUser = e.target.id;
            //elementIngredient.innerHTML ="";
            filterWordList.push(ingredSelectByUser.toLowerCase());
            listeIngredForDeleteing.push(ingredSelectByUser.toLowerCase())
            

            ingredientListe.filter((element) => {
                if(element === ingredSelectByUser){
                    const keyWordSelect = document.getElementById('keyWordSelect');
                    keyWordSelect.innerHTML +=`<div class="keyword-block-bleu"  id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                    searchBarIngredient.value="";
                }
            });

            
            
            // Suppression element dans la liste 
            for(element of ingredientListe){
                if(element === ingredSelectByUser){
                    listeIngredientInjected.innerHTML = "";
                    listIngredMiseAJour = ingredientListe.filter((element) => element !== ingredSelectByUser)
                    listIngredMiseAJour.map((element) => {
                        return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                    })
                }
            }
            
            
            /*
                // Mise à jour des éléments de la liste suite au choix d'ingrédient de l'utilisateur 
                if(listeIngredForDeleteing.length === 1){
                    ingredientListe.filter((element) =>{
                        for(const item of ingredientListe){
                            if(item.toLowerCase() === element){
                                listeIngredientInjected.innerHTML = "";
                                listIngredMiseAJour = listIngredientNoDoublon.filter((ingred) => ingred !== ingredSelectByUser);
                                listIngredMiseAJour.map((element) => {
                                    return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }
                if(listeIngredForDeleteing.length >= 2){
                    ingredientListe.filter((element) =>{
                        console.log(listIngredMiseAJour);
                        for(const item of listIngredMiseAJour){
                            if(item.toLowerCase() === element){
                                listeIngredientInjected.innerHTML = "";
                            
                                listIngredMiseAJour = listIngredMiseAJour.filter((ingred) => ingred !== ingredSelectByUser);
                                listIngredMiseAJour.map((element) => {
                                    return   listeIngredientInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }
            */
            
            // Fonction de filtre Algorithme
            filterIngredientAlgorithme();

            // Affichage message d'erreur si aucun résultat existe
            noResultatDiplay();

            // Fonction pour supprimer une étiquette en cliquant sur la croix 
            closeCrossFilter();

        })
    }

 

    // Fonction de filtre Algorithme
    filterIngredientAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
});




// Algorithme de filtre 
function filterIngredientAlgorithme(){

    if(filterWordList.length == 1 && userSearchWord.length <= 2){
        filterWordList.filter((element) => {
            resultatFilter = allRecetteList.filter((recette) => {
                let resultat = []
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordList.length >= 2 && userSearchWord.length <= 2  ){
        filterWordList.filter((element) => {

            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
            
                for(const ingredient of recette.ingredients)
                    if(
                        ingredient.ingredient.toLowerCase().includes(element) ||
                        recette.name.toLowerCase().includes(element) ||
                        recette.appliance.toString().toLowerCase().includes(element) ||
                        recette.ustensils.toString().toLowerCase().includes(element) 
                    ){
                        return resultat
                    }
                
                resultatFilter = resultat
            })
            
        })
    }
  
    if(filterWordList.length >= 1 && userSearchWord.length >= 3 ){
        filterWordList.filter((element) => {

            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
            
                for(const ingredient of recette.ingredients)
                    if(
                        ingredient.ingredient.toLowerCase().includes(element) ||
                        recette.name.toLowerCase().includes(element) ||
                        recette.appliance.toString().toLowerCase().includes(element) ||
                        recette.ustensils.toString().toLowerCase().includes(element) 
                    ){
                        return resultat
                    }
                
                resultatFilter = resultat
            })
            
        })
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }

}




function deleteFiltreIngredient(){

  
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    
    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
    
}
