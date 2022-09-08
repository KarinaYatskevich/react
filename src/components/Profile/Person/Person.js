import Preloader from '../../common/Preloader/Preloader'
import s from './Person.module.css'
import ProfileStatus from './ProfileStatus'


const Person = (props) => {

  if (!props.profile){
    return <Preloader/>
  }

    return (
      <div className={s.person}>
        <div className={s.personInformation}>
          <div className={s.personInformation_name}>
            <p className={s.name}>{props.profile.fullName}</p>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
          </div>
          <div className={s.personInformation_info}>
            <div className={s.parameters}>
              <p className={s.parameter}>About me</p>
              <p className={s.parameter}>Vk</p>
              <p className={s.parameter}>Instagram</p>
              <p className={s.parameter}>Facebook</p>
            </div>
            <div className={s.answers}>
              <p className={s.answer}>{props.profile.aboutMe}</p>
              <p className={s.answer}>{props.profile.contacts.vk}</p>
              <p className={s.answer}>{props.profile.contacts.instagram}</p>
              <p className={s.answer}>{props.profile.contacts.facebook}</p>
            </div>
          </div>
        </div>
        <div className={s.personPhoto}>
          <img className={s.img} src={props.profile.photos.small}></img>
        </div>
      </div>
    )
}

export default Person