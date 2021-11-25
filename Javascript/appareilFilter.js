


let appareilListe = [];
let listApparMiseAJour = [];
let  listeApparForDeleteing = [];

const blocListAppar = document.getElementById('bloc-liste-appareil');

// Liste filtre avec tous les appareils 
searchBarAppareil.addEventListener('click', (e) => {

  
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);

    // Affichage des appareils dès l'ouverture du filtre 


        listAppareilNoDoublon.map((element) => {
            return   listeAppareilInjected.innerHTML +=`<li id="${element}">${element}</li>`;
        })
        appareilListe.push(listAppareilNoDoublon);
    

    

        // Ecouteur d'évenement : sur chaque appareil de la liste
        for(element of listAppareilNoDoublon){
            const elementAppareil = document.getElementById(element);
            elementAppareil.addEventListener('click',(e)=> {
    
                // Variable correspondant a l'appareil choisi par l'utilisateur directement dans la liste
                let apparSelectByUser = e.target.id;
    
                // L'appareil selectionné par l'utilisateur va remplir une liste de filtre commun à tous les filtres
                filterWordList.push(apparSelectByUser.toLowerCase());
                listeApparForDeleteing.push(apparSelectByUser.toLowerCase());
    
                // Générer un tag pour signifier à l'utilisateur que le filtre qu'il à choisi est actif 
                const keyWordSelect = document.getElementById('keyWordSelect');
                for(element of listAppareilNoDoublon){
                    if(element === apparSelectByUser){
                        keyWordSelect.innerHTML +=`<div class="keyword-block-green" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                    }
                } 
    
        
                // Mise à jour des éléments de la liste suite au choix d'appareil de l'utilisateur 
                if(listeApparForDeleteing.length === 1){
                    listeApparForDeleteing.filter((element) =>{
                        for(const item of listAppareilNoDoublon){
                            if(item.toLowerCase() === element){
                                listeAppareilInjected.innerHTML = "";
                                listApparMiseAJour = listAppareilNoDoublon.filter((appar) => appar !== apparSelectByUser);
                                listApparMiseAJour.map((element) => {
                                    return   listeAppareilInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }
                if(listeApparForDeleteing.length >= 2){
                    listeApparForDeleteing.filter((element) =>{
                        for(const item of listApparMiseAJour){
                            if(item.toLowerCase() === element){
                                listeAppareilInjected.innerHTML = "";
                            
                                listApparMiseAJour = listApparMiseAJour.filter((appar) => appar !== apparSelectByUser);
                                listApparMiseAJour.map((element) => {
                                    return   listeAppareilInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }

                
                
                // Fonction de filtre Algorithme
                filterAppareilAlgorithme();
    
                // Affichage message d'erreur si aucun résultat existe
                noResultatDiplay();
    
                // Fonction pour supprimer une étiquette en cliquant sur la croix 
                closeCrossFilter();
            })
        } 
})
    

    
    
    
    
// L'utilsateur recherch un appareil à l'aide de la barre de recherche 
searchBarAppareil.addEventListener('keyup', (e) => {
    
    // Déclaration variable correspondant à la recherche
    let filterWordAppareil = e.target.value.toLowerCase();

    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);


 
    /*
     // Générer dynamiquement les appareils selon la recherche utilisateur
    if(filterWordAppareil.length === 1){
        e.preventDefault();
        e.stopPropagation();
        return
    }
    */
     // Affichage dynamique des appareils en HTML 
     if(filterWordAppareil.length === 0){
        listeAppareilInjected.innerHTML ="";
        listAppareilNoDoublon.map((element) => {
                return   listeAppareilInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
            })
    }


    // Générer dynamiquement les appareils selon la recherche utilisateur
    if(filterWordAppareil.length >= 1){

        listeAppareilInjected.innerHTML ="";
        appareilListe = listAppareilNoDoublon.filter((appareil) => {
            if(appareil.toLowerCase().includes(filterWordAppareil)){
                return appareilListe
            }
        })

        appareilListe.map((element) => {
            return   listeAppareilInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })

    }

  
    /*
    if(filterWordAppareil.length === 1){
        e.preventDefault();
        
   
    }

    
    if(filterWordAppareil.length >= 2){
        listeAppareilInjected.innerHTML ="";
        appareilListe.map((element) => {
            return   listeAppareilInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })
    }
    */


    console.log("update", appareilListe);
     // Affichage HTML  des résultats dynamiques
     if(appareilListe.length <= 3 ){
        listeAppareilInjected.style.columns = "1";
       // blocListAppar.style.width = 200 + "px"
       // listeAppareilInjectedContainer.style.width = 212 + "px";
        ustensileButton.style.left = 60 +"px";

    } else{
        listeAppareilInjected.style.columns = "2"; 
        //blocListAppar.style.width = 532 + "px";
       // listeAppareilInjectedContainer.style.width = 544 + "px";
        ustensileButton.style.right = 390 +"px";
    }
  
      
    // Récupérer l'ingredient choisi par l'utilisateur
    let apparSelectByUser ="";
    for(item of appareilListe){
        const elementAppareil = document.getElementById(item);
        elementAppareil.addEventListener('click',(e)=> {
            apparSelectByUser = e.target.id;
            //elementIngredient.innerHTML ="";
            filterWordList.push(apparSelectByUser.toLowerCase());
            

            appareilListe.filter((element) => {
                if(element === apparSelectByUser){
                    const keyWordSelect = document.getElementById('keyWordSelect');
                    keyWordSelect.innerHTML +=`<div class="keyword-block-green" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                    searchBarAppareil.value="";
                }
            });

            
            // Suppression element dans la liste 
            for(element of appareilListe){
                if(element === apparSelectByUser){
                    listeAppareilInjected.innerHTML = "";
                    listApparMiseAJour = appareilListe.filter((element) => element !== apparSelectByUser)
                    listApparMiseAJour.map((element) => {
                        return   listeAppareilInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                    })
                }
            }

            
            // Fonction de filtre Algorithme
            filterAppareilAlgorithme();

            // Affichage message d'erreur si aucun résultat existe
            noResultatDiplay();

            // Fonction pour supprimer une étiquette en cliquant sur la croix 
            closeCrossFilter();

        })
    }

 
    // Fonction de filtre Algorithme
    filterAppareilAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
});






