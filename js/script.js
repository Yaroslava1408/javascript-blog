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
  console.log ('was clicked:', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector (articleSelector);
  console.log (targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add ('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles', 
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks (customSelector = ''){
   
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ''; 

  /* [DONE] find all the articles and save them to variable: articles */
  let html = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log (optArticleSelector);
  console.log(customSelector);
    
    
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles){ 
  
    /* find tags wrapper */
    const tagsWrapperList = article.querySelector(optArticleTagsSelector); 

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags'); 
    console.log (articleTags); 

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);  

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
    
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
           

      /* add generated code to html variable */
      tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
      html = html + linkHTML;
    }
  
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapperList.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();



function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked');
 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); 
  console.log ('clicked', href);
  

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll ('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
 
    /* remove class active */
    activeTagLink.classList.remove ('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant*/ 
  const targetTagLink = document.querySelectorAll('a[href="' + href + '"]');  
  console.log (targetTagLink);

  /* START LOOP: for each found tag link */
  for (let targetTagLink of activeTagLinks){
    /* add class active */
     
    targetTagLink.classList.add('active'); 
    console.log ('whether it works', targetTagLink);
  }
     
  
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}


function addClickListenersToTags(){ 
/* find all links to tags */
  const targetTagLinks = document.querySelectorAll ('a[href^="#tag-"]');
    
  /* START LOOP: for each link */
  for (let targetTagLink of targetTagLinks) {


    /* add tagClickHandler as event listener for that link */
    targetTagLink.addEventListener ('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}

addClickListenersToTags();
  

