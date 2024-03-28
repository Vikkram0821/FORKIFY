import * as model from "./model.js";
import recipeView from "./view/recipeview.js";
import resultView from "./view/resultView.js";
import bookmarksView from "./view/bookmarksView.js";
import searchView from "./view/searchView.js";
import PaginationView from "./view/paginationView.js";
import addRecipeView from "./view/addRecipeView.js";


//Polyfill
import 'core-js/stable'; 
import 'regenerator-runtime/runtime'; 
import paginationView from "./view/paginationView.js";

//////////////////////////////////////////////////////////////////
const recipeContainer = document.querySelector('.recipe');

//Hot module reloading (HMR)!!
if(module.hot){
  module.hot.accept();
}

//! Main-1 Func() - starts from hashchange or load occurs
const controllRecipes = async function(){
  try {

    //Getting the id detail for loading the recipe
    const id = (window.location.hash).slice(1);
    if(!id) return;
    // Spinner function -- (In-View.js)!
    recipeView.spinner(recipeContainer);

    //Update results view to mark selected  recipe in list
    resultView.update(model.getSearchResultsPage())

    //1 Updating bookmarks view
    bookmarksView.update(model.state.bookmarks)
    //2-Loading Recipe (Aync calling async) -- (model.js)
    console.log(id);
    await model.loadRecipe(id);
    //3--Rendering Recipe
    recipeView.render(model.state.recipe)
      
  } catch (error) {
    //If didn't recive the reciepe details.Calls Render Error() in View.js.
    recipeView.renderError() ;
}
}
//! Main-2 Func() -- When user search names.
const controlSearchResults = async function(){

  try {
  //Spinner Loading.
  resultView.spinner()

  //GET the name of the query that typed.
  const query = searchView.getQuery()

  if(!query) return;

  //To load resuts for the searched name.
  await model.loadResults(query);

  //Clear Input txt
  searchView._clearInput()

  //Render Results. -- (To View.js)
  resultView.render(model.getSearchResultsPage());

  //Pagination
  PaginationView.render(model.state.search)
  } 
  catch (err) {
    console.log(err);
  }
}

//Pagination Fucntion
const controlPagination = function(goToPage){
   //Render new Results. -- (To View.js)
   resultView.render(model.getSearchResultsPage(goToPage));

   //Render new Pagination btns.
   PaginationView.render(model.state.search)
}


const controlServings = function(newServings)
{
  //Update the recipe Servings (in state)
   model.updateServings(newServings);
  //Update the recipe view
  //  recipeView.render(model.state.recipe)
   recipeView.update(model.state.recipe)

}

//Bookmark
const controlBookmark =function(){

  //Add or remove Bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe);
  }
  console.log(model.state.recipe);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render  Bookmarks
  bookmarksView.render(model.state.bookmarks);
}
const controlBoomarks1 = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try {
    //Spinner
    addRecipeView.spinner()
  await model.uploadRecipes(newRecipe)
  
  //Success Msg
  addRecipeView.renderMsg()
  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks)
  //Render Recipe
  recipeView.render(model.state.recipe)

  //Histoy API
  window.history.pushState(null,"",`#${model.state.recipe.id}`);
  //Close window
  setTimeout(function(){
    addRecipeView.toggleWindow()
  },2500);

 } catch (err) {
  console.error(err);
  addRecipeView.renderError(err.message)
 }
}

// ** Main function in recipeview.js which listens event to the hashchange and load occurs.
//IIFE
const init = function(){
bookmarksView.addHandlerRender(controlBoomarks1);
recipeView.addHandlerRender(controllRecipes);
recipeView.addHandlerUpdateServings(controlServings)
recipeView.addHandlerBookmark(controlBookmark);
searchView.addEventHandler(controlSearchResults);
paginationView.addHandler(controlPagination);
addRecipeView.adHandlerUpload(controlAddRecipe)
}
init();

