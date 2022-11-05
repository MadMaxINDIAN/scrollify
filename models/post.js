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
        type: mongoose.Schema.Types.ObjectId
    }],
    comments: [{
        comment: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("Post", postSchema);