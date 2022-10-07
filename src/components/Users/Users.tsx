import s from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import React, {FC} from 'react';
import {UserType} from '../../types/types';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = (props) => {
    
    return (
        <div className={s.users}>
            <div className={s._container}>
                <div className={s.user_information}>
                    {
                        props.users.map((u:any) => <User user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} key={u.id}/>)
                    }
                </div>
                <Paginator currentPage={props.currentPage} 
                            onPageChanged={props.onPageChanged} 
                            totalItemsCount={props.totalUsersCount} 
                            pageSize={props.pageSize}/>
            </div>
        </div>
    )
}

export default Users