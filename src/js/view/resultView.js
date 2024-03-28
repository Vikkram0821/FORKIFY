import View from "./view";
import previewView from "./previewView"


class ResultView extends View{
_parentEl = document.querySelector(".results");
_errorMessage = "No recipes found for your query!"
_msg ="";
_generateHTML(){
  // For all values in the _data we loop for every array values using map() in  that map we used the function which gets html from the view.js.
    return this._data.map(result => previewView.render(result,false)).join('');
    
}
}
export default new ResultView;