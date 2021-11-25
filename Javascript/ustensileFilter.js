let ustensileListe = [];
let listUstMiseAJour = [];
let  listeUstForDeleteing = [];

const blocListUst = document.getElementById('bloc-liste-ustensile');

// Liste filtre avec tous les ustensiles
searchBarUstensile.addEventListener('click', (e) => {

    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    // Affichage des ustensiles dès l'ouverture du filtre 
    listUstensileNoDoublon.map((element) => {
        return   listeUstensileInjected.innerHTML +=`<li id="${element}">${element}</li>`;
    })
    ustensileListe.push(listUstensileNoDoublon);
    

    // Ecouteur d'évenement : sur chaque ustensiles de la liste
        for(element of listUstensileNoDoublon){
            const elementUstensile = document.getElementById(element);
            elementUstensile.addEventListener('click',(e)=> {
    
                // Variable correspondant a l'ustensiles choisi par l'utilisateur directement dans la liste
                let ustSelectByUser = e.target.id;
    
                // L'usentensile selectionné par l'utilisateur va remplir une liste de filtre commun à tous les filtres
                filterWordList.push(ustSelectByUser.toLowerCase());
                listeUstForDeleteing.push(ustSelectByUser.toLowerCase())
    
                // Générer un tag pour signifier à l'utilisateur que le filtre qu'il à choisi est actif 
                const keyWordSelect = document.getElementById('keyWordSelect');
                for(element of listUstensileNoDoublon){
                    if(element === ustSelectByUser){
                        keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `;
                    }
                } 
    
        
                // Mise à jour des éléments de la liste suite au choix d'ustensiles de l'utilisateur 
                if(listeUstForDeleteing.length === 1){
                    listeUstForDeleteing.filter((element) =>{
                        for(const item of listUstensileNoDoublon){
                            if(item.toLowerCase() === element){
                                listeUstensileInjected.innerHTML = "";
                                listUstMiseAJour = listUstensileNoDoublon.filter((ust) => ust !== ustSelectByUser);
                                listUstMiseAJour.map((element) => {
                                    return   listeUstensileInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }
                if(listeUstForDeleteing.length >= 2){
                    listeUstForDeleteing.filter((element) =>{
                        for(const item of listUstMiseAJour){
                            if(item.toLowerCase() === element){
                                listeUstensileInjected.innerHTML = "";
                            
                                listUstMiseAJour = listUstMiseAJour.filter((ust) => ust !== ustSelectByUser);
                                listUstMiseAJour.map((element) => {
                                    return   listeUstensileInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                                })
                            }
                        }
                    })
                }

                
                
                // Fonction de filtre Algorithme
                filterUstensileAlgorithme();
    
                // Affichage message d'erreur si aucun résultat existe
                noResultatDiplay();
    
                // Fonction pour supprimer une étiquette en cliquant sur la croix 
                closeCrossFilter();
            })
        } 
})
    

    
    
    
    
// L'utilsateur recherch un ustensile à l'aide de la barre de recherche 
searchBarUstensile.addEventListener('keyup', (e) => {
    
    // Déclaration variable correspondant à la recherche
    let filterWordUstensile = e.target.value.toLowerCase();

    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

     // Générer dynamiquement les ustensiles selon la recherche utilisateur
    if(filterWordUstensile.length >= 1){
        ustensileListe = listUstensileNoDoublon.filter((ustensile) => {
            if(ustensile.toLowerCase().includes(filterWordUstensile)){
                return ustensileListe
            }
        })
    }

    // Affichage dynamique des ustensiles en HTML 
    if(filterWordUstensile.length === 0){
        listeUstensileInjected.innerHTML ="";
        ustensileListe.map((element) => {
            return   listeUstensileInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })
        e.preventDefault();
    }

    if(filterWordUstensile.length >= 2){
        listeUstensileInjected.innerHTML ="";
        ustensileListe.map((element) => {
            return   listeUstensileInjected.innerHTML +=`<li id="${element}" value="${element}">${element}</li>`;
        })
    }
  
    console.log(ustensileListe)
    // Affichage dynamique des données
    
       if(ustensileListe.length < 6 && filterWordUstensile.length > 1){
        listeUstensileInjected.style.columns = "1";
        blocListUst.style.width = 200 + "px"
        listeUstensileInjectedContainer.style.width = 212 + "px";
        //steButton.style.left = 60 +"px";

    } else{
        listeUstensileInjected.style.columns = "3"; 
        blocListUst.style.width = 532 + "px";
        listeUstensileInjectedContainer.style.width = 544 + "px";
        //usteButton.style.right = 390 +"px";
    }



      
    // Récupérer l'ingredient choisi par l'utilisateur
    let ustSelectByUser ="";
    for(item of ustensileListe){
        const elementUstensile = document.getElementById(item);
        elementUstensile.addEventListener('click',(e)=> {
            ustSelectByUser = e.target.id;
            //elementIngredient.innerHTML ="";
            filterWordList.push(ustSelectByUser.toLowerCase());
            

            ustensileListe.filter((element) => {
                if(element === ustSelectByUser){
                    const keyWordSelect = document.getElementById('keyWordSelect');
                    keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                    searchBarUstensile.value="";
                }
            });

            
            // Suppression element dans la liste 
            for(element of ustensileListe){
                if(element === ustSelectByUser){
                    listeUstensileInjected.innerHTML = "";
                    listUstMiseAJour = ustensileListe.filter((element) => element !== ustSelectByUser)
                    listUstMiseAJour.map((element) => {
                        return   listeUstensileInjected.innerHTML +=`<li id="${element}">${element}</li>`;
                    })
                        
                }
            }

            
            // Fonction de filtre Algorithme
            filterUstensileAlgorithme();

            // Affichage message d'erreur si aucun résultat existe
            noResultatDiplay();

            // Fonction pour supprimer une étiquette en cliquant sur la croix 
            closeCrossFilter();

        })
    }

 

    // Fonction de filtre Algorithme
    filterUstensileAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
});



/*
searchBarUstensile.addEventListener('keyup',(e) => {

    const filterWordUstensile = e.target.value;

    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    // Envoyer le filtre selectionné dans une liste générale pour le traitement en algorithme
    listUstensileNoDoublon.filter((element) =>{
        if(filterWordUstensile === element) {
            filterWordList.push(filterWordUstensile.toLowerCase());
        }
    })

    // Retrait des elements sélectionnés par l'utilisateur
    listUstensileNoDoublon.filter((element) => {
        if(element === filterWordUstensile){
            const index = listUstensileNoDoublon.indexOf(element)
            if(index > -1 ){ 
                listUstensileNoDoublon.splice(index, 1);
            }
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
            searchBarUstensile.value="";
        }
    });

    
    // Manipulation de la liste ustensile : Ré-écriture de la liste mise à jour
    function filterRefreshListUstensile(){
        selectUstensile.innerHTML ="";
        listUstensileNoDoublon.map((element) => {    
            return  selectUstensile.innerHTML += `<option value="${element}">${element}</option>`;
        }).join('');
    } 
    filterRefreshListUstensile();


    // Fonction de filtre Algorithme
    filterUstensileAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();
    
    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
});

*/

function filterUstensileAlgorithme(){

    if(filterWordList.length === 1 && userSearchWord.length <= 2){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.ustensils.toString().toLowerCase().includes(filterWordList.toString()));
    }
  
  
    if(filterWordList.length >= 2 && userSearchWord.length <= 2 ){
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



function deleteFiltreUstensile(){

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
    
}