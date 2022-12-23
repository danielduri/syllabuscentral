import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    degree: null,
    year: null,
    period: null,
    language: "",
    code: null,
    name: "",
    intlName: "",
    shorthand: "",
    type: "",
    ECTS: null,
    subject: "",
    module: "",
    department: "",
    coordinator: "",
    minContents: [],
    program: [],
    results: [],
    evaluation: "",
    literature: [],
    competences: {
        basic: [],
        general: [],
        specific: []
    }
}

export const modelSlice = createSlice({
    name: 'model',
    initialState: initialState,
    reducers: {
        setDegree: (state, action) => {
            state.degree = action.payload.degree
        },
        setYear: (state, action) => {
            state.year = action.payload.year
        },
        setPeriod: (state, action) => {
            state.period = action.payload.period
        },
        setLanguage: (state, action) => {
            state.language = action.payload.language
        },
        setCode: (state, action) => {
            state.code = action.payload.code
        },
        setName: (state, action) => {
            state.name = action.payload.name
        },
        setIntlName: (state, action) => {
            state.intlName = action.payload.intlName
        },
        setShorthand: (state, action) => {
            state.shorthand = action.payload.shorthand
        },
        setType: (state, action) => {
            state.type = action.payload.type
        },
        setECTS: (state, action) => {
            state.ECTS = action.payload.ECTS
        },
        setSubject: (state, action) => {
            state.subject = action.payload.subject
        },
        setModule: (state, action) => {
            state.subject = action.payload.subject
        },

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
            state.userInfo = action.payload.userInfo
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

export const { signIn, wrongPassword, signOut, updateUserInfo, changeEmail, changeName, sessionExpired } = modelSlice.actions

export default modelSlice.reducer