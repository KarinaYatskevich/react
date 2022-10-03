import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import {getAuthUserData, logout} from "../../redux/auth-reduse";

class NavbarContainer extends React.Component<any, any>{

    render (){
        return <Navbar {...this.props}/>
    }
}
const mapStateToProps = (state:any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {getAuthUserData, logout})(NavbarContainer)