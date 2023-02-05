import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './features/testSlice'





export const store = configureStore(
    {
        reducer: {
            test: rootReducer
        }
    })