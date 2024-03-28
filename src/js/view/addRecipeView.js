import View from "./view";
import icons from "url:../../img/icons.svg";


class addRecipeView extends View{
_parentEl = document.querySelector(".upload");
_Msg= "Recipe was successfully added! :)";

_window = document.querySelector(".add-recipe-window");
_overlay = document.querySelector(".overlay");
_btnOpen  = document.querySelector(".nav__btn--add-recipe");
_btnClose = document.querySelector(".btn--close-modal");

constructor(){
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
}
toggleWindow(){
    
    this._overlay.classList.toggle("hidden")
    this._window.classList.toggle("hidden")
}
_addHandlerShowWindow(){
    console.log(this);
    this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))
}
_addHandlerHideWindow(){
    this._btnClose.addEventListener("click",this.toggleWindow.bind(this))
    this._overlay.addEventListener("click",this.toggleWindow.bind(this))
}
adHandlerUpload(handler){
    this._parentEl.addEventListener("submit",function(e){
        e.preventDefault();
        const dataArr  = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        handler(data)

    })
}
_generateHTML(){
  
}
}

export default new addRecipeView();