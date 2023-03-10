const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware,basketController.addItemToBasket)
router.get('/:userId',authMiddleware,basketController.getItemsFromBasket)
router.delete('/:id',authMiddleware,basketController.deleteItemFromBasket)
router.put('/increment',authMiddleware, basketController.increaseCountOfBasketItem)
router.put('/decrement',authMiddleware, basketController.decrementCountOfBasketItem)

module.exports = router
