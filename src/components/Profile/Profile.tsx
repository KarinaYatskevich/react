import MyPostsContainer from './MyPosts/MyPostsContainer'
import Person from './Person/Person'
import s from './Profile.module.css'
import {ProfileType} from '../../types/types';


type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
}

const Profile:React.FC<PropsType> = (props) => {
    return (
      <div className={s.profile}>
        <div className={s._container}>
          <Person savePhoto={props.savePhoto}
                  isOwner={props.isOwner}
                  profile={props.profile}
                  status={props.status}
                  updateStatus={props.updateStatus}
          />
          <MyPostsContainer/>
        </div>
      </div>
    )
}

export default Profile