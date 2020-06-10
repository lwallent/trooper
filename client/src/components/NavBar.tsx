import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';
import Button from '@material-ui/core/Button';

export const NavBar = () => {
   
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
          <Button variant="contained" color="primary" onClick={() => loginWithRedirect({})}>Log in </Button>
      )}

      {isAuthenticated && <Button variant="contained" color="primary" onClick={() =>logout()}>Log out</Button>}

      {isAuthenticated && (
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
      </span>
    )}
    </div>
  );
};
