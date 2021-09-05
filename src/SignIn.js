import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "./AuthContext";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      errors: [],
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state.emailOrUsername);
      }
    );
  }

  handleSignIn(e) {
    e.preventDefault();
    //TODO: Add form validation
    const user = {
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    };
    this.context.signIn(user, () => {
      this.props.history.push("/Dashboard");
    });
  }

  render() {
    return (
      <div className="container modal-dialog">
        <div className="modal-content rounded-5 shadow p-5">
          <form onSubmit={this.handleSignIn}>
            <div className="mb-3">
              <label className="form-label" htmlFor="Username">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                name="emailOrUsername"
                onChange={this.handleChange}
                placeholder="Enter your email or username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Enter your password"
              />
              <Link to="/ForgotPassword">Forgot password?</Link>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="remenberMe"
              />
              <label className="form-check-label" htmlFor="RemembreMe">
                Remembre me
              </label>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary">Sign in</button> or{" "}
              <Link to="/signUp">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
SignIn.contextType = AuthContext;
export default withRouter(SignIn);
