'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML), 
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML), 
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles', 
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author', 
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  cloudClassCount: '6',
  cloudClassPrefix: 'tag-size-'
};

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

function generateTitleLinks (customSelector = ''){
   
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = ''; 

  /* [DONE] find all the articles and save them to variable: articles */
  let html = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  console.log (opts.articleSelector);
  console.log(customSelector);
    
    
  for(let article of articles){  
    /* [DONE] get the article id */   
    const articleId = article.getAttribute('id'); 
               
    /* [DONE] find the title element */
    const titleList = document.querySelector(opts.titleListSelector); 

    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999  
  };
  for (let tag in tags){
    console.log (tag + 'is used' + tags[tag] + 'times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
 
const calculateTagClass = function (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return opts.cloudClassPrefix + classNumber;
};

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object*/
  let allTags = {};
  console.log (allTags);

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles){ 
  
    /* find tags wrapper */
    const tagsWrapperList = article.querySelector(opts.articleTagsSelector); 
   
    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags'); 
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);  

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
    
      /* generate HTML of the link */
      
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      const linkHTMLData = {tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
      html = html + linkHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /*NEW add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      } 
   
      /* END LOOP: for each tag */
    } 
        
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapperList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in the right column */ 
  const tagList = document.querySelector(opts.tagsListSelector); 
   
  /* NEW add tagsParam function */
  const tagsParam = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParam);

  /*NEW create variable for all links HTML code */ 
  let allTagsHTML = ' '; 
   
  /* NEW START LOOP: for each tag in allTags: */ 
  for (let tag in allTags) { 

    /*NEW generate code of a link and add it to allTagsHTML */ 
    const tagLinkHTML = '<li><a class = ' + calculateTagClass (allTags[tag], tagsParam) + ' href="#tag-' + tag + '"><span>' + tag  + '(' + allTags[tag] + ')'+ '</span></a></li>';  
    
    /*NEW add HTML from allTags HTML to tagList */
  
    tagList.innerHTML = tagList.innerHTML + tagLinkHTML;
    allTagsHTML += allTagsHTML + tagList.innerHTML;
   
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


  /* find all tag links with "href" attribute equal to the "href" constant*/ 
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');  
  console.log (targetTagLinks);

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


function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};
  console.log (allAuthors);
    
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){ 
  
    /* find author wrapper */
    const authorWrapperList = article.querySelector(opts.articleAuthorSelector); 
    
    /* make html variable with empty string */
    let html = ' ';
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
       
    //const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    const linkHTMLData = {articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    
    /* add generated code to html variable */
    authorWrapperList.innerHTML = authorWrapperList.innerHTML + linkHTML;
    html = html + linkHTML;
  
     
          
    if (!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }

  /* [NEW] find list of authors in the right column */ 
  const authorsList = document.querySelector(opts.authorsListSelector); 
     

  /*NEW create variable for all links HTML code */ 
  let allAuthorsHTML = ' '; 
    

  /*NEW generate code of a link and add it to allAuthorsHTML */ 
     
  for (let articleAuthor in allAuthors) {
          
    //const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor  + '</span></a></li>';

    const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor  +  '(' + allAuthors[articleAuthor] + ')'+'</span></a></li>';
 
    /*NEW add HTML  to authorsList */
    authorsList.innerHTML = authorsList.innerHTML + authorLinkHTML;
    allAuthorsHTML = allAuthorsHTML + authorsList.innerHTML;
  
  } 
}



   

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('author was clicked');
 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); 
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll ('a.active[href^="#author-"]');

  /* find all author links with "href" attribute equal to the "href" constant*/ 
  const targetAuthorLink = document.querySelectorAll('a[href="' + href + '"]');  
  console.log (targetAuthorLink);

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){ 
  /* find all links to authors */
  const targetAuthorLinks = document.querySelectorAll ('a[href^="#author-"]');
      
  /* START LOOP: for each link */
  for (let targetAuthorLink of targetAuthorLinks) {
  
    /* add authorClickHandler as event listener for that link */
    targetAuthorLink.addEventListener ('click', authorClickHandler);
  
    /* END LOOP: for each link */
  }
  
}
  
addClickListenersToAuthors();
      
      
  