'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.list.tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.clear();

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
  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

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

function calculateTagsParams(tags) {
  /* [DONE] Add object const with default value  */
  const params = { max: 0, min: 999999 };
  /* [DONE] LOOP: for each tags value */
  for (let tag in tags) {
    /* [DONE] Calculate min and max values for tags argument */
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

/* [NEW] Function to generate class for Cloud Tags */
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix, classNumber;
}

function generateTags() {
  /* [DONE] create a new variable allTags with an empty array */
  /* [DONE] change array to object */
  let allTags = {};

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

      /* [DONE] check if this link is NOT already in allTags */

      let linkHTML = tagHTML;
      /* [DONE] Change parameters to use object structure */
      if (!allTags.hasOwnProperty(tag)) {
        /* [DONE] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    /*     allTagsHTML +=
      '<li><a href="#tag-' +
      tag +
      '"> ' +
      tag +
      ' </a> (' +
      allTags[tag] +
      ')</li>'; */
    /* [NEW] Generate HTML code with class for cloud tags */
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      optCloudClassPrefix +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      '</a></li>';
    allTagsHTML += tagLinkHTML;
  }
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  console.log('>>> tagClickHandler started!');

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
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
  /* Find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [NEW] create object for all authors */

  let allAuthors = {};

  /* For each article get atribute data-author and id */
  for (let article of articles) {
    const authorName = article.getAttribute('data-author');
    const articleName = article.getAttribute('id');
    /* Develop HTML code for links to author */
    const authorHTML =
      '<a href="#author-' + authorName + '"> author: ' + authorName + '</a>';
    const test = '#' + articleName + ' > .post-author';
    const authorWrapper = article.querySelector(test);
    authorWrapper.innerHTML = authorHTML;

    if (!allAuthors.hasOwnProperty(authorName)) {
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  }

  const authorsListHTML = document.querySelector(optAuthorsListSelector);

  let HTML = '';

  for (let author in allAuthors) {
    HTML +=
      '<li><a href="#author-' +
      author +
      '">' +
      author +
      '</a>(' +
      allAuthors[author] +
      ')</li>';
  }
  authorsListHTML.innerHTML = HTML;
}

generateAuthors();

function authorClickHandler(event) {
  console.log('>>> authorClickHandler started!');

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(
    '.post-author a, .list.authors a'
  );
  for (let author of authorLinks) {
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
