
/*--------------------------------------------------------------------------*/
/*------------Standard sortie ---------------------------------------------*/
/*-------------------------------------------------------------------------*/
const allRecetteList = [];
let meals = [];

const mainSemantic = document.querySelector("main");

const loadRecette = async() => {
    let meals = await fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){

        // Boucle création d'un nouvel objet recette
        for(item of data.recipes) {
            const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
            
            allRecetteList.push(recette);
            
            // Création d'un squelette HTML pour chaque recette 
            mainSemantic.innerHTML +=
            `
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

                if(ingredient.quantity === undefined && ingredient.unit === undefined ){
                    return `<p class="ingredients"><strong>${ingredient.ingredient}</strong></p>`;
                }
               else if(ingredient.unit == undefined){
                    return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
                } 
            
                return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit}</p>`;
            }

            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
            listIngred.innerHTML +=`${generateUnit()}` ;
            };

        };
    });
}

// Variables Asynchrone
const searchDisplay = async() => {
    await loadRecette();
}

searchDisplay();


// Variables 
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
const selectAppareil = document.getElementById('selectAppareil');
const selectUstensile = document.getElementById('selectUstensile');
const noResultatBloc = document.querySelector('.no-resultat-bloc');

// Liste des éléments brut présent dans le JSON. Attention aux doublons.
let listIngredientRaw = [];
let listAppareilRaw = [];
let listUstensileRaw = [];
let listSearchAnswer = [];


// Cet array contient les mots clés filtrant choisi par l'utilisateur
let filterWordsList = [];
let resultatFilter = [];
let testCompiler = [];
let filterWordListIngredient = [];
let filterWordListAppareil = [];
let filterWordListUstensile = [];
let filterWordListMainBar = [];


// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

/*
function generateUnit(item, array){
    for(item of array){
        if(item.quantity === undefined && item.unit === undefined ){
            return `<p class="ingredients"><strong>${item.ingredient}</strong></p>`;
        }
       else if(item.quantity === undefined){
            return `<p class="ingredients"><strong>${item.ingredient}</strong> : ${item.quantity}</p>`;
        } 
        return `<p class="ingredients"><strong>${item.ingredient}</strong> : ${item.quantity} ${item.unit}</p>`;
    }
}
*/

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

function generateUnitFromResultatFilter(array){
    for(const recette of array){
        for(const ingredient of recette.ingredients){
            if(ingredient.quantity === undefined && ingredient.unit === undefined ){
                return `<p class="ingredients"><strong>${ingredient.ingredient}</strong></p>`;
            }
           else if(ingredient.unit == undefined){
                return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
            } 
            return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit}</p>`;
        }
    }     
}

//function objectToArray()
function recetteDisplay(array){
    const htmlString = array.map((item) => {    
      return `
                <article>
                    <div class="illustrationRecette"></div>
                    <div class="titreTempsCuisson"> 
                        <h3>${item.name}</h3>
                        <div class ="tempsCuisson">
                            <img class="timerClock" src="Maquettes/timer.png"></img>
                            <p>${item.time} min</p>
                        </div>
                    </div>
                    <div class="description-card">
                        <div class="liste-ingredient" id ="liste-ingredient-id-${item.id}">${generateUnitFromResultatFilter(array)}</div>
                        <p class="description-recette">${item.description}</p>
                    </div>
                </article>
            `;
    }).join('');
    mainSemantic.innerHTML = htmlString;
}

/*
function generateIngredientList(item, array){
    for(element of array)
    if(item.unit != undefined){
        return item.ingredient.toString().toLowerCase();
    } else if (item.quantity != undefined){
        return item.ingredient.toString().toLowerCase();
    }
    return item.ingredient.toString().toLowerCase(); ;
}
*/


// Variable message d'erreur
const NoResultatForResearch = `<h3 class ="no-resultat-by-searchbar"> AUCUNE RECETTE NE CORRESPOND A VOTRE RECHERCHE <h3>`

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
    };
   
    // Suppression des doublons   
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);

    // affichage listes déroulante
    listIngredientNoDoublon.map((element) => {
        return   selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`;
    })
})

const boucleAppareilListe = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);

        for(element of recette.appliance){
            listAppareilRaw.push(element);
        }
    };
        
    // Suppression des doublons   
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);

    // affichage listes déroulante
    listAppareilNoDoublon.map((element) => {
        return  selectAppareil.innerHTML +=`<option value="${element}">${element}</option>`;
    })
})

