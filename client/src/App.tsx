import React from "react";
import { NavBar } from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";

export const App: React.FC = () => {
  const {
    isInitializing,
    isAuthenticated
  } = useAuth0()

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  // if (!isAuthenticated) {
  //   return <div>Please Authenticate...</div>;
  // }

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
    </div>
  );
}
