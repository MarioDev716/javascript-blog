'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.clear();
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    // console.log('Removed .active from . titles: ' + activeLink);
    activeLink.classList.remove('active');
  }

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    // console.log('Removed .active form .posts: ' + activeArticle);
    activeArticle.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  // console.log('clickedElement: ', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  /* [DONE] get 'href' attribtue from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Clicked element href: ' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' atrribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('Article found: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks() {
  console.log('generateTitleLinks started!');

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList: ', titleList);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('articles: ', articles);

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    // console.log('articleId: ', articleId);

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log('articleTitle ', articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    // console.log('linkHTML: ' + linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  console.log(html);
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

// console.log('Links: ' + links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
