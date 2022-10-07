import Preloader from '../../common/Preloader/Preloader'
import s from './Person.module.css'
import ProfileStatuswithHooks from './ProfileStatusWithHooks'
import userPhoto from "../../../assets/images/bg.jpg"
import {ProfileType} from '../../../types/types';

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
}

const Person: React.FC<PropsType> = (props) => {

  if (!props.profile){
    return <Preloader/>
  }

    return (
      <div className={s.person}>
        <div className={s.personInformation}>
          <div className={s.personInformation_name}>
            <p className={s.name}>{props.profile.fullName}</p>
            <ProfileStatuswithHooks status={props.status} updateStatus={props.updateStatus}/>
          </div>
          <div className={s.personInformation_info}>
            <div className={s.parameters}>
            {props.profile.aboutMe &&
              <p className={s.parameter}>About me</p>
            }
            {props.profile.contacts.vk &&  
              <p className={s.parameter}>Vk</p>
            }
            {props.profile.contacts.instagram && 
              <p className={s.parameter}>Instagram</p>
            }
            {props.profile.contacts.facebook && 
              <p className={s.parameter}>Facebook</p>
            }
            </div>
            <div className={s.answers}>
              {props.profile.aboutMe && 
                <p className={s.answer}>{props.profile.aboutMe}</p>
              }
              {props.profile.contacts.vk &&  
                <p className={s.answer}>{props.profile.contacts.vk}</p>
              }
              {props.profile.contacts.instagram && 
                <p className={s.answer}>{props.profile.contacts.instagram}</p>
              }
              {props.profile.contacts.facebook && 
                <p className={s.answer}>{props.profile.contacts.facebook}</p>
              }
            </div>
          </div>
        </div>
        <div className={s.personPhoto}>
          <img className={s.img} src={
            props.profile.photos.small != null
            ? props.profile.photos.small
            : userPhoto
          }></img>
        </div>
      </div>
    )
}

export default Person