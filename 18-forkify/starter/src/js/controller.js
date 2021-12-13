
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './view/recipeView';


// const recipeContainer = document.querySelector('.recipe');

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
    recipeView.renderError();
  }
};

const init = function(){
  recipeView.addHandelerRender(controlRecipe)
};

init();

