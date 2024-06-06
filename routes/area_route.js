const router = require('express').Router()
const areaController = require('../controllers/area_controller')
const { jwtMiddleware } = require('../middleware/auth_middleware')
const role_middleware = require('../middleware/role_middleware')
const { Roles } = require('../models/enum')


router.post("/add", [jwtMiddleware, role_middleware(Roles.ADMIN)], areaController.createArea)
router.get("/", areaController.getAllAreas)


module.exports = router