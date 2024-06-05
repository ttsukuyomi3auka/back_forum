const { Schema, model } = require('mongoose');

const NestedCommentSchema = new Schema({
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
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    }
});

module.exports = model('NestedComment', NestedCommentSchema);