/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Remplissage barre de recherche principale---------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


let filterWordListMainSearch = [];
const searchBarGeneral = [];
let userSearchWord = [];
//let filtreRecetteBySearchBar = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {

    // Déclaration variable 
    userSearchWord = e.target.value.toLowerCase();

    // Bloquage du input avant 3 lettres 
    if(userSearchWord.length <= 2 && filterWordList.length === 0){
        recetteDisplay(allRecetteList);
        noResultatBloc.innerHTML ="";
        e.preventDefault();
        e.stopPropagation();
        return;
        
    } else if(userSearchWord.length >= 3 && filterWordList.length === 0){
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
    } else if (userSearchWord.length <= 2 && filterWordList.length >= 1){
        resultatFilter = resultatFilter.filter((recette) => {
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


    recetteDisplay(resultatFilter);



});




   
