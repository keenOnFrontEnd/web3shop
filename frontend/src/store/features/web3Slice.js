import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { connect, disconnect, checkConnection } from '../../api/userApi'


export const provider = new ethers.providers.Web3Provider(window.ethereum)
export let network = ethers.providers.getNetwork("goerli")
let signer = provider.getSigner()


let setProvider = async () => {
    await provider.send("eth_requestAccounts", []);
}


const initialState = {
    adress: '',
    loadingConnection: null,
    loadingWritingMessage: null,
    dismiss: null,
    unsupportedNetwork: false,
    isConnected: false
}

export const CheckConnectionThunk = createAsyncThunk(
    'web3/checkConnection',
    async (action, { dispatch }) => {
        try {
            let accounts = await provider.listAccounts()
            let currentNetwork = await provider.getNetwork()
            let adress = accounts[0]
            if(!adress) {
                dispatch(logout())
            }
            let res = await checkConnection({adress})
            if(res.data && res.data === true) {
                if (currentNetwork.chainId !== network.chainId) {
                    dispatch(setUnsupportedNetwork(true))
                } else {
                    dispatch(setAdress(adress))
                    dispatch(setIsConnected(true))
                }
            } else {
                dispatch(logout())
            }
        } catch (e) {
            return e
        }
    }
)


export const RegistrationThunk = createAsyncThunk(
    'web3/setAdressThunk',
    async (action, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoadingConnection(true))
            await setProvider()
                .catch((e) => dispatch(setLoadingConnection(false)))
            let adress = await signer.getAddress()
            dispatch(setLoadingConnection(false))
            dispatch(setLoadingWritingMessage(true))
            let signature = await signer.signMessage('Registration account')
                .catch((e) => dispatch(setLoadingConnection(false)))
            let res = await connect({ signature, adress })
            if(res.data) {
                let {jwt, isConnected} = res.data
                dispatch(setLoadingWritingMessage(false))
                localStorage.setItem('jwt', jwt)
                dispatch(setIsConnected(isConnected))
                dispatch(setAdress(adress))
            } else {
                rejectWithValue("Something goes wrong")
            }
           
        } catch (e) {
            return e
        }
    }
)

export const accountChangedThunk = createAsyncThunk(
    'web3/accountChanged',
    async (action, { dispatch }) => {
        try {
            let adress = action
            console.log(adress)
            dispatch(setLoadingWritingMessage(true))
            let signature = await signer.signMessage('Registration account')
                .catch((e) => dispatch(setLoadingConnection(false)))
            let res = await connect({ signature, adress })
            if(res.data) {
                let {jwt} = res.data
                localStorage.setItem('jwt', jwt)
                dispatch(setIsConnected(true))
                dispatch(setAdress(adress))
                dispatch(setLoadingWritingMessage(false))
            }
        } catch (e) {
            return e
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'web3/logout',
    async (action, { dispatch }) => {
        try {
            let adress = await signer.getAddress()
            let res = await disconnect({adress})
            if(res.data) {
                console.log(res.data)
                dispatch(logout())
                localStorage.removeItem('jwt')
            }
        } catch (e) {

        }
    }
)



const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setAdress: (state, action) => {
            state.adress = action.payload
        },
        setLoadingConnection: (state, action) => {
            state.loadingConnection = action.payload
        },
        setLoadingWritingMessage: (state, action) => {
            state.loadingWritingMessage = action.payload
        },
        setUnsupportedNetwork: (state, action) => {
            state.unsupportedNetwork = action.payload
        },
        logout: (state, action) => {
            state.adress = ''
            state.isConnected = false
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload
        }
    },
})

export const { setAdress, setLoadingConnection, setLoadingWritingMessage, setUnsupportedNetwork, logout,setIsConnected } = web3Slice.actions
export default web3Slice.reducer