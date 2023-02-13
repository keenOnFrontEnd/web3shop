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
        let verify = ethers.verifyMessage('Registration account', signature)

        if (adress !== verify) {
            return res.json(ApiError.badRequest("Signature is not valid. You must provide"))
        }
        const candidate = await User.findByPk(verify)

        if (candidate) {
            let jwt = generateJwt(candidate.id)
            await candidate.update({ isConnected: true })
            return res.json({ jwt: jwt, isConnected: candidate.isConnected })
        }
        const user = await User.create({ id: adress })
        await user.update({ isConnected: true })
        const basket = await Basket.create({ userId: adress })
        const jwt = generateJwt(user.id)
        return res.json({ jwt: jwt, isConnected: user.isConnected })
    }
    async dissconnect(req, res) {
        try {
            const { adress } = req.body
            const candidate = await User.findOne({
                where: {
                    id: adress
                }
            })
            if (!candidate) {
                return res.json('Not exist')
            }
            if (candidate.isConnected === false) {
                return res.json(candidate.isConnected)
            } else {
                await candidate.update({isConnected: false})
                await candidate.save()
                return res.json(adress + ' is dissconnected')
            }
        } catch (e) {
            return e
        }
    }
    async checkIfConnected(req, res) {
        try {
            let { adress } = req.body
            let candidate = await User.findByPk(adress)
            return res.json(candidate.isConnected)
        } catch (e) {

        }
    }
}

module.exports = new UserController()