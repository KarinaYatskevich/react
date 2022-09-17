import s from './Users.module.css'
import userPhoto from '../../assets/images/bg.jpg'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/Paginator'


let Users = (props:any) => {
    
    return (
        <div className={s.users}>
            <div className={s._container}>
                <Paginator currentPage={props.currrentPage} 
                            onPageChanged={props.onPageChanged} 
                            totalUsersCount={props.totalUsersCount} 
                            pageSize={props.pageSize}/>
                {
                    props.users.map((u:any)=> <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'./../profile/'+ u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" className={s.userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed 
                                    ? <button disabled={props.followingInProgress.some((id:number) => id === u.id)} 
                                    onClick={ () => {props.unfollow(u.id)
                                        }}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some((id:number) => id === u.id)} 
                                    onClick={ () => {props.follow(u.id)
                                        }}>Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Users