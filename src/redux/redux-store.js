import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './auth-reduse';
import { dialogsReducer } from "./dialogs-reduse"
import { profileReducer } from "./profile-reduse"
import { sidebarReducer } from "./sidebar-reduse"
import { usersReducer } from './users-reduse';
import  thunkMiddleware from 'redux-thunk'
import { appReducer } from './app-reduse';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app:appReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store