const boucleUstensileListe = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
      
        for(element of recette.ustensils){
            listUstensileRaw.push(element);
        }
    };
        
    // Suppression des doublons   
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);


    // affichage listes déroulante
    listUstensileNoDoublon.map((element) => {
        return  selectUstensile.innerHTML +=`<option value="${element}">${element}</option>`;
    })
})


let ingredientTest ="";

/*--------------------------------------------------------------------------*/
/*------------Filtre par Ingredient----------------------------------------*/
/*------------------------------------------------------------------------*/

searchBarIngredient.addEventListener('keyup',(e) => {
    const filterWordIngredient = e.target.value;

    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
  
    listIngredientNoDoublon.filter((element) =>{
        if(filterWordIngredient === element) {
            filterWordListIngredient.push(filterWordIngredient.toLowerCase());
        }
    })
        // Retrait des elements sélectionnés par l'utilisateur
        listIngredientNoDoublon.filter((element) => {
            if(element === filterWordIngredient){
                const index = listIngredientNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listIngredientNoDoublon.splice(index, 1);
                }
                const keyWordSelect = document.getElementById('keyWordSelect');
                keyWordSelect.innerHTML +=`<div class="keyword-block-bleu" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                searchBarIngredient.value="";
            }
        });

    console.log("filterWordsList", filterWordListIngredient);


  

    //Système de filtre par réduction 
    if(filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
        filterWordListIngredient.filter((element) => {
            if(filterWordListIngredient.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    for(const ingredient of recette.ingredients){
                        if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    }
                    resultatFilter = resultat
                })
            }
            if(filterWordListIngredient.length >=2){
                resultatFilter = resultatFilter.filter((recette) => {
                    let resultat = []
                    for(const ingredient of recette.ingredients){
                        if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    }
                    resultatFilter = resultat
                })
            }   
        })
    }
  
    if(filterWordListUstensile.length >= 1) {
        console.log('resultatfiler', resultatFilter)
        console.log('boum')

        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }
        
    if(filterWordListAppareil.length >= 1) {
        console.log('resultatfiler', resultatFilter)
        console.log('boum')

        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 ) {
    
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }
    
    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >= 1) {
        
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >= 1) {
        
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }
    console.log('apres le script', resultatFilter)
    
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    }


    // SUPPRESSION des éléments choisis dans la liste   
    const filterRefreshList = listIngredientNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
    }).join('');
    
    selectIngredient.innerHTML = filterRefreshList;

    filterWordListIngredient.filter((element) => {
            console.log("element ingredient :", element);
            const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
            const keywordBlock = document.getElementById("keyword-block-"+element);

            // Au clic sur la croix d'une etiquette de mot clé
            closeBtnIngredientFilter.addEventListener("click", function hideFilter() {

                keywordBlock.style.display ="none";  // Retrait du visuel etiquette

                deleteKeyWord(filterWordListIngredient, element);
                listIngredientNoDoublon.push(element); 
                selectIngredient.innerHTML ="";
                console.log('filterWordList ', filterWordListIngredient);

                // Renvoie d'une nouvelle liste d'ingredient avec le retour de l'élément supprimé
                const filterRefreshList = listIngredientNoDoublon.map((element) => {    
                    return `
                            <option value="${element}">${element}</option>
                        `;
                }).join('');
                selectIngredient.innerHTML = filterRefreshList; 
                
                // Ré-Affichage des nouveaux résultats
                
                if(filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
                    filterWordListIngredient.filter((element) => {
                        if(filterWordListIngredient.length === 1){
                            resultatFilter = allRecetteList.filter((recette) => {
                                let resultat = []
                                for(const ingredient of recette.ingredients){
                                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                        return resultat
                                    } 
                                }
                                resultatFilter = resultat
                            })
                        }
                        if(filterWordListIngredient.length >=2){
                            resultatFilter = resultatFilter.filter((recette) => {
                                let resultat = []
                                for(const ingredient of recette.ingredients){
                                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                        return resultat
                                    } 
                                }
                                resultatFilter = resultat
                            })
                        }   
                    })
                }
        
                if(filterWordListUstensile.length >= 1) {
                    console.log('resultatfiler', resultatFilter)
                    console.log('boum')

                    filterWordListIngredient.filter((element) => {
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = [];
                            for(const ingredient of recette.ingredients){
                                if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                    return resultat
                                }  
                            }
                            resultatFilter = resultat
                        })
                    })
                }
                
                if(filterWordListAppareil.length >= 1) {
                    console.log('resultatfiler', resultatFilter)
                    console.log('boum')

                    filterWordListIngredient.filter((element) => {
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = [];
                            for(const ingredient of recette.ingredients){
                                if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                    return resultat
                                }  
                            }
                            resultatFilter = resultat
                        })
                    })
                }

                if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 ) {
                
                    filterWordListIngredient.filter((element) => {
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = [];
                            for(const ingredient of recette.ingredients){
                                if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                    return resultat
                                }  
                            }
                            resultatFilter = resultat
                        })
                    })
                }
            
                if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >= 1) {
                    
                    filterWordListIngredient.filter((element) => {
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = [];
                            for(const ingredient of recette.ingredients){
                                if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                    return resultat
                                }  
                            }
                            resultatFilter = resultat
                        })
                    })
                }

                if(filterWordListMainBar.length >= 1) {
                    
                    filterWordListIngredient.filter((element) => {
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = [];
                            for(const ingredient of recette.ingredients){
                                if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                                    return resultat
                                }  
                            }
                            resultatFilter = resultat
                        })
                    })
                }
                recetteDisplay(resultatFilter);

                // Si plus aucun resultat afficher car liste de filtre vide
                if(filterWordListIngredient.length === 0){
                    console.log('plus rien a afficher');
                    filterWordListIngredient = [];
                    resultOfGetIngredientFilter = [];
                    resultatFilter= [];
                return recetteDisplay(allRecetteList);
            }
        })
    });
});

/*--------------------------------------------------------------------------*/
/*------------Filtre par Appareil-------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarAppareil.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    const filterWordAppareil = e.target.value;

    
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  

    listAppareilNoDoublon.filter((element) =>{
        if(filterWordAppareil === element) {
            filterWordListAppareil.push(filterWordAppareil.toLowerCase());
        }
    })

        // Retrait des elements sélectionnés par l'utilisateur
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


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("filterWordsList", filterWordListAppareil);
 

   // Systeme de filtre
    if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListMainBar.length == 0) {

        filterWordListAppareil.filter((element) => {
            if(filterWordListAppareil.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                    
                    resultatFilter = resultat
                })
        }

        if(filterWordListAppareil.length >=2){
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                 resultatFilter = resultat
                })
            }   
        })
    }

    if(filterWordListIngredient.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }
    
    if(filterWordListUstensile.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >=1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >=1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }

    //console.log("Liste mise à jour apres retrait mot choisi", listAppareilNoDoublon);

    // Suppression des éléments choisis dans la liste 
  
    const filterRefreshList = listAppareilNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectAppareil.innerHTML = filterRefreshList;


    filterWordListAppareil.filter((element) => {

        console.log("element appareil :",element);
        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        closeBtnAppareilFilter.addEventListener("click", function hideFilter() {

            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordListAppareil, element);
            listAppareilNoDoublon.push(element);
            selectAppareil.innerHTML ="";
            console.log('filterWordList BONSOIRE', filterWordListAppareil);

            const filterRefreshList = listAppareilNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectAppareil.innerHTML = filterRefreshList;

              
            // Systeme de filtre
            if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListMainBar.length == 0) {

                filterWordListAppareil.filter((element) => {
                    if(filterWordListAppareil.length === 1){
                        resultatFilter = allRecetteList.filter((recette) => {
                            let resultat = []
                            if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                            
                            resultatFilter = resultat
                        })
                    }

                if(filterWordListAppareil.length >=2){
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                        resultatFilter = resultat
                        })
                    }   
                })
             }

            if(filterWordListIngredient.length >= 1) {
                filterWordListAppareil.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
            
            if(filterWordListUstensile.length >= 1) {
                filterWordListAppareil.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                        resultatFilter = resultat
                    })
                })
            }

            if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1) {
                filterWordListAppareil.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                        resultatFilter = resultat
                    })
                })
            }

            if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >=1) {
                filterWordListAppareil.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                        resultatFilter = resultat
                    })
                })
            }

            if(filterWordListMainBar.length >=1) {
                filterWordListAppareil.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                        if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                        resultatFilter = resultat
                    })
                })
            }

            // Affichage des résultats sur ecran
            recetteDisplay(resultatFilter);

              if(filterWordListAppareil.length === 0){
                return recetteDisplay(allRecetteList);
            }
        })
        
    });

});

/*--------------------------------------------------------------------------*/
/*------------Filtre par Ustensile------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarUstensile.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    const filterWordUsentsile = e.target.value;

    
    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    listUstensileNoDoublon.filter((element) =>{
        if(filterWordUsentsile === element) {
            filterWordListUstensile.push(filterWordUsentsile.toLowerCase());
        }
    })

        // Retrait des elements sélectionnés par l'utilisateur
        listUstensileNoDoublon.filter((element) => {
            if(element === filterWordUsentsile){
                const index = listUstensileNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listUstensileNoDoublon.splice(index, 1);
                }
                const keyWordSelect = document.getElementById('keyWordSelect');
                keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                searchBarUstensile.value="";
            }
        });


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    //console.log("Liste mise avant retrait du mot choisi", listUstensileNoDoublon);
    //console.log("filterWordsList", filterWordListUstensile);



   // Systeme de filtre
   // Pour le premier filtre

   if( filterWordListIngredient == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
        filterWordListUstensile.filter((element) => {
            if(filterWordListUstensile.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                    
                    resultatFilter = resultat
                })
            }
            if(filterWordListUstensile.length >=2){
                resultatFilter = resultatFilter.filter((recette) => {
                    let resultat = []
                        if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    resultatFilter = resultat
                })
            }   
        })
    }

    if(filterWordListIngredient.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }
        
    if(filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >=1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    };


    
    // Suppression des éléments choisis dans la liste 
    const filterRefreshList = listUstensileNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectUstensile.innerHTML = filterRefreshList;


      filterWordListUstensile.filter((element) => {

        console.log("element ustensiles :", element);
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        closeBtnUstensileFilter.addEventListener("click", function hideFilter() {

            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordListUstensile, element);
            listUstensileNoDoublon.push(element);
            selectUstensile.innerHTML ="";

            // Liste MAJ
            const filterRefreshList = listUstensileNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectUstensile.innerHTML = filterRefreshList;


            // Affichage des resultats 
            if( filterWordListIngredient == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
                filterWordListUstensile.filter((element) => {
                    if(filterWordListUstensile.length === 1){
                        resultatFilter = allRecetteList.filter((recette) => {
                            let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                            
                            resultatFilter = resultat
                        })
                    }
                    if(filterWordListUstensile.length >=2){
                        resultatFilter = resultatFilter.filter((recette) => {
                            let resultat = []
                                if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                    return resultat
                                } 
                            resultatFilter = resultat
                        })
                    }   
                })
            }
        
            if(filterWordListIngredient.length >= 1) {
                filterWordListUstensile.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
                
            if(filterWordListAppareil.length >= 1) {
                filterWordListUstensile.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
        
            if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1) {
                filterWordListUstensile.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
        
            if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >=1) {
                filterWordListUstensile.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
        
            if(filterWordListAppareil.length >= 1) {
                filterWordListUstensile.filter((element) => {
                    resultatFilter = resultatFilter.filter((recette) => {
                        let resultat = []
                            if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                                return resultat
                            } 
                        resultatFilter = resultat
                    })
                })
            }
        
            // Affichage des résultats sur ecran
            recetteDisplay(resultatFilter);
        


              if(filterWordListUstensile.length === 0){
                console.log('plus rien a afficher');
                return recetteDisplay(allRecetteList);
            }
        })
        
    });
});




/*--------------------------------------------------------------------------*/
/*------------Barre de recherche principal --------------------------------*/
/*-------------------------------------------------------------------------*/
const searchBarGeneral = [];
//let filtreRecetteBySearchBar = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {

    // Déclaration variable 
    let userSearchWord = e.target.value.toLowerCase();

    // Bloquage du input avant 3 lettres 
    if(userSearchWord.length === 0){
        //searchDisplay();
        console.log('pas de requete');
    } else if(userSearchWord.length <= 2){
        noResultatBloc.innerHTML ="";
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    
    filterWordListMainBar.push(userSearchWord);
   
    // Systeme de filtre

     //Système de filtre par réduction 
     if(filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListIngredient.length == 0){

        filterWordListMainBar.filter((element) => {

            resultatFilter = allRecetteList.filter((recette) => {
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
  
    
    if(filterWordListUstensile.length >= 1) {
        filterWordListMainBar.filter((element) => {
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
        
    if(filterWordListAppareil.length >= 1) {
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1) {
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListIngredient >=1) {
        filterWordListMainBar.filter((element) => {
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
    

   console.log("test filterwordList dans mainsearchbar", filterWordsList)
    // Affichage des résultats via fonction recetteDisplay
    recetteDisplay(resultatFilter);
   

    // Affichage du message d'erreur 
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }
})