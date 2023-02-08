const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()



router.post('/registration',userController.registration)
router.post('/login')

module.exports = router