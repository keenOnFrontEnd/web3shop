const ApiError = require('../error/ApiError')
const { Type } = require('../models/models')



class TypeController {
    async create(req, res) {
        console.log(req.body)
        const candidate = await Type.findOne({
            where: {
                name: req.body.name
            }
        })
        if (candidate) {
            return res.json("Alreadi exist")
        }
        const type = await Type.create({ name: req.body.name })
        return res.json(type)
    }
    async getAll(req, res) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (e) {
            return res.json(e)
        }
    }
    async delete(req, res) {
        try {
            const { name } = req.params
            const candidate = await Type.findOne({
                where: { name }
            })
            if (!candidate) {
                return res.json(ApiError.badRequest("Not exists"))
            }
            let responce = await Type.destroy({
                where: { name }
            })
            return res.json(responce)
        } catch (e) {
            return res.json(ApiError.internal(e.message))
        }
    }

}

module.exports = new TypeController()