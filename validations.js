const { body } = require("express-validator")

const loginValidation = [
    body("username").isLength({ min: 4 }),
    body("password").isLength({ min: 8 }),
]
const registerValidaton = [
    body("username").isLength({ min: 4 }),
    body("password").isLength({ min: 8 }),
    body("name").isLength({ min: 2 }).isString(),
    body("surname").isLength({ min: 2 }).isString(),
]

module.exports = { loginValidation, registerValidaton }