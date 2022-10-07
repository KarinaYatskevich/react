import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
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

type RootReducerType = typeof reducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


declare const window: any;
window.__store__ = store

export default store