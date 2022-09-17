import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import {initializeApp} from "./redux/app-reduse"
import { useLocation, useNavigate, useParams,} from "react-router-dom"
import { compose } from 'redux';

class App extends Component<any, any>{

  componentDidMount(){
    this.props.initializeApp()
}

  render(){
    if(!this.props.initialized){
      return <div className='wait'>wait please</div>
    }
    return (
      <div className='wrapper'>
          <NavbarContainer/>
          <Routes>
            <Route path='/profile/:userId'element={<ProfileContainer  />}/>
            <Route path='/dialogs' element={<DialogsContainer/>}/>
            <Route path='/users' element={<UsersContainer />}/>
            <Route path='/music' element={<Music/>}/>
            <Route path='/settings' element={<Settings />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
  initialized: state.app.initialized
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
export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)

