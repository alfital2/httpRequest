const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const xhr = new XMLHttpRequest();

const url='https://jsonplaceholder.typicode.com/posts';

xhr.open('GET',url);
xhr.send();

xhr.responseType='json';

xhr.onload = function(){
    const listOfPosts = xhr.response;
    for(const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content,true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.bosy;
        listElement.append(postEl);
    }
};

