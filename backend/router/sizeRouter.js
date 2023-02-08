const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeController')


router.post('/create',sizeController.addSize)
router.delete('/delete/:name',sizeController.removeSize)


module.exports = router
