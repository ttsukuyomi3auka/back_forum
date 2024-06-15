const router = require("express").Router()
const roleController = require("../controllers/role_controller")
const { jwtMiddleware } = require("../middleware/auth_middleware")
const role_middleware = require("../middleware/role_middleware")
const { Roles } = require('../models/enum')


router.post('/change', [jwtMiddleware, role_middleware([Roles.ADMIN])], roleController.setRoleToUser)

module.exports = router