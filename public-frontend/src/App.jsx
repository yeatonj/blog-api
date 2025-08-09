import { useState } from 'react'
import './App.css'
import LoggedInBanner from './components/LoggedInBanner';
import LogoutButton from '../../admin-dashboard/src/components/LogoutButton';
import LoginForm from './components/LoginForm';
import AppContent from './components/AppContent';

function App() {
  const [token, setToken] = useState(() => {
    const initialToken = localStorage.getItem('token');
    return initialToken ? initialToken : null;
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    const initialLoggedIn = localStorage.getItem('loggedIn');
    return initialLoggedIn ? initialLoggedIn : false;
  });

  function deauthenticate() {
    setToken(null);
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
  }

  let loginHeader;
  let logoutFooter = <></>;
  if (!loggedIn) {
    loginHeader = <LoginForm />;
  } else {
    loginHeader = <LoggedInBanner />;
    logoutFooter = <LogoutButton />;
  }

  return (
    <>
      {loginHeader}
      <AppContent />
      {logoutFooter}
    </>
  )
}

export default App
