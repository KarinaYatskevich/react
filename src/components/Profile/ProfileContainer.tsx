import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import {getUserProfile} from "../../redux/profile-reduse"
import { useLocation, useNavigate, useParams,} from "react-router-dom"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'


class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.router.params.userId ;
        if (!userId){
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render(){
        return (
            <Profile {...this.props} profile={this.props.profile}/>
            )
        }
}


let mapStateToProps = (state:any) => ({
    profile: state.profilePage.profile,
})

function withRouter(Component:any) {
    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)