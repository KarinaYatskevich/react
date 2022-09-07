import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

let mapStateToPropsForRedirect = (state:any) => ({
    isAuth: state.auth.isAuth,
})

export const withAuthRedirect = (Component:any) => {
    class RedirectComponent extends React.Component<any, any> {
        render(){
            if(!this.props.isAuth){
                return <Navigate to="/login"/>
            }
            return <Component {...this.props} />
        }
    }
    
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent
}