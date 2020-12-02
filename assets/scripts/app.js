const xhr = new XMLHttpRequest();

const url='https://jsonplaceholder.typicode.com/posts';
xhr.open('GET',url);

xhr.send();