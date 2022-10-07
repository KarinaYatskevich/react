import s from "./Users.module.css";
import userPhoto from "../../assets/images/bg.jpg";
import { NavLink } from "react-router-dom";
import {UserType} from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: React.FC<PropsType> = (props) => {
    return (
            <div className={s.user_cart}>
                <div>
                        <NavLink to={"/profile/" + props.user.id}>
                            <img src={
                                props.user.photos.small != null
                                ? props.user.photos.small
                                : userPhoto
                            }
                            alt=""
                            className={s.userPhoto}
                            />
                        </NavLink>
                </div>
                <div className={s.person_name}>{props.user.name}</div>
                <div className={s.person_status}>{props.user.status}</div>
                <div>
                        {props.user.followed 
                            ? <button className={s.buttons} disabled={props.followingInProgress.some((id:number) => id === props.user.id)} 
                                onClick={ () => {props.unfollow(props.user.id)
                            }}>Unfollow</button>
                            : <button className={s.buttons} disabled={props.followingInProgress.some((id:number) => id === props.user.id)} 
                                onClick={ () => {props.follow(props.user.id)
                            }}>Follow</button>
                        }
                </div>
            </div>
    );
};

export default User;
