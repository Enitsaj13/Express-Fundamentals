import express from 'express';
const router = express.Router();

let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
];


// Get all posts
router.get('/', (req, res) => {

    // limit the response in the query params
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);

});

// Get single post
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const post = posts.find((post) => post.id === id)

    if (!post) {
        return res.status(404).json({ msg: `A post with the id of ${id} was not found` });
    }
    res.status(200).json(post);
});

// Create new post
router.post('/', (req, res) => {
    const { title } = req.body;


    const newPost = {
        id: posts.length + 1,
        title: title,
    };

    if (!newPost.title) {
        return res.status(404).json({ msg: 'Please include a title' });
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

// Update Post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
            .status(404)
            .json({ msg: `A post with the id of ${id} was not found` });
    }
    post.title = req.body.title;
    res.status(200).json(posts);
});

// Delete POst
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
            .status(404)
            .json({ msg: `A post with the id of ${id} was not found` });
    }

    posts = posts.filter((post) => post.id !== id); // overwrite the post
    res.status(200).json(posts);
});


export default router;