const Router = require('express')
const router = new Router()
const BrandController = require('../controllers/brandController')


router.post('/create',BrandController.create)
router.get('/',BrandController.getAll)
router.get('/:id',BrandController.getOne)
router.delete('/delete/:name',BrandController.delete)


module.exports = router
