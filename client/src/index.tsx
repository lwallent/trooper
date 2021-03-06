
import 'fontsource-roboto'; // Temporarily load all roboto
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./lib/history";
import { RedirectLoginResult } from '@auth0/auth0-spa-js';
import { configureStore } from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

// Route the user to the right place after login
const onRedirectCallback = (loginResult: RedirectLoginResult) => {
  const appState = loginResult.appState;
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
  <ReduxProvider store={store}>
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
  </ReduxProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();