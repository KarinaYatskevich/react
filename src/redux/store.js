import { dialogsReducer } from "./dialogs-reduse"
import { profileReducer } from "./profile-reduse"
import { sidebarReducer } from "./sidebar-reduse"


let store = {
    _state: {
        profilePage: {
            posts: [
                {id:1, message: 'Hi, how are you', like: '5'},
                {id:2, message: 'My first project', like: '7'},
            ],
            newPostText: 'new post'
        },
        dialogsPage:{
            messages: [
                {id:1, message: 'hi'},
                {id:2, message: 'hello'},
                {id:3, message: 'Yo'}
            ],
            dialogs: [
                {id:1, name: 'Karina'},
                {id:2, name: 'Marina'},
                {id:3, name: 'Arina'},
                {id:4, name: 'Polina'},
                {id:5, name: 'Lina'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber () {
        console.log('change')
    },

    getState(){
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },
    addMessage (messMessage) {
        let newMessage = {
            id: 5,
            message: messMessage,
        }
    
        this._state.dialogsPage.messages.push(newMessage);
        this._callSubscriber(this._state)
    },

    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}


export default store
window.store = store