import React, { Component } from "react";
import Table from "./Components/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

export default class Folders extends Component {
  backupData;
  toBeAddedFolder = { selected: false };
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Charlie",
          job: "Janitor",
          selected: false,
        },
        {
          name: "Mac",
          job: "Bouncer",
          selected: true,
        },
        {
          name: "Dee",
          job: "Aspring actress",
          selected: false,
        },
        {
          name: "Dennis",
          job: "Bartender",
          selected: false,
        },
      ],
      show: false,
      showAddModal: false,
      selectedRow: 0,
    };
    this.backupData = this.state.data.map((item) => ({ ...item }));
    this.handleClose = this.handleClose.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.select = this.select.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }

  handleAddChange(e) {
    const { data } = this.state;
    this.toBeAddedFolder[e.target.name] = e.target.value;
    console.log(this.toBeAddedFolder);
  }

  handleChange(e) {
    const { data, selectedRow } = this.state;
    data[selectedRow][e.target.name] = e.target.value;
    this.setState({
      data: data,
    });
  }

  save(e) {
    const { data } = this.state;
    if (e.target.name === "add") {
      data.push(this.toBeAddedFolder);
    }
    this.backupData = data.map((item) => ({ ...item }));
    this.setState({ data: data });
    this.toBeAddedFolder = { selected: false };
    this.handleClose();
  }

  showModal(index) {
    this.setState({
      show: true,
      selectedRow: index,
    });
  }
  showAddModal() {
    this.setState({
      showAddModal: true,
    });
  }
  handleClose() {
    this.setState({
      show: false,
      showAddModal: false,
      data: this.backupData.map((item) => ({ ...item })),
    });
  }

  remove = (index) => {
    const { data } = this.state;

    this.setState(
      {
        data: data.filter((data, i) => {
          return i !== index;
        }),
      },
      () => {
        this.backupData = this.state.data.map((item) => ({ ...item }));
      }
    );
  };

  select(index) {
    const { data } = this.state;
    data[index].selected = !data[index].selected;
    this.setState({ data: data });
    console.log(data);
  }

  checkAll(e) {
    const checkboxes = document.getElementsByClassName("selectRow");
    const { data } = this.state;
    data.forEach((row) => {
      row.selected = e.target.checked;
    });
    this.setState({ data: data });
    // for (let index = 0; index < checkboxes.length; index++) {
    //   const element = checkboxes[index];
    //   element.checked = e.target.checked;
    // }
  }

  removeSelection() {
    const { data } = this.state;
    this.setState(
      {
        data: data.filter((row, i) => {
          return row.selected === false;
        }),
      },
      () => {
        this.backupData = this.state.data.map((item) => ({ ...item }));
      }
    );
  }
  render() {
    const { data, show, showAddModal, selectedRow } = this.state;
    return (
      <div>
        <Row className="pt-3">
          <Col>
            <Button variant="danger btn-sm" onClick={this.removeSelection}>
              Delete
            </Button>
          </Col>
          <Col></Col>
          <Col>
            <Button
              variant="primary btn-sm"
              name="addFolder"
              onClick={this.showAddModal}
            >
              Add folder
            </Button>
          </Col>
        </Row>

        <Table
          data={data}
          remove={this.remove}
          select={this.select}
          showModal={this.showModal}
          check={this.checkAll}
        />
        {data.length > 0 && (
          <>
            <Modal
              show={show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Edit folder N° : {this.state.selectedRow}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      placeholder="Name"
                      value={data[selectedRow].name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="job">
                      Job
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="job"
                      onChange={this.handleChange}
                      placeholder="Job"
                      value={data[selectedRow].job}
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button name="edit" onClick={this.save} variant="primary">
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
        {/* Add Folder Modal */}
        <Modal
          show={showAddModal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={this.handleAddChange}
                  placeholder="Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="job">
                  Job
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="job"
                  onChange={this.handleAddChange}
                  placeholder="Job"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button name="add" onClick={this.save} variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
