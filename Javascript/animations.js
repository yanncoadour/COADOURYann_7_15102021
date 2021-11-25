
// Variables ingrédients
const ingredientButton = document.getElementById('ingredientButton');
const searchBarIngredient = document.getElementById('searchBarIngredient');
const selectIngredientButton = document.getElementById('selectIngredientButton');
const listeIngredientInjectedContainer = document.getElementById('liste-Ingredient-injected-container');

// Variables Appareils
const appareilButton = document.getElementById('appareilButton');
const searchBarAppareil = document.getElementById('searchBarAppareil');
const selectAppareilButton = document.getElementById('selectAppareilButton');
const listeAppareilInjectedContainer = document.getElementById('liste-Appareil-injected-container');

// Variables ustensiles
const ustensileButton = document.getElementById('ustensileButton');
const searchBarUstensile = document.getElementById('searchBarUstensile');
const selectUstensileButton = document.getElementById('selectUstensileButton');
const listeUstensileInjectedContainer = document.getElementById('liste-Ustensile-injected-container');


// Animation du bouton ingrédient 
document.addEventListener('click', function(event) {
    const isClickInside = ingredientButton.contains(event.target);
    if (isClickInside) {
      searchBarIngredient.style.display ="block";
      appareilButton.style.left = 400 +"px";
      ustensileButton.style.position = "absolute";
      ustensileButton.style.right = 50 +"px";
      listeIngredientInjected.style.display="block";
      listeIngredientInjectedContainer.style.display="block";
    }
    if(isClickInside){
      ustensileButton.style.left = 80 +"px";
    }

    else {
      searchBarIngredient.style.display ="none";
      appareilButton.style.left ="";
      ustensileButton.style.position = "relative";
      ustensileButton.style.right = 0 +"px";
      ustensileButton.style.left = "";
      listeIngredientInjected.style.display="none";
      listeIngredientInjectedContainer.style.display="";
    }
});

// Animation du bouton Appareil 
document.addEventListener('click', function(event) {
    const isClickInside = appareilButton.contains(event.target);
    if (isClickInside) {
      searchBarAppareil.style.display ="block";
      ustensileButton.style.left = 60 +"px";
      listeAppareilInjected.style.display ="block";
      listeAppareilInjectedContainer.style.display ="block";
    }
    else {
      searchBarAppareil.style.display ="none";
      ustensileButton.style.left ="";
      listeAppareilInjected.style.display ="none";
      listeAppareilInjectedContainer.style.display ="none";
    }
});


// Animation du bouton Ustensile 
document.addEventListener('click', function(event) {
    const isClickInside = ustensileButton.contains(event.target);
    if (isClickInside) {
      searchBarUstensile.style.display ="block";
      listeUstensileInjected.style.display ="block";
      listeUstensileInjectedContainer.style.display ="block";
    }
    else {
      searchBarUstensile.style.display ="none";
      listeUstensileInjected.style.display ="none";
      listeUstensileInjectedContainer.style.display ="none";
    }
});



