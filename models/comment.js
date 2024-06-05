const { Schema, model } = require('mongoose')

const CommentStatus = Object.freeze({
    PENDING: 'Pending',
    REJECTED: 'Rejected',
    APPROVED: 'Approved',
});


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
        enum: Object.values(CommentStatus),
        required: true,
    }


})
module.exports = model('Comment', CommentSchema)
