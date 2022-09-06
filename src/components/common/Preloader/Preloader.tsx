import preloaderImg from '../../../assets/images/loader.svg'
import s from '../../Users/Users.module.css'

let Preloader = (props:any) => {
    <div>
        <img src={preloaderImg} alt="" className={s.img}/>
    </div>
}

export default Preloader