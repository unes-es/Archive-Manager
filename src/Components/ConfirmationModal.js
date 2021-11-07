import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ConfirmationModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onCancel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onCancel}>
            {this.props.noText}
          </Button>
          <Button onClick={this.props.onConfirm} variant="danger">
            {this.props.yesText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
