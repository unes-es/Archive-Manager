import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function UnauthenticatedRoute({
  component: Component,
  ...rest
}) {
  return (
    <Route {...rest}>
      <AuthContext.Consumer>
        {({ isAuthenticated }) => {
          console.log("UnauthenticatedRoute " + isAuthenticated);
          return !isAuthenticated ? (
            <Component />
          ) : (
            <Redirect to="/dashboard" />
          );
        }}
      </AuthContext.Consumer>
    </Route>
  );
}
