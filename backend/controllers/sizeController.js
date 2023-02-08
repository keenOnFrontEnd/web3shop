const ApiError = require("../error/ApiError")
const { Sizes } = require("../models/models")

class SizeController {
    async addSize (req,res) {
        try {
            const candidate = await Sizes.findOne({
                where: {
                    size: req.body.size
                }
            })
            if(candidate) {
                return res.json("Already Exists")
            }
            const color = await Sizes.create({ size: req.body.size })
            return res.json(color)
        } catch (e) {
            return res.json(ApiError.badRequest(e.message))
        }
    }
    async removeSize (req,res) {
        try {
            let {size} = req.params
            let candidate = await Sizes.findOne({
                where: {
                    size
                }
            })

            if(candidate) {
                candidate.destroy({force: true})
            }

        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new SizeController()