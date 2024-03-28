import {API_KEY, API_URL}  from "./view/config.js"
import {getJSON,timeout,sendJSON} from "./helper.js"

//State var to the ease of result access.
export const state = {
    recipe:{},
    search: {
        query :"",
        results : [],
        page: 1,
        resultsPerPage :10,
    },
    bookmarks: [],
};

const createRecipeObj = function(data){
  const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
      cooking_time:data.data.cookingTime,
      ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    }

}
//Starts the fetching of the passed recipe ID.
export const loadRecipe = async function(id){

    try {
        //Gets the JSON txt from the function in helper.js
        const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

         state.recipe = createRecipeObj(data)

         if(state.bookmarks.some(bookmark => bookmark.id === id)){
          state.recipe.bookmarked = true;
         } else state.recipe.bookmarked = false;
    } catch (err) {
        console.error(err)
    }
   
}

export const loadResults = async function(query){
    try {
        //Pass the searched name to the state.
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`)
        
        state.search.results = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher:rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key})
            }
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getSearchResultsPage = function (page = 1){
    this.state.search.page = page;
    start = (page-1) * state.search.resultsPerPage;
    end = page* state.search.resultsPerPage;

    return state.search.results.slice(start,end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
      //!Formula oldServing * newServing / by oldServig.
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
      
    });
    state.recipe.servings = newServings;
  }

  const persistBookmark = function(){
    localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks));

  }
  export const addBookmark = function(recipe){
    console.log(recipe);
    //Add bookmark
   state.bookmarks.push(recipe);
   console.log(recipe);
   //Marke recipe as bookmarked
   if(recipe.id == state.recipe.id) state.recipe.bookmarked = true;

   persistBookmark();
  }

  export const deleteBookmark = function (id) {
    
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    // Mark current recipe as NOT bookmarked
    if (id.id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
   persistBookmark();

   }
  
const init = function(){
const storage = localStorage.getItem("bookmarks");
if(storage){
    state.bookmarks = JSON.parse(storage);
}
} ; init(); console.log(state.bookmarks);

const clearBookmarks = function(){
    localStorage.clear("bookmarks")
}

export const uploadRecipes  = async function(newRecipes){
    try {
        const ingredients = Object.entries(newRecipes).filter(rec => rec[0].startsWith("ingredient") && rec[1] !=="").map(ing => {
            // const ingArr = ing[1].replaceAll(" ","").split(",");
            const ingArr = ing[1].split(",").map(el => el.trim)
    
            if (ingArr.length !==3) throw new Error("Wrong ingredient format! Please use the correct format :)")
    
            const [quantity,unit,description] = ingArr;
            return {quantity: quantity? +quantity: null ,unit,description}
        })
        const recipe = {
            title: newRecipes.title,
            source_url : newRecipes.sourceUrl,
            image_url:newRecipes.image,
            publisher:newRecipes.publisher,
            cooking_time: +newRecipes.cookingTime,
            servings:+newRecipes.servings,
            ingredients,
        }
        console.log(recipe);
        const data = await  sendJSON(`${API_URL}?key=${API_KEY}`,recipe)
       console.log(data);
        state.recipe = createRecipeObj(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
  
   
}