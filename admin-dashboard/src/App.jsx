import './App.css'

import LoginForm from './components/LoginForm'
import { useState } from 'react';

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


  return (
    <>
      <LoginForm 
        tokenSetter={setToken}
        loggedInSetter={setLoggedIn}
        isAdminSetter={setIsAdmin}
      />
    </>
  )
}

export default App
