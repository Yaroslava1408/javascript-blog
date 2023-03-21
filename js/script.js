'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!'); 
  
    
      
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add ('active');
  
  /*  [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href'); 
  console.log ("was clicked:", articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector (articleSelector);
  console.log (targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add ('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks (){
   
  /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ''; 

  /* [DONE] find all the articles and save them to variable: articles */
     let html = '';
  /* [DONE] for each article */
    const articles = document.querySelectorAll('.posts .post');;
    
    for(let article of articles){  
      /* [DONE] get the article id */   
      const articleId = article.getAttribute('id'); 
               
      /* [DONE] find the title element */
      const titleList = document.querySelector(optTitleListSelector); 

      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      
    
      /* [DONE] insert link html variable */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
      html = html + linkHTML;
            
    }
    titleList.innerHTML = html; 

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }    
 
}

generateTitleLinks();