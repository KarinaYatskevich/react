import React from 'react'
import s from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return(
        <div className={s.messagesItems}>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}


export default Message