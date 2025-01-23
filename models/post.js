// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the user model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the date/time when the post is created
    },
});

module.exports = mongoose.model('Post', postSchema);