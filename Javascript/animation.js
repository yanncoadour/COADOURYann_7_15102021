const ingredientButton = document.getElementById('ingredientButton');
const selectIngredientButton = document.getElementById('selectIngredientButton');
const searchBarIngredient = document.getElementById('searchBarIngredient');


function openSearchBar(searchBarName){
    searchBarName.style.display = "block";
    searchBarName.style.opacity = "1";
}

selectIngredientButton.addEventListener('click', openSearchBar(searchBarIngredient));