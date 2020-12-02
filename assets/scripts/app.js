const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');


const url='https://jsonplaceholder.typicode.com/posts';


function sendHttpRequest(method,url){
    const promise = new Promise((rseolve,reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open(method,url);
        xhr.send();
        xhr.responseType='json';
        
        xhr.onload = function(){
            rseolve(xhr.response);
            const listOfPosts = xhr.response;
            // iterate over every json and append it to the list of elements
           
            }
    })
   return promise;
}


async function fetchPosts(url){

    const listOfPosts = await sendHttpRequest('GET',url);

    for(const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content,true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl);
}
}

// function fetchPosts(url){
//     sendHttpRequest('GET',url).then(listOfPosts=>{
//         for(const post of listOfPosts){
//             const postEl = document.importNode(postTemplate.content,true);
//             postEl.querySelector('h2').textContent = post.title.toUpperCase();
//             postEl.querySelector('p').textContent = post.body;
//             listElement.append(postEl);
//     }
// })
// }

fetchPosts(url)