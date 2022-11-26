import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import {modelSlice} from "./features/model/modelSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        model: modelSlice
    },
    devTools: false
})