import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('jwtToken')
    ? localStorage.getItem('jwtToken')
    : null

const initialState = {
    auth: token!==null,
    userInfo: {},
    token: token,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signIn: (state, action) => {
            state.auth = true
            state.token = action.payload.token
            state.error = null
        },
        signOut: (state) =>{
            state.auth = false
            state.userInfo = {}
            state.token = null
            state.error = null
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        wrongPassword: (state) =>  {
            state.auth = false
            state.error = "wrong password"
            state.userInfo = {}
            state.token = null
        },
        changeName: (state, action) => {
            state.userInfo.userName = action.payload.userName;
        },
        changeEmail: (state, action) => {
            state.userInfo.email = action.payload.email;
        },
        sessionExpired: (state) => {
            state.auth = false
            state.userInfo = {}
            state.token = null;
            state.error = "session expired"
            localStorage.removeItem('jwtToken')
        }
    }
})

export const { signIn, wrongPassword, signOut, updateUserInfo, changeEmail, changeName, sessionExpired } = userSlice.actions

export default userSlice.reducer