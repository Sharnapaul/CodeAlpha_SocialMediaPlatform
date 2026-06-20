async function loadFeed() {
    const res = await fetch('/api/posts');
    const posts = await res.json();
    const feed = document.getElementById('feed');
    feed.innerHTML = posts.map(p => `
        <div class="post-card">
            <strong>${p.author}</strong>
            <p>${p.content}</p>
            <button class="like-btn" onclick="likePost(${p.id})">👍 Like (${p.likes})</button>
        </div>
    `).join('');
}

async function createPost() {
    const author = document.getElementById('username').value;
    const content = document.getElementById('postContent').value;
    if(!author || !content) return alert("Fill all fields!");

    await fetch('/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ author, content })
    });
    document.getElementById('postContent').value = "";
    loadFeed();
}

async function likePost(id) {
    await fetch(`/api/posts/${id}/like`, { method: 'POST' });
    loadFeed();
}

loadFeed();