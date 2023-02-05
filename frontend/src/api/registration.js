import axios from "axios"

let host = 'http://localhost:7001/api'

export const register = async ({signature, adress}) => {
    try {
        return await axios.post(`${host}/user/registration`, {signature, adress})
    } catch (e) {
        return e
    }
}