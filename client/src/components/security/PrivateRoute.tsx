import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}


export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, path, ...rest } = props;

  const { isInitializing, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isInitializing || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      });
    };
    fn();
  }, [isInitializing, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) => isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};