const Router = require('express')
const router = new Router()
const TypeController = require('../controllers/typeController')


router.post('/create',TypeController.create)
router.get('/',TypeController.getAll)
router.delete('/delete/:name',TypeController.delete)


module.exports = router