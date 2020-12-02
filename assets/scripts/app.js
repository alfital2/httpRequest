const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

const url='https://jsonplaceholder.typicode.com/posts';


function sendHttpRequest(method,url,data){ // data is optional
    const promise = new Promise((rseolve,reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open(method,url);

        xhr.send(JSON.stringify(data));

        xhr.responseType='json';
        
        xhr.onload = function(){
            rseolve(xhr.response);
            }
    })
   return promise;
}


async function fetchPosts(url){
    const responseData = await sendHttpRequest(
        'GET',
        'https://jsonplaceholder.typicode.com/posts'
      );
      const listOfPosts = responseData;
    for(const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content,true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl);
    }
}

async function createPost(title,content){
    const userId = Math.random();
    const post= {
        userId: userId,
        body: content,
        title: title
    }

    sendHttpRequest('POST',url, post)
}

fetchButton.addEventListener('click',fetchPosts);
form.addEventListener('submit',event=> {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    createPost(enteredTitle,enteredContent);
})

