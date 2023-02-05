import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum)

let setProvider = async () => {
    await provider.send("eth_requestAccounts", []);
}

let signer = provider.getSigner()

const initialState = { 
    adress: '',
}

export const setAdressThunk = createAsyncThunk(
    'test/setAdressThunk',
    async (action,{dispatch}) => {
        try {
            await setProvider()
            let adress = await signer.getAddress()
            dispatch(setAdress(adress))
        } catch (e) {
            return e
        }
    }
)



const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setAdress: (state,action) => {
        state.adress = action.payload
    }
  },
})

export const { setAdress } = testSlice.actions
export default testSlice.reducer