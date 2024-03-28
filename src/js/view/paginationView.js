import View from "./view";
import icons from "url:../../img/icons.svg";


class PaginationView extends View{
_parentEl = document.querySelector(".pagination");

addHandler(handler){
 this._parentEl.addEventListener("click",function(e){
    const btn = e.target.closest(".btn--inline");
    if(!btn) return;
    const goToPage = +btn.dataset.goto;
    handler(goToPage);
 })
}
_generateHTML(){
   const currentPage = this._data.page;
   const numPages = Math.ceil(this._data.results.length / 10);

    //Page 1, there are other pages
    if(currentPage === 1 && numPages >1){
     return `
     <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
     `;
    }
    //page 1, and there are no other pages
    if(currentPage === numPages && numPages > 1){
        return `
        <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${currentPage -1 }</span>
             </button>
        `;
    }
    //Last Page
    if(currentPage < numPages){
    return `
    <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${currentPage -1 }</span>
      </button>
      <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
               <span>Page ${currentPage+1}</span>
               <svg class="search__icon">
                 <use href="${icons}#icon-arrow-right"></use>
               </svg>
      </button>
        `;
    }
    //Other page
    return ``;
}
_generateHTMLButton(){

}
}

export default new PaginationView();