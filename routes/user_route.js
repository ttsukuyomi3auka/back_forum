const router = require("express").Router()
const { jwtMiddleware } = require("../middleware/auth_middleware")
const role_middleware = require("../middleware/role_middleware")
const { Roles } = require('../models/enum')
const userController = require('../controllers/user_controller')

router.get('/:id', userController.getUserById)

router.post('/areas:id', [jwtMiddleware], userController.addAreasToUser)

module.exports = router