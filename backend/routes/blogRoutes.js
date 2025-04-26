const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/blogController');

const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// user routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Admin routes
router.post('/', authenticate, isAdmin, createPost);
router.put('/:id', authenticate, isAdmin, updatePost);
router.delete('/:id', authenticate, isAdmin, deletePost);

module.exports = router;
