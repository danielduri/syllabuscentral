import { createSlice } from '@reduxjs/toolkit'
import {createUser, signIn} from "./userActions";

const initialState = {
    loading: false,
    auth: false,
    userInfo: {},
    token: null,
    error: null,
    success: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        //signIn
        [signIn.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [signIn.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.error = null
        },
        [signIn.pending]: (state) => {
            state.loading = true
            state.error = null
        },

        //createUser
        [createUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [createUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [createUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        }
    }
})

export default userSlice.reducer