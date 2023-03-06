const Router = require('express')
const itemController = require('../controllers/itemController')
const router = new Router()


router.post('/add', itemController.addItem)
router.put('/update', itemController.updateItemQuantity)
router.get('/:id', itemController.getItem)
router.get('/', itemController.getAllItems)

module.exports = router

