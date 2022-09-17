import { authAPI } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
}

export const authReducer = (state:any = initialState, action:any) => {

    switch(action.type){
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId:any, email:any, login:any, isAuth:boolean ) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}
    }
}

export const getAuthUserData = () => async(dispatch:any) => {
    let response = await authAPI.me()
        if (response.data.resultCode === 0){
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
}
export const login = (email:string, password:string, rememberMe:boolean, setStatus:any, setSubmitting:any) => async(dispatch:any) => {
        let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else { setStatus(response.data.messages) };
            setSubmitting(false);        
}
export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null, null, null, false))
        }
}
