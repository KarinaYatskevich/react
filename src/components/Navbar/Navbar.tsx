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
              <div className={`${s.item} ${s.lastItem}`}>
                <div className={s.loginBlock}>
                  { props.isAuth
                      ? <div className={s.login_name}>{props.login}  <button onClick={props.logout} className={s.log_button}>Log out</button> </div>
                      : <NavLink to={'/login'} className={s.log_button}>Login</NavLink> }
                </div>
              </div>
            </nav>
          </div>
          </div>
      </div>
    )
}

export default Navbar