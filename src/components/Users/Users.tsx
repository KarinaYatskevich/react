import s from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'


let Users = (props:any) => {
    
    return (
        <div className={s.users}>
            <div className={s._container}>
                <Paginator currentPage={props.currrentPage} 
                            onPageChanged={props.onPageChanged} 
                            totalUsersCount={props.totalUsersCount} 
                            pageSize={props.pageSize}/>
                {
                props.users.map((u:any) => <User user={u} follow={props.follow} unfollow={props.unfollow} followingInProgress={props.followingInProgress} key={u.id}/>
                )
                }
            </div>
        </div>
    )
}

export default Users