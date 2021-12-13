// import icons from '../img/icons.svg' // parcel 1
import svg from 'url:../../img/icons.svg';
import { Fractional } from 'fractional';
// console.log(fractional);

class RecipeView {
  #parentElem = document.querySelector('.recipe');
  #data;
  #errorMessage=`we can not find that recipe, plz try another one☠☠`;
  #message=``;

  render(data) {
    this.#data = data;
    this.#parentElem.innerHTML = ''; // clean up container
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElem.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this.#parentElem.innerHTML = '';
  }

  #generateMarkup() {
    return `
        <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${svg}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${svg}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
          }</span>
          <span class="recipe__info-text">servings</span>
    
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${svg}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${svg}g#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated">
          <svg>
            <use href="${svg}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${svg}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>
    
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#data.ingredient.map(this.#generateMarkupIngredient).join('')}
          
        </ul>
      </div>
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
            `;
  }

  addHandelerRender(handler) {
    // when publischer publish an event, subsriber will handle it
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }

  renderSpinner = function () {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${svg}#icon-loader"></use>
        </svg>
      </div>
      `;
    this.#clear();
    this.#parentElem.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message=this.#errorMessage) {
    const markup=`        
    <div class="error">
    <div>
      <svg>
        <use href="${svg}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
  `
  this.#clear();
  this.#parentElem.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message=this.#message) {
    const markup=`        
    <div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${svg}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
  `
  this.#clear();
  this.#parentElem.insertAdjacentHTML('afterbegin', markup);
  }


  #generateMarkupIngredient(ing) {
    const quantity =
      ing.quantity == null ? '' : new Fraction(ing.quantity).toString();
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${svg}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
    `;
  }
}

export default new RecipeView();
