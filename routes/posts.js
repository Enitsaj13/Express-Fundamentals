import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController';
const router = express.Router();

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPost);

// Create new post
router.post('/', createPost);

// Update Post
router.put('/:id', updatePost);

// Delete POst
router.delete('/:id', deletePost);


export default router;