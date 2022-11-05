const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        comment: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

module.exports = mongoose.model("Post", postSchema);