import React from "react";
import ReactDOM from "react-dom/client";
import { reduxStore } from "./libs";
import App from "./App.jsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { Provider } from "react-redux";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://13.213.8.55/",
  realm: "sso",
  clientId: "instagram",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </ReactKeycloakProvider>
);
