const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const sizeRouter = require('./sizeRouter')

router.use("/user", userRouter)
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/brand',brandRouter)
router.use('/size', sizeRouter)

module.exports = router