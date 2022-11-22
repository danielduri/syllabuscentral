import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/counter/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})