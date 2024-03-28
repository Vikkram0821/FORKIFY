import { textContent } from "domutils";
import icons from "url:../../img/icons.svg";

 export default class View {
    _data;

    /**
     * Renderinf the recived object to DOM.
     * @param {object|object[]} data The data to be rendered (eg.reciepe)
     * @param {boolean} [render=true] If false create markup string instead of rendering to the DOM.
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {object} view instance
     * @author Vikkram  SM
     * @todo finish implementation
     */
    render(data, render = true){
      if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError(this._errorMessage)

        this._data = data;
        //Generates the html from the fetched Data
        const html = this._generateHTML();
       //Sends the html code to the bookmarksView.js
        if(!render) return html;
        this._parentEl.innerHTML = "";
        //Inserts the html in the div
        this._parentEl.insertAdjacentHTML("afterbegin",html)
    }
    //To update the ingredients agter changing the servings

    update(data){

      this._data = data;
      //Generates the html from the passed Data
      //Changing currenet element DOM to the updated new Virtual DOM
      const newHtml = this._generateHTML();
      const newDOM = document.createRange().createContextualFragment(newHtml);
      const newElements = Array.from(newDOM.querySelectorAll("*"));
      const currElements = Array.from(this._parentEl.querySelectorAll("*"));
      
      newElements.forEach((newEl,i) =>{
        const curEl = currElements[i];

        //Updates changed Text
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
          curEl.textContent = newEl.textContent;
        }

        //Update changed Attributes
        if(!newEl.isEqualNode(curEl)){
          Array.from(newEl.attributes).forEach(attr=> curEl.setAttribute(attr.name,attr.value))
        }
      })
    }

     //Spinner
     spinner(){
     const html1 = `
          <div class="spinner">
             <svg>
               <use href="${icons}#icon-loader"></use>
             </svg>
           </div>
    `
     this._parentEl.innerHTML=" ";
     this._parentEl.insertAdjacentHTML("afterbegin",html1)
   }

//Generates the Error msg for not getting the desired  recipe details.
renderError(message){
  const html2 = `
  <div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div> 
  `;
  this._parentEl.innerHTML=" ";
  this._parentEl.insertAdjacentHTML("afterbegin",html2)
}

renderMsg(message = this._Msg){
  const html2 = `
  <div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div> 
  `;
  this._parentEl.innerHTML=" ";
  this._parentEl.insertAdjacentHTML("afterbegin",html2)
}
}