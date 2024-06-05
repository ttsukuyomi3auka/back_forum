const { Schema, model } = require('mongoose')
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    areas: {
        type: [String],
        default: [],
    },
    comments: [{ type: String, ref: 'Comment' }]

})
module.exports = model('Post', PostSchema)