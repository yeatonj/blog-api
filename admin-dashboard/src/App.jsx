import './App.css'
import { useState } from 'react';

import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton';

function App() {

  const [token, setToken] = useState(() => {
    const initialToken = localStorage.getItem('token');
    return initialToken ? initialToken : null;
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    const initialLoggedIn = localStorage.getItem('loggedIn');
    return initialLoggedIn ? initialLoggedIn : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const initialAdmin = localStorage.getItem('admin');
    return initialAdmin ? initialAdmin : false;
  });

  if (!loggedIn) {
    return (
      <>
        <LoginForm 
          tokenSetter={setToken}
          loggedInSetter={setLoggedIn}
          isAdminSetter={setIsAdmin}
          message={'Please login to access posts.'}
        />
      </>
    )
  } else if (!isAdmin) {
    return (
      <>
        <LoginForm 
          tokenSetter={setToken}
          loggedInSetter={setLoggedIn}
          isAdminSetter={setIsAdmin}
          message={'Not validated as admin user. Login as admin to access posts.'}
        />
      </>
    )
  } else {
    return (
      <>
        <p>You have access, congratulations!</p>
        <LogoutButton 
          tokenSetter={setToken}
          loggedInSetter={setLoggedIn}
          isAdminSetter={setIsAdmin}
        />
      </>
    )
  }
  
}

export default App
