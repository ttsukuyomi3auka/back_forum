const { Schema, model } = require('mongoose')

const { Roles } = require('./enum')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    aboutMe: {
        type: String,
        default: ""
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.USER,
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    areas: {
        type: [Schema.Types.ObjectId],
        ref: 'Area',
    }

})
module.exports = model('User', UserSchema)