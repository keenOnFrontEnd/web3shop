const ApiError = require('../error/ApiError')
const jsonwebtoken = require('jsonwebtoken')
const { ethers } = require('ethers')
const { User, Basket, BasketItem, Item, Sizes, ItemSize } = require('../models/models')

// const generateJwt = (adress) => {
//     return jsonwebtoken.sign({ adress },
//         process.env.SECRET_KEY,
//         { expiresIn: '1h' }
//     )
// }

class BasketController {
    // async addItemToBasket(req, res, next) {



    //     // const { signature, adress } = req.body
    //     // let verify = ethers.verifyMessage('Registration account',signature)

    //     // if (adress !== verify) {
    //     //     return res.json(ApiError.badRequest("Signature is not valid. You must provide"))
    //     // }
    //     // const candidate = await User.findByPk(verify)

    //     // if (candidate) {
    //     //     let jwt = generateJwt(candidate.id)
    //     //     return res.json(jwt)
    //     // }
    //     // const user = await User.create({ id: adress })
    //     // const basket = await Basket.create({ userId: adress })
    //     // const jwt = generateJwt(user.id)
    //     // return res.json(jwt)


    // }
    async addItemToBasket(req, res) {
        try {
            let { size,itemId, adress } = req.body

            let basketId = await Basket.findOne({
                where: {
                    userId: adress
                }
            })

            if (!basketId) {
                return res.json(ApiError.badRequest('Not exist basket for this user'))
            }

            let candidateSize = await Sizes.findOne({
                where: {
                    size
                }
            })

            let itemSize = await ItemSize.findOne({
                where: {
                    itemId,
                    sizeId: candidateSize.id
                }
            })

            if(itemSize.count < 1) {
                return res.json(ApiError.badRequest("Not enough items to sell"))
            }

            let candidate = await BasketItem.findOne({
                where: {
                    basketId: basketId.id,
                    itemSizeId: itemSize.id
                }
            })

            if (candidate) {
                await candidate.increment('count')
                return res.json(candidate)
            }
            else {
                let item = await BasketItem.create({
                    count: 1,
                    basketId: basketId.id,
                    itemSizeId: itemSize.id
                })
                return res.json(item)
            }



        } catch (e) {

        }
    }
    async getItemsFromBasket(req, res) {
        try {
            let { userId } = req.params
           
            let basketId = await Basket.findOne({
                where: {
                    userId
                }
            })

            if (!basketId) {
                return res.json(ApiError.badRequest("Not exist basket for this user"))
            }

            console.log(basketId.id)
            const basket_items = await BasketItem.findAndCountAll({
                where: { basketId: basketId.id },
                include: {
                    model: ItemSize,
                    include: [
                        Item,
                        Sizes
                    ]
                }
            })
            return res.json(basket_items)
        } catch (e) {
            return ApiError.badRequest(e.message)
        }
    }
    async increaseCountOfBasketItem(req, res) {
        try {
            const { id } = req.body

            const candidate = await BasketItem.findOne({
                where: { id: id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            await candidate.increment("count")
            return res.json(candidate)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async decrementCountOfBasketItem(req, res) {
        try {
            const { id } = req.body

            const candidate = await BasketItem.findOne({
                where: { id: id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            await candidate.decrement("count")
            if (candidate.count === 0) {
                await candidate.destroy()
                return res.json("deleted")
            }
            return res.json(candidate)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async deleteItemFromBasket(req, res) {
        try {
            const { id } = req.params
            const candidate = await BasketItem.findOne({
                where: { id: id }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            await candidate.destroy()
            return res.json("deleted")
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketController()










//     async deleteItem(req, res) {
//         try {
//             const { itemId } = req.params
//             const candidate = await BasketItem.findOne({
//                 where: { id: itemId }
//             })
//             if (!candidate) {
//                 return res.json(ApiError.badRequest("Not exists"))
//             }
//             BasketItem.destroy({
//                 where: { id: itemId }
//             })
//             return res.json("deleted")
//         } catch (e) {
//             return res.json(ApiError.badRequest(e.message))
//         }
//     }
//     async totalCount(req, res) {
//         try {
//             const { basketId } = req.params
//             let array = []
//             let itemsArray = []
//             let total = 0;
//             await BasketItem.findAll({
//                 where: { basketId }
//             })
//                 .then((res) => {
//                     res.forEach((res) => array.push({ count: res.count, itemId: res.itemId }))
//                 })

//             let count = async () => {
//                 for (const item of array) {
//                     let { id, price } = await Item.findOne({ where: { id: item.itemId } })
//                     itemsArray.push({ itemId: id, price })
//                 }
//             }
//             await count()

//             array.forEach((item, index) => {
//                 if (item.itemId === itemsArray[index].itemId) {
//                     total = total + (itemsArray[index].price * item.count)
//                     console.log(total)
//                 }
//             })

//             return res.json(total)

//         } catch (e) {
//             return res.json(ApiError.badRequest(e.message))
//         }
//     }
// }

// module.exports = new BasketController()