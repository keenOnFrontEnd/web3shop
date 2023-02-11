const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()



router.post('/login',userController.sign_up_in)

module.exports = router