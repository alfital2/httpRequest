const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');




function sendHttpRequest(method,url,data){ // data is optional
    const promise = new Promise((rseolve,reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open(method,url);

        xhr.send(JSON.stringify(data));

        xhr.responseType='json';
        
        xhr.onload = function(){
            if(xhr.status >=200 && xhr.status <300){
                rseolve(xhr.response);
            }
            else{
                reject(new Error('path could not be reached'))
            }
        }
        xhr.onerror = function(){
            reject(new Error('failed to send request!'))
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
        postEl.querySelector('li').id = post.id;
        listElement.append(postEl);
    }
}

async function createPost(title,content){
    const url='https://jsonplaceholder.typicode.com/posts';
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

postList.addEventListener('click',event=>{
    if (event.target.tagName === 'BUTTON'){
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
});