import React, { Component } from "react";
import AuthContext from "./AuthContext";

export default class Profile extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ user }) => {
          return (
            <>
              <h1>Profile</h1>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
