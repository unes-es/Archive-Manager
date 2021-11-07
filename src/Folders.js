import React, { Component } from "react";
import Files from "./Files";
import FoldersManager from "./FoldersManager";
import ConfirmationModal from "./Components/ConfirmationModal";
import Input from "./Components/Input";
import { format } from "date-fns";
import Folder from "./Folder";
import Table from "./Components/Table";

export default class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: FoldersManager.getFolders(this.props.status),
      show: false,
      folder: new Folder(),
      _for: "",
      showFilesView: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.status != prevProps.status) {
      this.setState({
        showFilesView: false,
        data: FoldersManager.getFolders(this.props.status),
      });
    }
  }

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
              <i class="bi bi-pencil-square"></i>
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
              <i class="bi bi-archive"></i>
            </button>
            <span> </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showModal("delete", folder);
              }}
            >
              <i class="bi bi-trash"></i>
            </button>
          </>
        );
        break;
      case "Archived":
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.showModal("delete", folder);
            }}
          >
            <i class="bi bi-trash"></i>
          </button>
        );
        break;
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
        break;
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
    const index = data.findIndex((folder) => folder.id == id);
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
    if (_for == "add" || _for == "edit") {
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
        </form>
      );
    } else if (_for == "archive") return "archive?";
    else if (_for == "delete") return "delete?";
    else if (_for == "deleteSelection") return "delete selection?";
  };

  modalOnConfirm = () => {
    const { data, folder, _for } = this.state;
    switch (_for) {
      case "edit":
        FoldersManager.edit(folder);
        break;
      case "archive":
        FoldersManager.archive(folder.id);
        break;
      case "delete":
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
            return folder.selected == true;
          })
        );
        break;
    }
    FoldersManager.save(this.state.data);
    this.closeModal();
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
        {!this.state.showFilesView && (
          <>
            {this.props.status == "Active" && (
              <>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ folder: new Folder() }, () => {
                      this.showModal("add", this.state.folder);
                    });
                  }}
                >
                  <i class="bi bi-folder-plus"></i>
                </button>
                <span> </span>
              </>
            )}
            <button
              className="btn btn-danger btn-sm mt-3"
              onClick={(e) => {
                e.preventDefault();
                this.showModal("deleteSelection");
              }}
            >
              <i class="bi bi-trash"></i>
            </button>

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
          noText={<i class="bi bi-x-circle"></i>}
          yesText={<i class="bi bi-check-circle"></i>}
        >
          {this.modalBody()}
        </ConfirmationModal>
      </>
    );
  }
}
