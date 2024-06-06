const { Schema, model } = require('mongoose')

const AreaSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
})


module.exports = model("Area", AreaSchema)