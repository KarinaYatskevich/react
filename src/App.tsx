import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import NavbarContainer from './components/Navbar/NavbarComponent';

function App(props:any) {
    return (
      <div className='wrapper'>
          <NavbarContainer/>
          <Routes>
            <Route path='/profile/:userId'element={<ProfileContainer  />}/>
            <Route path='/dialogs' element={<DialogsContainer/>}/>
            <Route path='/users' element={<UsersContainer />}/>
            <Route path='/music' element={<Music/>}/>
            <Route path='/settings' element={<Settings />}/>
          </Routes>
      </div>
  );
}


export default App;
