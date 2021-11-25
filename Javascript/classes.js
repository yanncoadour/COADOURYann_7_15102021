class Ingredient {
    constructor(ingredient, quantity, unit){
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }

    render(){
        if(this.quantity === undefined && this.unit === undefined ){
            return `<p class="ingredients"><strong>${this.ingredient}</strong></p>`;
        }

        if(this.unit == undefined){
            return `<p class="ingredients"><strong>${this.ingredient}</strong> : ${this.quantity}</p>`;
        } 
    
        return `<p class="ingredients"><strong>${this.ingredient}</strong> : ${this.quantity}  ${this.unit}</p>`;
    
    }
}

// Classe recette 
class Recette {
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils){
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
        this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit))
    }

    render(){
        return `
                <article>
                    <div class="illustrationRecette"></div>
                    <div class="titreTempsCuisson"> 
                        <h3>${this.name}</h3>
                        <div class ="tempsCuisson">
                            <img class="timerClock" src="Maquettes/timer.png"></img>
                            <p>${this.time} min</p>
                        </div>
                    </div>
                    <div class="description-card">
                        <div class="liste-ingredient">${this.ingredients.map(ingredient => ingredient.render()).join('')}</div>
                        <p class="description-recette">${this.description}</p>
                    </div>
                </article>
                `
    }
}

