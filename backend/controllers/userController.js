const ApiError = require('../error/ApiError')
const jsonwebtoken = require('jsonwebtoken')
const { ethers } = require('ethers')
const { User, Basket } = require('../models/models')

const generateJwt = (adress) => {
    return jsonwebtoken.sign({ adress },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )
}

class UserController {
    async sign_up_in(req, res, next) {
        const { signature, adress } = req.body
        let verify = ethers.verifyMessage('Registration account',signature)

        if (adress !== verify) {
            return res.json(ApiError.badRequest("Signature is not valid. You must provide"))
        }
        const candidate = await User.findByPk(verify)

        if (candidate) {
            let jwt = generateJwt(candidate.id)
            return res.json(jwt)
        }
        const user = await User.create({ id: adress })
        const basket = await Basket.create({ userId: adress })
        const jwt = generateJwt(user.id)
        return res.json(jwt)
    }
}

module.exports = new UserController()