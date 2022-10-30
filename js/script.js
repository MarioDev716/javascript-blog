'use strict';
const clickedElement = this;

function titleClickHandler(event) {
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        console.log('Removed .active from . titles: ' + activeLink);
        activeLink.classList.remove('active');
    }

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
        console.log('Removed .active form .posts: ' + activeArticle);
        activeArticle.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement: ', clickedElement);

    /* get 'href' attribtue from the clicked link */

    /* find the correct article using the selector (value of 'href' atrribute) */

    /* add class 'active' to the correct article */

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}