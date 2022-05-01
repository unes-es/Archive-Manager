import React, { Component } from "react";

export default class Input extends Component {
  static defaultProps = {
    type: "text",
  };
  render() {
    return (
      <div className={this.props.className + " mb-3"}>
        <label className="form-label" htmlFor={this.props.name}>
          {this.props.text}
        </label>
        <input className="form-control" {...this.props} />
      </div>
    );
  }
}
