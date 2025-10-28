import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function AuthContainer({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login');

  return (
    <>
      {authMode === 'login' ? (
        <Login
          onLoginSuccess={onAuthSuccess}
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      ) : (
        <Signup
          onSignupSuccess={onAuthSuccess}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      )}
    </>
  );
}

export default AuthContainer;
