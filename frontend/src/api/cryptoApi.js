import axios from "axios";

export const getETHprice = async () => {
    let data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .catch(error => console.error(error))
    return data
}
