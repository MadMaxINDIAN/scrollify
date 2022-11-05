const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.addPost = async (req, res) => {
    // ERROR VALIDATION
    if (!req.body.description) {
        return res.status(422).json({
            message: "Description is required"
        })
    }

    if (req.files || req.file) {
        const post = await Post.create({
            description: req.body.description,
            img: req.file.path,
            likes: [],
            comments: []
        })
        return res.json({
            message: "Post created",
            post
        })
    } else {
        return res.status(400).json({
            message: "Image not uploaded"
        })
    }
}