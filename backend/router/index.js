const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const sizeRouter = require('./sizeRouter')
const basketRouter = require('./basketRouter')

router.use("/user", userRouter)
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/brand',brandRouter)
router.use('/size', sizeRouter)
router.use('/basket', basketRouter)

module.exports = router