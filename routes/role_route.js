const router = require("express").Router()
const roleController = require("../controllers/role_controller")


router.post('/create', roleController.createRole)
router.post('/add', roleController.addRoleToUser)
router.post('/remove', roleController.removeUserRole)

module.exports = router