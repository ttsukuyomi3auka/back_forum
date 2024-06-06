const { jwtMiddleware } = require('../middleware/auth_middleware')
const postController = require('../controllers/post_controller')

const router = require('express').Router()

router.post('/create', [jwtMiddleware], postController.createPost)

router.put('/change', [jwtMiddleware], postController.updatePost)


module.exports = router