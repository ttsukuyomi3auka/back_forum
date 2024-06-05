const { Schema, model } = require('mongoose')
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
    roles: [{ type: String, ref: 'Role', default: "user" }]

})
module.exports = model('User', UserSchema)