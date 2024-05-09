const router = require("express").Router()
const authController = require("../controllers/auth_controller")
const { loginValidation, registerValidaton } = require("../validations")
const errorMiddleware = require("../middleware/error_middleware")

router.post('/login', loginValidation, errorMiddleware, authController.login);
router.post('/registration', registerValidaton, errorMiddleware, authController.registration)
router.post('/refresh', authController.refresh)
module.exports = router