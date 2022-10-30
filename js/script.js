'use strict';

function titleClickHandler(){
    console.log('Link was clicked!');
    console.log (event);
}

/* remove class 'active' from all article links */

/* add class 'active' to the clicked link */

/* get 'href' attribtue from the clicked link */

/* find the correct article using the selector (value of 'href' atrribute) */

/* add class 'active' to the correct article */

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}