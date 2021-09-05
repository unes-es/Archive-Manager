import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {},
    };
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(user, callback) {
    //await
    this.setState({ user: user, isAuthenticated: true }, () => {
      console.log("signUp " + this.state.user + this.state.isAuthenticated);
    });
    callback();
  }

  logOut() {
    this.setState({ isAuthenticated: false, user: null }, () => {
      console.log("loggd out");
    });
  }

  async signIn(user, callback) {
    //await
    const user_ = {
      username: user.emailOrUsername,
      email: user.emailOrUsername,
    };
    console.log(user_);
    this.setState({ user: user_, isAuthenticated: true }, () => {
      console.log(
        "signIn " + this.state.user.username + this.state.isAuthenticated
      );
    });
    callback();
  }

  render() {
    const user = this.state.user;
    const isAuthenticated = this.state.isAuthenticated;
    const { signUp, signIn, logOut } = this;
    return (
      <AuthContext.Provider
        value={{
          user,
          signUp,
          signIn,
          logOut,
          isAuthenticated,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
