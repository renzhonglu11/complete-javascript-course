
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './view/recipeView';


// const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipe = async function () {
  try { 
    //5ed6604691c37cdc054bd015
    const id =window.location.hash.slice(1);
    console.log(id);
    if(id===''){return}
    
    recipeView.renderSpinner(); 
    
    // load recipe
    await model.loadRecipe(id);
    const recipe=model.state.recipe
    
    // render recipe
    recipeView.render(recipe);
    
  } catch (error) {
    alert(error);
  }
};

['hashchange','load'].forEach(e=>window.addEventListener(e,controlRecipe))

