import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "./AuthContext";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
        //console.log(this.state.email);
      }
    );
  }

  handleSignIn(e) {
    e.preventDefault();
    const filter = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const errors = [];
    const { email, password } = this.state;
    if (email.trim() === "" || password.trim() === "") {
      errors.push("Email and password are required");
    }
    if (!filter.test(email)) {
      errors.push("Enter a valid email");
    }
    this.setState({
      errors: errors,
    });
    if (errors.length > 0) return;

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.context.signIn(user, () => {
      this.props.history.push("/dashboard");
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
          <form onSubmit={this.handleSignIn}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={this.handleChange}
                placeholder="Enter your email"
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
