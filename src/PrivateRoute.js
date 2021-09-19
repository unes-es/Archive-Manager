import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest}>
      <AuthContext.Consumer>
        {({ isAuthenticated }) => {
          return isAuthenticated ? <Component /> : <Redirect to="/SignIn" />;
        }}
      </AuthContext.Consumer>
    </Route>
  );
}
