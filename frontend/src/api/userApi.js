import axios from "axios"

let host = 'http://localhost:7001/api'

export const connect = async ({signature, adress}) => {
    try {
        return await axios.post(`${host}/user/login`, {signature, adress})
    } catch (e) {
        return e
    }
}
export const disconnect = async ({adress}) => {
    try {
        return await axios.post(`${host}/user/logout`, {adress})
    } catch (e) {
        return e
    }
}
export const checkConnection = async({adress}) => {
    try {
        return await axios.post(`${host}/user/`, {adress})
    } catch (e) {
        return e
    }
}