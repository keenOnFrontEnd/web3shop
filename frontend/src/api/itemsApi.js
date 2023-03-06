import axios from "axios"

let host = 'http://localhost:7001/api'


export const getAllItems = async () => {
    let res = await axios.get(`${host}/item`)
    return res
}
export const getItem = async (id) => {
    let res = await axios.get(`${host}/item/${id}`)
    return res
}
export const addItem = async (data) => {
    let res = await axios.post(`${host}/item/add`, { data })
    return res
}
export const updateItem = async (data) => {
    let res = await axios.put(`${host}/item/update`, { data })
    return res
}
export const addItemToBasket = async(data) => {
    let res = await axios.post(`${host}/basket/`, data,{
        headers: {
            Authorization: `bearer ${localStorage.getItem("jwt")}`
        }
    })
    return res
}
export const getBasketItems = async(data) => {
    let res = await axios.get(`${host}/basket/${data}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem("jwt")}`
        }
    })
    return res
}
export const removeItemFromBasket = async(data) => {
    let res = await axios.delete(`${host}/basket/${data}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem("jwt")}`
        }
    } )
    return res
}

export const incrementBasketItem = async(data) => {
    let res = await axios.put(`${host}/basket/increment`,data,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('jwt')}`
        }
    })
    return res
}

export const decrementBasketItem = async(data) => {
    let res = await axios.put(`${host}/basket/decrement`,data,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('jwt')}`
        }
    })
    return res
}