import s from'./Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = (props:any) => {
    return (
      <div className={s.navbar}> 
        <div className={s._container}>
          <div className={s.logo}></div>
          <div className={s.navbarItems}>
            <nav className={s.nav}>
              <div className={s.item}>
                <NavLink to='/profile'>Profile </NavLink>
              </div>
              <div className={s.item}>
                <NavLink to='/dialogs'>Messages </NavLink>
              </div>
              <div className={s.item}>
                <NavLink to='/users'>Users </NavLink>
              </div>
              <div className={s.item}>
                <NavLink to='/music'>Music </NavLink>
              </div>
              <div className={s.item}>
                {props.isAuth ? props.login
                  :<NavLink to='/login'>Login </NavLink>}
              </div>
              <div className={`${s.item} ${s.lastItem}`}>
                <NavLink to='/settings'>Settings </NavLink>
              </div>
            </nav>
          </div>
          </div>
      </div>
    )
}

export default Navbar