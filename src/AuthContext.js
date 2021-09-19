import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    const localUser = JSON.parse(localStorage.getItem("user"));
    this.state = {
      isAuthenticated: localUser !== null,
      user: localUser,
    };
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(user, callback) {
    //await
    this.setCurrentUser(user);
    callback();
  }

  setCurrentUser(user) {
    if (user.username === undefined) user.username = "defaultUserName";
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user: user, isAuthenticated: true }, () => {
      //console.log("signUp " + this.state.user + this.state.isAuthenticated);
    });
  }

  logOut() {
    localStorage.removeItem("user");
    this.setState({ isAuthenticated: false, user: null }, () => {
      console.log("loggd out");
    });
  }

  async signIn(user, callback) {
    //await
    this.setCurrentUser(user);
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
