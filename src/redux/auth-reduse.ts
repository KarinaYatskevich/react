import { authAPI, ResultCodesEnum } from "../api/api"

const SET_USER_DATA = 'auth/SET_USER_DATA'

let initialState = {
    userId: null as (number | null),
    email: null as (string | null),
    login: null as (string | null),
    isAuth: false,
    isFetching: false,
}

export type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action:any):InitialStateType => {

    switch(action.type){
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.data,
                isAuth: true,
                ...action.payload
            }
        default:
            return state
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA, payload:
        {userId, email, login, isAuth}
    }
}

export const getAuthUserData = () => async(dispatch:any) => {
    let meData  = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = meData.data
            dispatch(setAuthUserData(id, email, login, true))
        }
}

export const login = (email: string, password: string, rememberMe: boolean) => async(dispatch:any) => {
    let data = await authAPI.login(email, password, rememberMe);
    if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())      
}
}
export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null, null, null, false))
        }
}
