const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()



router.post('/login',userController.sign_up_in)
router.post('/logout', userController.dissconnect)
router.post('/', userController.checkIfConnected)

module.exports = router