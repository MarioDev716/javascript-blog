'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function titleClickHandler(event) {
  // console.log('titleClickHandler started!');
  event.preventDefault();
  const clickedElement = this;
  console.clear();
  console.log('Post link was clicked: ' + this);

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  /* [DONE] get 'href' attribtue from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' atrribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
  // console.log('generateTitleLinks started!');
  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  // console.log('customSelector: ' + customSelector);

  /* [DONE] for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  // console.log('Articles: ', articles);

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */

    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  // console.log('generateTags started!');

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event) {
  console.log('tagClickHandler started!');

  /* prevent default action for this event */
  event.preventDefault();
  // console.clear();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log('Tag link was clicked: ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log('Only tag name: ' + tag);
  // console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
    console.log('Remove .active from: ', activeLink);
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    // console.log('Active class add to: ' + tagLink);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  // console.log('addClickListenersToTags started!');
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  console.log('>>> generateAuthors started!');
  const articles = document.querySelectorAll(optArticleSelector);
  // const autorWrapper = document.querySelector(optArticleAuthorSelector);
  let html = '';
  for (let article of articles) {
    const authorName = article.getAttribute('data-author');
    const articleName = article.getAttribute('id');
    // console.log('href: ', articleName);
    // console.log('Author: ', authorName);
    const authorHTML =
      '<a href="#' + articleName + '"> author: ' + authorName + '</a>';
    // console.log('HTML: ' + authorHTML);
    const test = '#' + articleName + ' > .post-author';
    // console.log('Test: ' + test);
    const authorWrapper = document.querySelector(test);
    // console.log('Article selector: ' + authorWrapper);
    authorWrapper.innerHTML = authorHTML;
  }
  console.log(html);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  console.clear();
  console.log('>>> authorClickHandler started!');
  const clickedElement = this;
  clickedElement.getAttribute('innerHTML');
  console.log('innerHTML: ' + clickedElement);
}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll('.post-author a');
  console.log('authorLinks: ', authorLinks);
  for (let author of authorLinks){
    author.addEventListener('click', authorClickHandler);
  }
  

}

addClickListenersToAuthors();

/* Wskazówki */

/* [DONE] Potrzebujesz napisać funkcję generateAuthors, wzorując się na generateTags, */

/* [DONE] Funkcja generateAuthors będzie prostsza niż generateTags, ponieważ jest tylko jeden autor artykułu – nie musisz dzielić tego pola funkcją split, ani wykonywać pętli podobnej do tej iterującej po tagach. Dla każdego artykułu będzie tylko jeden link do autora. */

/* Napisz też funkcje addClickListenersToAuthors i authorClickHandler, wzorując się na addClickListenersToTags i tagClickHandler. */

/* Nie musisz w żaden sposób zmieniać funkcji generateTitleLinks – wystarczy, że w funkcji authorClickHandler wywołasz ją z odpowiednim argumentem. Pamiętaj, że w tym wypadku w selektorze atrybutu użyjesz łącznika = zamiast ~=. */

/* Nie zapomnij dodać nowej stałej ustawień – optArticleAuthorSelector. */

/* Usuń przykładową zawartość listy autorów z kodu HTML – nie będzie nam już potrzebna. */
