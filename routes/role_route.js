const router = require("express").Router()
const roleController = require("../controllers/role_controller")
const { jwtMiddleware } = require("../middleware/auth_middleware")
const roleMiddlewate = require("../middleware/role_middleware")

router.post('/create', [jwtMiddleware, roleMiddlewate(["admin"])], roleController.createRole)

module.exports = router