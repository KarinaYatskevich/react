import s from './Users.module.css'
import userPhoto from '../../assets/images/bg.jpg'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/Paginator'


let User = (props:any) => {
    return (
        <div>
                        <span>
                            <div>
                                <NavLink to={'./../profile/'+ props.user.id}>
                                    <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} alt="" className={s.userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {props.user.followed 
                                    ? <button disabled={props.followingInProgress.some((id:number) => id === props.user.id)} 
                                    onClick={ () => {props.unfollow(props.user.id)
                                        }}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some((id:number) => id === props.user.id)} 
                                    onClick={ () => {props.follow(props.user.id)
                                        }}>Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{props.user.name}</div>
                                <div>{props.user.status}</div>
                            </span>
                            <span>
                                <div>{"user.location.country"}</div>
                                <div>{"user.location.city"}</div>
                            </span>
                        </span>
                    </div>
                    )
}

export default User