/*

let filterWordList =[];

searchBarAppareil.addEventListener('keyup',(e) => {
    
    const filterWordAppareil = e.target.value;

    
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  

    // Envoyer le filtre selectionné dans une liste générale pour le traitement en algorithme   
    listAppareilNoDoublon.filter((element) =>{
        if(filterWordAppareil === element) {
            filterWordList.push(filterWordAppareil.toLowerCase());
        }
    })

    // Manipulation de la liste ingrédient : Retrait d'un ingrédient sélectionnés par l'utilisateur
    listAppareilNoDoublon.filter((element) => {
        if(element === filterWordAppareil){
            const index = listAppareilNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listAppareilNoDoublon.splice(index, 1);
                }
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block-green" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
            searchBarAppareil.value="";
        }
    });


    // Manipulation de la liste appareil: Ré-écriture de la liste mise à jour
    function filterRefreshListAppareil(){
        selectAppareil.innerHTML="";
        listAppareilNoDoublon.map((element) => {    
            return  selectAppareil.innerHTML += `<option value="${element}">${element}</option>`;
        }).join('');
    } 
    filterRefreshListAppareil();

    // Fonction de filtre Algorithme
    filterAppareilAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();

});
*/


function filterAppareilAlgorithme(){

    if(filterWordList.length == 1 && userSearchWord.length <= 2){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.appliance.toString().toLowerCase().includes(filterWordList.toString()));
    }


    if(filterWordList.length >= 2  && userSearchWord.length <= 2){
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
   

function deleteFiltreAppareil(){
  
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
}