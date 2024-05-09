const router = require('express').Router()


router.get('/', (req, res) => res.send('hello'))

router.use('/auth', require("./auth_route"))

module.exports = router