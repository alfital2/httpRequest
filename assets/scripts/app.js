const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');



function sendHttpRequest(method, url, data) { // data is optional

    const fetchConfiguration = {
        'method': method,
        body: data
    }

    return fetch(url, fetchConfiguration)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                throw new Error("could reach the server!");
            }
        })
        .catch(error => {
            throw new Error('unknow error');
        })
}



async function fetchPosts(url) {
    try {
        const responseData = await sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts'
        );
        const listOfPosts = responseData;
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    } catch (error) {
        alert(error.message)
    }
}

async function createPost(title, content) {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const userId = Math.random();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('body', content);
    formData.append('title', title);

    sendHttpRequest('POST', url, formData)
}




fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    createPost(enteredTitle, enteredContent);
})

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
});