import { configureStore } from '@reduxjs/toolkit'
import web3 from './features/web3Slice'





export const store = configureStore(
    {
        reducer: {
            web3: web3
        }
    })