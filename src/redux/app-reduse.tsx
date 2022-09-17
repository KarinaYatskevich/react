import { authAPI } from "../api/api"
import { getAuthUserData } from "./auth-reduse"

const SET_USER_DATA = 'SET_USER_DATA'
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false,
}

export const appReducer = (state:any = initialState, action:any) => {

    switch(action.type){
        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess =  () => {
    return {
        type: INITIALIZED_SUCCESS,
    }
}

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(()=>{
            dispatch(initializedSuccess())
        })


}
