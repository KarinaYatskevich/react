import usersAPI from "../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEWS-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
    posts: [
        {id:1, message: 'Hi, how are you', like: '5'},
        {id:2, message: 'My first project', like: '7'},
    ],
    newPostText: 'new post',
    profile: null,
}

export const profileReducer = (state:any= initialState, action:any) => {

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
        default:
            return state
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostActionCreator = (text:any) => {
    return {type: UPDATE_NEW_POST_TEXT , newText: text }
}
export const setUserProfile = (profile:any) => {
    return {type: SET_USER_PROFILE , profile: profile }
}
export const getUserProfile = (userId:number) => (dispatch:any) => {
    usersAPI.getProfile(userId)
            .then((response) => {
                dispatch(setUserProfile(response.data))
            })
}