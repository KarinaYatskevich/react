import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import {setAuthUserData} from "../../redux/auth-reduse"


class NavbarContainer extends React.Component<any, any>{
    componentDidMount(){
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response) => {
                if (response.data.resultCode === 0){
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
    })
    }

    render (){
        return <Navbar {...this.props}/>
    }
}
const mapStateToProps = (state:any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData})(NavbarContainer)