console.log("Hello, World!");

interface Post {
  id?: number;
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
    posts.slice(-10).reverse().forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${post.id} - ${post.title}</strong>
        <p>${post.body}</p>
        <button class="deleteBtn" data-id="${post.id}">Delete</button>
        `
        postsList.appendChild(li);
    })

    // attach delete event
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const postId = (e.target as HTMLButtonElement).dataset.id;
            await fetch(`${API_URL}/${postId}`, { method: "DELETE" });
            loadPosts();
        })
    })
}

async function createPost(post: Post){
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    const newPost = await res.json();
    console.log("Created Post:", newPost);

    loadPosts();
}

createBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const body = bodyInput.value;
    if (title && body) {
        const newPost: Post = {
            title,
            body,
            userId: 1,
        };
        createPost(newPost);
    }
});

loadPosts()