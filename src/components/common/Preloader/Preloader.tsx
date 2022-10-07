import preloaderImg from '../../../assets/images/loader.svg'
import s from '../../Users/Users.module.css'

function Preloader(): JSX.Element {
    return <div>
        <img src={preloaderImg} alt="" className={s.img}/>
    </div>
}

export default Preloader