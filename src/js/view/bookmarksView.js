import View from "./view";
import previewView from "./previewView"


class BookmarksView extends View{
_parentEl = document.querySelector(".bookmarks__list");
_errorMessage = "No bookmarks yet. Find a good recipe to bookmark it."
_msg ="";

addHandlerRender(handler){
  window.addEventListener("load",handler)
}


_generateHTML(){
    // For all values in the _data we loop for every array values using map() in  that map we used the function which returns HTML for each.
      return this._data.map(bookmark => previewView.render(bookmark,false)).join('');
}

}
export default new BookmarksView;