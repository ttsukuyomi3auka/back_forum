const { Schema, model } = require('mongoose')
const { ViewStatus } = require('./enum')

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
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        type: [Schema.Types.ObjectId],
        ref: 'Area',
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment",
        default: [],
    },
    status: {
        type: String,
        enum: Object.values(ViewStatus),
        required: true
    }

})
module.exports = model('Post', PostSchema)