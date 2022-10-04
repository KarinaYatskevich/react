import usersAPI, { profileAPI } from "../api/api"
import {PostType, ProfileType} from '../types/types';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEWS-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
    posts: [
        {id:1, message: 'Hi, how are you'},
        {id:2, message: 'My first project'},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    newPostText: 'new post',
    status: ""
}

export type InitialStateType = typeof initialState;

export const profileReducer = (state= initialState, action:any):InitialStateType => {
    switch(action.type){
        case ADD_POST:{
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT:{
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE:{
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS:{
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

export const addPostActionCreator = () => {
    return { type: ADD_POST}
}


type updateNewPostActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostActionCreator = (text:string):updateNewPostActionType => {
    return {type: UPDATE_NEW_POST_TEXT , newText: text }
}


type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => {
    return {type: SET_USER_PROFILE , profile: profile }
}


type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string):SetStatusActionType => {
    return {type: SET_STATUS , status: status }
}


export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
}
export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}
export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0){
            dispatch(setStatus(status))
        }
}