import React, { Component } from "react";
import Data from "./data.json";
import Table from "./Components/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import Input from "./Components/Input";
import { format } from "date-fns";
import { withRouter } from "react-router";

class Folders extends Component {
  backupData;
  toBeAddedFolder = {
    selected: false,
    name: "",
    date: new Date(),
    title: "",
    status: "Active",
  };
  status = "Active";
  constructor(props) {
    super(props);
    this.state = {
      data: Data.map((row) => ({ ...row, selected: false })),
      tableData: Data.map((row) => ({ ...row, selected: false })).filter(
        (row) => {
          return row.status === "Active";
        }
      ),
      show: false,
      showAddModal: false,
      showConfirmationModal: false,
      selectedRow: 0,
      showFilesView: false,
      folderToShowFiles: 0,
    };
    this.backupData = this.state.data.map((item) => ({ ...item }));
    this["handleClose"] = this["handleClose"].bind(this);
    this.showModal = this.showModal.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.select = this.select.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.viewFiles = this.viewFiles.bind(this);
    this.toggleFilesView = this.toggleFilesView.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.archive = this.archive.bind(this);
  }

  componentWillMount() {
    const { data } = this.state;
    this.unlisten = this.props.history.listen((location, action) => {
      if (location.pathname.includes("/dashboard/folders/archives")) {
        this.status = "Archived";
      } else if (location.pathname.includes("/dashboard/folders/trash")) {
        this.status = "Removed";
      } else {
        this.status = "Active";
      }
      this.setState({
        tableData: data.filter((row) => {
          return row.status === this.status;
        }),
        showFilesView: false,
      });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  handleAddChange(e) {
    this.toBeAddedFolder[e.target.name] = e.target.value;
  }

  handleChange(e) {
    const { data, selectedRow, tableData } = this.state;
    tableData[selectedRow][e.target.name] = e.target.value;
    this.setState({
      tableData: tableData,
    });
  }

  save(e) {
    const { data, tableData } = this.state;
    if (e.target.name === "add") {
      data.push(this.toBeAddedFolder);
      this.toBeAddedFolder = {
        selected: false,
        name: "",
        date: new Date(),
        title: "",
        status: "Active",
      };
    }
    this.setState({
      tableData: data
        .map((item) => ({ ...item }))
        .filter((row) => {
          return row.status === this.status;
        }),
    });
    this.handleClose();
  }

  showModal(e, index) {
    e.preventDefault();
    e.stopPropagation();
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
      showConfirmationModal: false,
      /* tableData: this.state.data
        .map((item) => ({ ...item }))
        .filter((row) => {
          return row.status === this.status;
        }),*/
    });
  }

  remove = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const { tableData, data } = this.state;
    data.filter((row) => {
      return row.id === tableData[index].id;
    })[0].status = "Removed";
    this.setState(
      {
        tableData: data
          .map((item) => ({ ...item }))
          .filter((row) => {
            return row.status === this.status;
          }),
        selectedRow: 0,
      },
      () => {
        this.handleClose();
      }
    );
  };

  select(e, index) {
    e.stopPropagation();
    const { data } = this.state;
    data[index].selected = !data[index].selected;
    this.setState({ tableData: data });
  }

  checkAll(e) {
    e.stopPropagation();
    const { data } = this.state;
    data.forEach((row) => {
      row.selected = e.target.checked;
    });
    this.setState({ tableData: data });
  }

  removeSelection(e) {
    const { data } = this.state;
    data.forEach((row) => {
      if (row.selected) {
        row.status = "Removed";
      }
    });
    this.setState(
      {
        tableData: data
          .map((item) => ({ ...item }))
          .filter((row) => {
            return row.status === this.status;
          }),
        selectedRow: 0,
      },
      () => {
        this.handleClose();
      }
    );
  }

  toggleFilesView() {
    this.setState({
      showFilesView: !this.state.showFilesView,
    });
  }

  viewFiles(index) {
    const { data } = this.state;
    this.setState({
      selectedRow: index,
      folderToShowFiles: index,
      showFilesView: true,
    });
  }

