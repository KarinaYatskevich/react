import React, { useEffect, useState } from 'react'
import s from './Person.module.css'

const ProfileStatuswithHooks = (props:any) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e:any) => {
        setStatus(e.currentTarget.value)
    }
    
    return (
        <div>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "--------"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}></input>
                </div>
            }
        </div>
    )
}

export default ProfileStatuswithHooks