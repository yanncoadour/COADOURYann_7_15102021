

// Variables ingrédients
const ingredientButton = document.getElementById('ingredientButton');
const searchBarIngredient = document.getElementById('searchBarIngredient');
const selectIngredientButton = document.getElementById('selectIngredientButton');

// Variables Appareils
const appareilButton = document.getElementById('appareilButton');
const searchBarAppareil = document.getElementById('searchBarAppareil');
const selectAppareilButton = document.getElementById('selectAppareilButton');

// Variables ustensiles
const ustensileButton = document.getElementById('ustensileButton');
const searchBarUstensile = document.getElementById('searchBarUstensile');
const selectUstensileButton = document.getElementById('selectUstensileButton');


// Animation du bouton ingrédient 
document.addEventListener('click', function(event) {
    const isClickInside = selectIngredientButton.contains(event.target);
    if (isClickInside) {
      searchBarIngredient.style.display ="block";
      selectAppareilButton.style.left = 80 +"px";
      ustensileButton.style.left = 80 +"px"
      
    }
    else {
      searchBarIngredient.style.display ="none";
      selectAppareilButton.style.left ="";
      ustensileButton.style.left = "";
    }
});



// Animation du bouton Appareil 
document.addEventListener('click', function(event) {
    const isClickInside = selectAppareilButton.contains(event.target);
    if (isClickInside) {
      searchBarAppareil.style.display ="block";
      selectUstensileButton.style.left = 80 +"px";
    }
    else {
      searchBarAppareil.style.display ="none";
      selectUstensileButton.style.left ="";
    }
});


// Animation du bouton Ustensile 
document.addEventListener('click', function(event) {
    const isClickInside = selectUstensileButton.contains(event.target);
    if (isClickInside) {
      searchBarUstensile.style.display ="block";
    }
    else {
      searchBarUstensile.style.display ="none";
    }
});