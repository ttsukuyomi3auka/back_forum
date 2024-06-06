const router = require("express").Router()
const roleController = require("../controllers/role_controller")

router.post('/change', roleController.setRoleToUser)

module.exports = router