import MyPostsContainer from './MyPosts/MyPostsContainer'
import Person from './Person/Person'
import s from './Profile.module.css'


const Profile = (props:any) => {
    return (
      <div className={s.profile}>
        <div className={s._container}>
          <Person profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
          <MyPostsContainer/>
        </div>
      </div>
    )
}

export default Profile