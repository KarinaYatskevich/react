const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEWS-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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
}

export const dialogsReducer = (state:any = initialState, action:any) => {
    
    switch(action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state, 
                newMessageBody: action.body
            }
        case SEND_MESSAGE:  
            let body = state.newMessageBody
            return {
                ...state, 
                newMessageBody: "",
                messages: [...state.messages, {id: 6, message: body}]
            }          
        default:
            return state
    }
}

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}
export const updateNewMessageBodyCreator = (body:any) => {
    return {type: UPDATE_NEW_MESSAGE_BODY , body: body }
}