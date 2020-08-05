// const { paginate } = require("../src/app/models/teachers");

const currentPage = location.pathname;

const items = document.querySelectorAll('header .header a')

// for(item in items){
//     if(item.href currentPage.includes)
// }


function paginate (selectedPage, totalPages){
    let pages = [],
          oldPage = 0;
          
    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
         primeiraEUltimaPage = currentPage == totalPages || currentPage == totalPages -1 || currentPage == 1  || currentPage == 2
          
         maior = selectedPage > currentPage - 2 
         menor = selectedPage < currentPage + 2 

        if(primeiraEUltimaPage || maior && menor){

            if(oldPage && currentPage - oldPage > 2){
                pages.push("...")
            }
            if(oldPage && currentPage - oldPage == 2){
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }  
    return pages    
}

console.log(paginate(5,20))