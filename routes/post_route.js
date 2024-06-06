const { jwtMiddleware } = require('../middleware/auth_middleware')
const postController = require('../controllers/post_controller')
const role_middleware = require('../middleware/role_middleware')
const { Roles } = require('../models/enum')

const router = require('express').Router()

router.post('/create', [jwtMiddleware], postController.createPost)

router.put('/change', [jwtMiddleware], postController.updatePost)

router.get('/', postController.getApprovedPosts)

router.get('/non-approved', [jwtMiddleware, role_middleware([Roles.ADMIN, Roles.MODERATOR])], postController.getAllNonApprovedPosts)


module.exports = router