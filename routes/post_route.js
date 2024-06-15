const { jwtMiddleware } = require('../middleware/auth_middleware')
const postController = require('../controllers/post_controller')
const role_middleware = require('../middleware/role_middleware')
const { Roles } = require('../models/enum')

const router = require('express').Router()

router.post('/create', [jwtMiddleware], postController.createPost)

router.post('/change', [jwtMiddleware], postController.updatePost)

router.get('/', postController.getApprovedPosts)

router.get('/non-approved', [jwtMiddleware, role_middleware([Roles.ADMIN, Roles.MODERATOR])], postController.getAllNonApprovedPosts)

router.get('/post:id', postController.getPostById)

router.get('/delete:id', [jwtMiddleware, role_middleware([Roles.ADMIN, Roles.MODERATOR, Roles.USER, Roles.BANED])], postController.deletePost)

router.get('/user-posts/:id', postController.getUserPosts)


module.exports = router