const router = require("express").Router();
const { body } = require("express-validator");
const authMiddleware = require('../middleware/auth');
const imageUpload = require('../controllers/upload');
const { addPost } = require("../controllers/post");
const { getAll } = require("../controllers/post");
const { likePost } = require("../controllers/post");
const { likedPost } = require("../controllers/post");
const { commentedPost } = require("../controllers/post");
const { commentPost } = require("../controllers/post");
const { postPage } = require("../controllers/post");

// METHOD: POST
// URL: /post/new
router.post("/new", authMiddleware, imageUpload.single('image'), addPost);

// METHOD: GET
// URL: /post/getall
router.get("/getall", authMiddleware, getAll);

// METHOD: GET
// URL: /post/:postId
router.get("/:postId", authMiddleware, postPage);

// METHOD: POST
// URL: /post/like/:postId
router.post('/like/:postId', authMiddleware, likePost);

// METHOD: GET
// URL: /post/liked/:postId
router.get('/liked/:postId', authMiddleware, likedPost);

// METHOD: POST
// URL: /post/comment/:postId
router.post('/comment/:postId', authMiddleware, commentPost);

// METHOD: GET
// URL: /post/comment/:postId
router.get('/comment/:postId', authMiddleware, commentedPost);

module.exports = router;