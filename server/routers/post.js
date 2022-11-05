const router = require("express").Router();
const { body } = require("express-validator");
const authMiddleware = require('../middleware/auth');
const imageUpload = require('../controllers/upload');
const { addPost } = require("../controllers/post");

// METHOD: POST
// URL: /post/new
router.post("/new", authMiddleware, imageUpload.single('image'), addPost);

module.exports = router;