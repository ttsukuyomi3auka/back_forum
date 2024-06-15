const { jwtMiddleware } = require('../middleware/auth_middleware')
const commentController = require('../controllers/comment_controller')
const role_middleware = require('../middleware/role_middleware')
const { Roles } = require('../models/enum')

const router = require('express').Router()

router.post('/create', [jwtMiddleware, role_middleware([Roles.ADMIN, Roles.MODERATOR, Roles.USER])], commentController.createComment)

router.get('/post:id', commentController.getPostComments)

module.exports = router