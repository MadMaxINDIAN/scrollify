const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const { cloudinary } = require("./cloudinary");

exports.postPage = async (req, res) => {
    const { postId } = req.params;
    const posts = await Post.findById(postId).populate('user');
    return res.json({
        message: "Posts fetched",
        posts: [posts]
    })
}

exports.commentPost = async (req, res) => {
    const { postId } = req.params;
    if (!req.body.comment) {
        return res.status(422).json({
            message: "Comment is required"
        })
    }
    const post = await Post.findById(postId);
    post.comments.push({ comment: req.body.comment, user: req.user._id });
    post.save().then(response => {
        res.json({
            message: "Post commented",
            post: response
        })
    })
}

exports.commentedPost = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json({
        message: "User commented post",
        users: post.comments
    })
}

exports.likedPost = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('likes');
    return res.json({
        message: "User liked post",
        users: post.likes
    })    
}

exports.likePost = async (req, res) => {
    const {postId} = req. params;
    const post = await Post.findById(postId);
    if (post.likes.includes(req.user._id)) {
        return res.json({
            message: "Post already liked"
        })
    } else {
        post.likes.push(req.user._id);
        post.save().then(response => {
            res.json({
                message: "Post liked",
                post: response
            })
        })
    }
}

exports.getAll = async (req, res) => {
    const posts = await Post.find().populate('user');
    return res.json({
        message: "Posts fetched",
        posts
    })
}

exports.addPost = async (req, res) => {
    // ERROR VALIDATION
    if (!req.body.description) {
        return res.status(422).json({
            message: "Description is required"
        })
    }

    if (req.files || req.file) {
        // cloudinary options
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const result = await cloudinary.uploader.upload(req.file.path,options);

        const post = await Post.create({
            description: req.body.description,
            img: result.secure_url,
            likes: [],
            comments: [],
            user: req.user._id
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