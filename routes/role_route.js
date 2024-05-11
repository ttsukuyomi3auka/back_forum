const router = require("express").Router()
const roleController = require("../controllers/role_controller")


router.post('/create',  roleController.createRole)
router.post('/add',  roleController.addRole)

module.exports = router