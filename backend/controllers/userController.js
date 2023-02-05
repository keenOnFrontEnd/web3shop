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
    async registration(req, res, next) {
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
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("User doesn't exist"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Invalid password"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

}

module.exports = new UserController()