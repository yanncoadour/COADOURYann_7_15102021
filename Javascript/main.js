// Classe recette 
class Recette {
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils){
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }
}

const mainSemantic = document.querySelector("main");

fetch('Javascript/recette.json')
  .then((response) => response.json())
  .then(function (data){

    for(item of data.recipes) {
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        console.log(recette)

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
        
        </article>
        `
    };
    
});