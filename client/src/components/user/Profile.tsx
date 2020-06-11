import React, { Fragment } from "react";
import { useAuth0 } from '../../react-auth0-spa';

export const Profile = () => {
  const { isInitializing, user } = useAuth0();

  if (isInitializing || !user) {
    return <div>Show a spinner ;-)</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};