  showConfirmationModal(e, index) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showConfirmationModal: true,
      selectedRow: index,
    });
  }
  archive() {
    const { tableData, data, selectedRow } = this.state;
    data.filter((row) => {
      return row.id === tableData[selectedRow].id;
    })[0].status = "Archived";
    this.setState(
      {
        tableData: data
          .map((item) => ({ ...item }))
          .filter((row) => {
            return row.status === this.status;
          }),
        selectedRow: 0,
      },
      () => {
        this.handleClose();
      }
    );
  }

  render() {
    const {
      data,
      show,
      showAddModal,
      selectedRow,
      folderToShowFiles,
      tableData,
    } = this.state;
    return (
      <div>
        {!this.state.showFilesView && (
          <>
            <Row className="pt-3">
              <Col>
                <Button variant="danger btn-sm" onClick={this.removeSelection}>
                  Delete
                </Button>
              </Col>
              <Col></Col>
              <Col>
                <Button
                  style={{ position: "absolute", right: 0 + "px" }}
                  variant="primary btn-sm me-3"
                  name="addFolder"
                  onClick={this.showAddModal}
                >
                  Add folder
                </Button>
              </Col>
            </Row>

            <Table
              header={["Number", "Titlte", "Date", "Progress", "Manage"]}
              data={tableData}
              remove={this.remove}
              select={this.select}
              showModal={this.showModal}
              showConfirmationModal={this.showConfirmationModal}
              check={this.checkAll}
              viewFiles={this.viewFiles}
            />
            {tableData.length > 0 && (
              <>
                <Modal
                  show={show}
                  onHide={this.handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Edit folder N° : {tableData[selectedRow].number}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <Input
                        name="number"
                        text="Number"
                        placeholder="Enter folder number"
                        value={tableData[selectedRow].number}
                        onChange={this.handleChange}
                      />
                      <Input
                        name="title"
                        text="Title"
                        placeholder="Enter folder title"
                        value={tableData[selectedRow].title}
                        onChange={this.handleChange}
                      />
                      <Input
                        type="date"
                        text="Date"
                        name="date"
                        value={format(
                          new Date(tableData[selectedRow].date),
                          "yyyy-MM-dd"
                        )}
                        onChange={this.handleChange}
                      />
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
                  <Input
                    name="number"
                    text="Number"
                    placeholder="Enter folder number"
                    onChange={this.handleAddChange}
                  />
                  <Input
                    name="title"
                    text="Title"
                    placeholder="Enter folder title"
                    onChange={this.handleAddChange}
                  />
                  <Input
                    type="date"
                    text="Date"
                    name="date"
                    onChange={this.handleAddChange}
                  />
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
          </>
        )}
        {/* confirmation Modal */}

        <Modal
          show={this.state.showConfirmationModal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Archive confirmation{this.state.selectedRow}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you wont to archive this folder!?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={this.archive} variant="danger">
              Archive
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.showFilesView && (
          <>
            <div className="accordion mt-3">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <div className="accordion-button">
                    <a href="#!" onClick={this.toggleFilesView}>
                      <i
                        className="bi bi-arrow-left-circle"
                        style={{ fontSize: 1.5 + "rem" }}
                      ></i>
                    </a>
                    <span> </span>
                    Folder Number : {tableData[folderToShowFiles].number}
                    <button
                      style={{ position: "absolute", right: 0 + "px" }}
                      className="btn btn-primary btn-sm me-3"
                    >
                      Add File
                    </button>
                  </div>
                </h2>
                <div className="accordion-collapse collapse show">
                  <div className="accordion-body">
                    <table className="table table-striped table-hover responsive">
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" />
                          </th>
                          <th>Number</th>
                          <th>Titlte</th>
                          <th>Date</th>
                          <th>Progress</th>
                          <th>Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData[selectedRow].files !== undefined &&
                          tableData[selectedRow].files.map((file, i) => {
                            return (
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>{file.date}</td>
                                <td>{file.progress}</td>
                                <td>
                                  <button className="btn btn-primary btn-sm">
                                    View
                                  </button>
                                  <span> </span>
                                  <button className="btn btn-danger btn-sm">
                                    Delete
                                  </button>
                                  <span> </span>
                                  <button className="btn btn-secondary btn-sm">
                                    Edit
                                  </button>
                                  <span> </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Folders);
