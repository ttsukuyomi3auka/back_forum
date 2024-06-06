const router = require('express').Router()
const { jwtMiddleware } = require("../middleware/auth_middleware")
const roleMiddlewate = require("../middleware/role_middleware")

router.get('/', (req, res) => res.send('hello'))

router.use('/role', [jwtMiddleware, roleMiddlewate(["admin"])], require("./role_route"))

router.use('/auth', require("./auth_route"))

router.use('/area', require('./area_route'))

module.exports = router
