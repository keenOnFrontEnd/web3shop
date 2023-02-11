import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { register } from '../../api/registration';


export const provider = new ethers.providers.Web3Provider(window.ethereum)
provider.on('accountsChanged', function (accounts) {
    console.log(accounts)
    window.location.reload()
  })
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
    unsupportedNetwork: false
}

export const CheckConnectionThunk = createAsyncThunk(
    'web3/checkConnection',
    async (action, { dispatch, getState }) => {
        try {
            let accounts = await provider.listAccounts()
            let currentNetwork = await provider.getNetwork()
            if(currentNetwork.chainId !== network.chainId) {
                dispatch(setUnsupportedNetwork(true))
            }
            dispatch(setAdress(accounts[0]))
        } catch (e) {
            return e
        }
    }
)


export const RegistrationThunk = createAsyncThunk(
    'web3/setAdressThunk',
    async (action, { dispatch }) => {
        try {
            dispatch(setLoadingConnection(true))
            await setProvider()
                .catch((e) => dispatch(setLoadingConnection(false)))
                .then((res) => console.log(res))
            let adress = await signer.getAddress()
            dispatch(setLoadingConnection(false))
            dispatch(setLoadingWritingMessage(true))
            let signature = await signer.signMessage('Registration account')
                .catch((e) => dispatch(setLoadingConnection(false)))
                .then((res) => dispatch(setAdress(adress)))
            dispatch(setLoadingWritingMessage(false))

            // let res = await register({signature, adress})
            // localStorage.setItem('jwt', res.data)
        } catch (e) {
            return e
        }
    }
)

export const accountChangedThunk = createAsyncThunk(
    'web3/accountChanged',
    async (action, {dispatch}) => {
        try {
            let adress = await signer.getAddress()
            dispatch(setLoadingWritingMessage(true))
            let signature = await signer.signMessage('Registration account')
                .catch((e) => dispatch(setLoadingConnection(false)))
                .then((res) => dispatch(setAdress(adress)))
            dispatch(setLoadingWritingMessage(false))
        } catch (e) {
            return e
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'web3/logout',
    async (action, {dispatch}) =>  {
        try {
            dispatch(logout())
            window.ethereum.on('disconnect', () => {
                window.location.reload()
            })
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
        }
    },
})

export const { setAdress, setLoadingConnection, setLoadingWritingMessage,setUnsupportedNetwork,logout } = web3Slice.actions
export default web3Slice.reducer