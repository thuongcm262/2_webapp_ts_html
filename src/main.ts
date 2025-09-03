console.log("Hello, World!");

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts"

const postsList = document.getElementById("posts") as HTMLUListElement;
const createBtn = document.getElementById("createBtn") as HTMLButtonElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const bodyInput = document.getElementById("body") as HTMLTextAreaElement;

// load posts
async function loadPosts(){
    postsList.innerHTML = "Loading posts...";
    const response = await fetch(API_URL);
    const posts: Post[] = await response.json();
    postsList.innerHTML = "";
    posts.slice(0,10).forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${post.title}</strong>
        <p>${post.body}</p>
        <button class="deleteBtn" data-id="${post.id}">Delete</button>
        `
        postsList.appendChild(li);
    })
}

loadPosts()