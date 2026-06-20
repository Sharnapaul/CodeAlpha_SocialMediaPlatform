const express = require('express');
const app = express();
const PORT = 4000; // ১ম প্রজেক্টের সাথে যাতে কনফ্লিক্ট না হয় তাই পোর্ট ৪০০৪ দিলাম

app.use(express.json());
app.use(express.static('public'));

// ডামি ডেটা (পোস্ট, ইউজার)
let posts = [
    { id: 1, author: "Admin", content: "Welcome to AlphaSocial! 🚀", likes: 5, comments: [] }
];

// API: সব পোস্ট পাওয়া
app.get('/api/posts', (req, res) => res.json(posts));

// API: নতুন পোস্ট করা
app.post('/api/posts', (req, res) => {
    const newPost = { id: Date.now(), author: req.body.author, content: req.body.content, likes: 0, comments: [] };
    posts.unshift(newPost);
    res.json(newPost);
});

// API: লাইক দেওয়া
app.post('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) { post.likes++; res.json(post); }
});

app.listen(PORT, () => console.log(`Social App running: http://localhost:${PORT}`));