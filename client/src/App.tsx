import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Profile } from "./components/user/Profile";
import { PrivateRoute } from './components/security/PrivateRoute';
import history from "./lib/history";
import ProjectsPage from './components/projects/ProjectsPage';
import ProjectWorkbenchPage  from './components/projects/ProjectWorkbenchPage';

export const App = () => {

  return (
      <Router history={history}>
          <Switch>
            <Route path="/" exact  />
            <PrivateRoute path="/profile"  component={Profile} />
            <PrivateRoute path="/projects/:id" component={ProjectWorkbenchPage} />
            <PrivateRoute path="/projects" component={ProjectsPage} />          
          </Switch>
      </Router>
  );
}