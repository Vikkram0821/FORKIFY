import icons from "url:../../img/icons.svg";
import {Fraction} from "fractional";
import View from "./view";

class RecipeView extends View{
    _parentEl = document.querySelector(".recipe");
    _errMsg = " We can't find the recipe. Please try another one!";
    _Msg = ""; 

    // Calls the function when Hashchange or load occurs -- (Handler from the controller.js)

   addHandlerRender(handler) {
    window.addEventListener("hashchange",handler);
    window.addEventListener("load",handler);
     }
   
    //To update reccipe when servings changed by user.
    addHandlerUpdateServings(handler){
      this._parentEl.addEventListener('click', function(e){
        //Selecting the +- buttons
      const btn = e.target.closest(".btn--update-servings");
      //Val of the update servings
      const updateTo = +btn.dataset.updateTo;
      if(!btn) return;
      if(updateTo>0){
        handler(updateTo);
      }
    })
   }

     addHandlerBookmark(handler){
      this._parentEl.addEventListener("click",function(e){
        const btn = e.target.closest(".btn--bookmark")
        if(!btn) return;
        handler()
      })
     }
   //Generates the HTML for the the fetched Data.
    _generateHTML(){
       return `<figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key? "": "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked? "-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateHtmlIngredient).join("")} </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `
 
  
    }

   _generateHtmlIngredient(ing){
return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction (ing.quantity).toString() : " "}</div>
        <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
        </div>
        </li>`
    }
}

export default new RecipeView();