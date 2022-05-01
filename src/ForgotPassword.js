import React, { Component } from "react";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-content rounded-5 shadow p-5">
          <form className="row g-3">
            <div className="col-auto">
              <label className="form-control-plaintext" htmlFor="Username">
                Username
              </label>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Enter your email or username"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary mb-3"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
