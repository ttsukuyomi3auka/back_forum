const router = require('express').Router()
const { jwtMiddleware } = require("../middleware/auth_middleware")
const roleMiddlewate = require("../middleware/role_middleware")
const { Roles } = require('../models/enum')

router.get('/', (req, res) => res.send('hello'))

router.use('/role', [jwtMiddleware, roleMiddlewate([Roles.ADMIN])], require("./role_route"))

router.use('/auth', require("./auth_route"))

router.use('/area', require('./area_route'))

router.use('/post', require('./post_route'))

router.use('/user', require('./user_route'))

router.use('/comment', require('./comment_route'))

module.exports = router
