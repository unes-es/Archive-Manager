import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "./AuthContext";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    const { email, password, confirmEmail, confirmPassword, username } =
      this.state;
    const errors = [];
    const filter = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email.trim() === "" || password.trim() === "") {
      errors.push("Email and password are required");
    }
    if (!filter.test(email)) {
      errors.push("Enter a valid email");
    }
    if (email !== confirmEmail) errors.push("Emails do not match");
    if (password !== confirmPassword) errors.push("Passwords do not match");
    this.setState({
      errors: errors,
    });

    if (errors.length !== 0) return;
    const user = {
      username: username,
      email: email,
      password: password,
    };
    this.context.signUp(user, () => {
      this.props.history.push("/Dashboard");
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container modal-dialog">
        <div className="modal-content rounded-5 shadow p-5">
          {this.state.errors.length > 0 && (
            <div className="alert alert-warning" role="alert">
              {this.state.errors.map((error, i) => {
                return <li key={i}>{error}</li>;
              })}
            </div>
          )}
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="Email">
                Email
              </label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Confirm Email">
                Confirm Email
              </label>
              <input
                className="form-control"
                value={this.state.confirmEmail}
                onChange={this.handleChange}
                type="email"
                name="confirmEmail"
                placeholder="Confirm your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Username">
                Username
              </label>
              <input
                className="form-control"
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Password">
                Password
              </label>
              <input
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="confirm Password">
                Confirm Password
              </label>
              <input
                className="form-control"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
            <button className="btn btn-primary" onClick={this.handleSignUp}>
              Sign up
            </button>{" "}
            already have account? <Link to="/SignIn">Sign in</Link>
          </form>
        </div>
      </div>
    );
  }
}
SignUp.contextType = AuthContext;
export default withRouter(SignUp);
