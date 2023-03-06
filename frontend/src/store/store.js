import { configureStore } from '@reduxjs/toolkit'
import itemSlice from './features/itemSlice'
import web3 from './features/web3Slice'


export const store = configureStore(
    {
        reducer: {
            web3: web3,
            items: itemSlice
        }
    })