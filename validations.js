const { body } = require("express-validator")

loginValidation = [
    body("username").isLength({ min: 4 }),
    body("password").isLength({ min: 8 }),
]
registerValidaton = [

]

module.exports = { loginValidation, registerValidaton }