import React, { Component } from "react";
import Files from "./Files";
import FoldersManager from "./FoldersManager";
import ConfirmationModal from "./Components/ConfirmationModal";
import Input from "./Components/Input";
import { format } from "date-fns";
import Folder from "./Folder";
import Table from "./Components/Table";
import { Alert, Spinner, Form } from "react-bootstrap";
import EventsManager from "./EventsManager";

export default class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false,
      folder: new Folder(),
      _for: "",
      showFilesView: false,
      showAlert: false,
      alertBody: "",
      alertVariant: "success",
      loading: true,
      searchText: "",
    };
    FoldersManager.init().then(() => {
      console.log(FoldersManager.getFolders(this.props.status));
      this.setState({
        data: FoldersManager.getFolders(this.props.status),
        loading: false,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        showFilesView: false,
        data: FoldersManager.getFolders(this.props.status),
      });
    }
  }

  handleSearch = (e) => {
    var { searchText } = this.state;
    searchText = e.target.value;
    this.setState({ searchText: searchText }, () => {
      this.setState({
        data: FoldersManager.getFolders(this.props.status).filter((folder) => {
          return folder.contains(this.state.searchText);
        }),
      });
    });
  };

  view = (folder) => {
    this.setState(
      {
        folder: folder,
      },
      () => {
        this.showFiles(true);
      }
    );
  };

  actions = (folder) => {
    switch (this.props.status) {
      case "Active":
        return (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showModal("edit", folder);
              }}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <span> </span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showModal("archive", folder);
              }}
            >
              <i className="bi bi-archive"></i>
            </button>
            <span> </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showModal("remove", folder);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </>
        );
      case "Archived":
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.showModal("remove", folder);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        );
      case "Removed":
        return (
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.showModal("restore", folder);
            }}
          >
            Restore
          </button>
        );
      default:
        return;
    }
  };

  checkAll = (e) => {
    e.stopPropagation();
    const { data } = this.state;
    data.forEach((folder) => {
      this.select(e, folder.id);
    });
    this.setState({ data: data });
  };
  select = (e, id) => {
    e.stopPropagation();
    const { data } = this.state;
    const index = data.findIndex((folder) => folder.id === id);
    data[index].selected = e.target.checked;
    this.setState({
      data: data,
    });
  };

  handleChange = (e) => {
    const folder = { ...this.state.folder };
    folder[e.target.name] = e.target.value;
    this.setState({ folder: folder });
  };

  showModal = (_for, folder) => {
    this.setState({ folder: folder }, () => {
      this.setState({
        _for: _for,
        show: true,
      });
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      data: FoldersManager.getFolders(this.props.status),
    });
  };

  modalBody = () => {
    const { folder, _for } = this.state;
    if (_for === "add" || _for === "edit") {
      return (
        <form>
          <Input
            name="number"
            text="Number"
            placeholder="Enter folder number"
            value={folder.number}
            onChange={this.handleChange}
          />
          <Input
            name="title"
            text="Title"
            placeholder="Enter folder title"
            value={folder.title}
            onChange={this.handleChange}
          />
          <Input
            type="date"
            text="Date"
            name="date"
            value={format(new Date(folder.date), "yyyy-MM-dd")}
            onChange={this.handleChange}
          />
          <label className="form-label" htmlFor="progress">
            Progress
          </label>
          <Form.Select
            value={folder.progress}
            name="progress"
            aria-label="Default select example"
            onChange={this.handleChange}
          >
            <option value="En cours de signature">En cours de signature</option>
            <option value="Validé">Validé</option>
            <option value="Annulé">Annulé</option>
            <option value="Envoyé">Envoyé</option>
          </Form.Select>
        </form>
      );
    } else if (_for === "archive") return "archive?";
    else if (_for === "remove") return "remove?";
    else if (_for === "deleteSelection") return "remove selection?";
  };

  modalOnConfirm = () => {
    const { data, _for } = this.state;
    var { folder } = this.state;
    const command = _for;

    if (command !== "deleteSelection")
      EventsManager.execute(command, folder).then((res) => {
        console.log(res.respond);
        this.closeModal();
        if (res.error !== null) {
          this.setState({ alertVariant: "danger", alertBody: res.error });
        } else {
          this.setState(
            {
              alertVariant: "success",
              folder: res.respond,
              alertBody: "Folder " + _for + "ed",
            },
            () => {
              folder = this.state;
            }
          );
        }
        this.setState({
          showAlert: true,
        });
      });
    else
      this.setState({
        alertVariant: "success",
        alertBody: "Selected Folder deleted",
      });

    switch (command) {
      case "edit":
        FoldersManager.edit(folder);
        break;
      case "archive":
        FoldersManager.archive(folder.id);
        break;
      case "remove":
        FoldersManager.delete(folder.id);
        break;
      case "add":
        FoldersManager.add(folder);
        break;
      case "restore":
        FoldersManager.restore(folder.id);
        break;
      case "deleteSelection":
        FoldersManager.deleteFolders(
          data.filter((folder) => {
            return folder.selected === true;
          })
        );
        break;
      default:
        break;
    }
  };

  showFiles = (show) => {
    if (show !== false && show !== true)
      this.setState({
        showFilesView: !this.state.showFilesView,
      });
    else
      this.setState({
        showFilesView: show,
      });
  };

  render() {
    return (
      <>
        <Alert
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={() => {
            this.setState({ showAlert: false });
          }}
          dismissible
        >
          {this.state.alertBody}
        </Alert>
        {!this.state.showFilesView && (
          <>
            <div className="row">
              <div className="col" Style={"margin: auto"}>
                {this.props.status === "Active" && (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ folder: new Folder() }, () => {
                          this.showModal("add", this.state.folder);
                        });
                      }}
                    >
                      <i className="bi bi-folder-plus"></i>
                    </button>
                    <span> </span>
                  </>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    this.showModal("deleteSelection");
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
              <div className="col" Style={"margin: auto;"}>
                <Input
                  name="search"
                  placeholder="Enter your search text"
                  value={this.state.searchText}
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            <Table
              header={["Number", "Title", "Date", "Progress"]}
              columns={["number", "title", "date", "progress"]}
              data={this.state.data}
              select={this.select}
              selectAll={this.checkAll}
              view={this.view}
              actions={this.actions}
            />
          </>
        )}
        {this.state.showFilesView && (
          <Files
            status={this.props.status}
            folder={this.state.folder}
            showFiles={this.showFiles}
          />
        )}
        <ConfirmationModal
          onConfirm={this.modalOnConfirm}
          show={this.state.show}
          onCancel={this.closeModal}
          noText={<i className="bi bi-x-circle"></i>}
          yesText={<i className="bi bi-check-circle"></i>}
        >
          {this.modalBody()}
        </ConfirmationModal>
        <Spinner hidden={!this.state.loading} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }
}
