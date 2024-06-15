const { Schema, model } = require('mongoose')

const { ViewStatus } = require('../models/enum')

const CommentSchema = new Schema({
    data: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: Object.values(ViewStatus),
        default: ViewStatus.PENDING
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    childer: {
        type: [Schema.Types.ObjectId],
        ref: 'NestedComment',
        default: [],
    }

})
module.exports = model('Comment', CommentSchema)
