const ApiError = require("../error/ApiError")
const { Item, Sizes, Type, Brand, ItemSize } = require("../models/models")
const uuid = require('uuid')
const path = require('path')

class ItemController {
    async addItem(req, res) {
        try {
            if (!req.body) {
                return res.json(ApiError.internal("You must provide info"))
            }

            const { name, price, rating, item_info, type, brand } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            let Ctype = await Type.findOrCreate({
                where: {
                    name: type
                }
            })

            let Cbrand = await Brand.findOrCreate({
                where: {
                    name: brand
                }
            })

            let candidate = await Item.findOne({
                where: {
                    name
                }
            })
            if (candidate) {
                return res.json(ApiError.badRequest('Item already exist'))
            }
            let item = await Item.create({
                name,
                price,
                rating,
                img: fileName,
                item_info,
                typeId: Ctype.id,
                brandId: Cbrand.id,
            })
            return res.json(item)
        } catch (e) {
            return res.json(e)
        }
    }
    async updateItemQuantity(req, res) {
        try {
            let { itemName, size, count } = req.body

            let _size = await Sizes.findOne({
                where: {
                    size
                }
            })

            let Citem = await Item.findOne({
                where: {
                    name: itemName
                },
                include: {
                    model: ItemSize,
                    where: {
                        sizeId: _size.id
                    },
                    include: [
                        Sizes
                    ]
                }
            })

            if (Citem) {
                let entity = await ItemSize.findOne({
                    where: {
                        itemId: Citem.id,
                        sizeId: _size.id
                    }
                })
                entity.count = count
                entity.save()
            }
            else {
                return res.json("Not found item with this size")
            }
        } catch (e) {
            return res.json(e)
        }
    }

    async getItem(req, res) {
        try {
            let { id } = req.params
            let candidate = await Item.findOne({
                where: {
                    id: id
                }, include: {
                    model: ItemSize,
                    include: [
                        Sizes
                    ]
                }

            })

            if (!candidate) {
                return res.json(ApiError.badRequest("Not found"))
            }

            return res.json(candidate)

        } catch (e) {
            return res.json(e)
        }
    }
    async getAllItems(req, res) {
        try {

            let { category } = req.params
            let candidates

            if (!category) {
                candidates = await Item.findAndCountAll({
                    include: {
                        model: ItemSize,
                        include: [
                            Sizes
                        ]
                    }
                })
            }

            candidates = await Item.findAndCountAll({
                where: {
                    category: category
                }, include: {
                    model: ItemSize,
                    include: [
                        Sizes
                    ]
                }
            })
            return res.json(candidates)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new ItemController()