import React, { Component } from "react";
import Table from "./Components/Table";
import Input from "./Components/Input";
import { format } from "date-fns";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfirmationModal from "./Components/ConfirmationModal";
import File from "./File";

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      folder: this.props.folder,
      files: this.props.folder.files,
      file: new File(),
      _for: "",
    };
  }

  showModal = (_for, file) => {
    this.setState({ file: file, _for: _for, show: true });
  };

  closeModal = () => {
    const { folder, file } = this.state;
    this.setState({
      show: false,
    });
  };

  modalBody = () => {
    const { file, _for } = this.state;
    if (_for == "add" || _for == "edit") {
      return (
        <form>
          <Input
            name="name"
            text="Name"
            placeholder="Enter file name"
            value={file.name}
            onChange={this.handleChange}
          />
          <Input
            name="path"
            text="Path"
            placeholder="Enter file path"
            value={file.path}
            onChange={this.handleChange}
          />
          <Input
            type="date"
            text="Date"
            name="date"
            value={format(new Date(file.date), "yyyy-MM-dd")}
            onChange={this.handleChange}
          />
        </form>
      );
    } else if (_for == "delete") return "delete?";
  };

  modalOnConfirm = () => {
    const { file, _for, folder } = this.state;
    switch (_for) {
      case "edit":
        folder.editFile(file);
        break;
      case "delete":
        folder.deleteFile(file);
        break;
      case "add":
        folder.addFile(file);
        break;
      case "deleteSelection":
        folder.deleteFiles(
          folder.files.filter((file) => {
            return file.selected == true;
          })
        );
        break;
    }
    this.closeModal();
  };

  handleChange = (e) => {
    const file = { ...this.state.file };
    file[e.target.name] = e.target.value;
    this.setState({ file: file });
  };

  select = (e, id) => {
    e.stopPropagation();
    const { folder } = this.state;
    const index = folder.files.findIndex((file) => file.id == id);
    folder.files[index].selected = e.target.checked;
    this.setState({
      folder: folder,
    });
  };
  selectAll = (e) => {
    const { folder } = this.state;
    folder.files.forEach((file) => {
      this.select(e, file.id);
    });
    this.setState({ folder: folder });
  };

  actions = (file) => {
    return (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showModal("edit", file);
          }}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <span> </span>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showModal("delete", file);
          }}
        >
          <i class="bi bi-trash"></i>
        </button>
      </>
    );
  };

  render() {
    return (
      <>
        <div>
          <div className="accordion mt-3">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <div className="accordion-button">
                  <a href="#!" onClick={this.props.showFiles}>
                    <i
                      className="bi bi-arrow-left-circle me-3"
                      Style="font-size: 1.5rem;"
                    ></i>
                  </a>
                  {this.props.folder.title} - {this.props.folder.number}
                  <span Style="position: absolute; right:0px;">
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => {
                        this.showModal("deleteSelection", this.state.file);
                      }}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-3"
                      onClick={() => {
                        this.setState({ file: new File() }, () => {
                          this.showModal("add", this.state.file);
                        });
                      }}
                    >
                      <i class="bi bi-file-earmark-plus"></i>
                    </button>
                  </span>
                </div>
              </h2>
              <div className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {this.state.folder.files !== undefined && (
                    <Table
                      actions={this.actions}
                      data={this.state.folder.getActiveFiles()}
                      selectAll={this.selectAll}
                      select={this.select}
                      header={["name", "path", "date", "progress"]}
                      columns={["name", "path", "date", "progress"]}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirmationModal
          onConfirm={this.modalOnConfirm}
          show={this.state.show}
          onCancel={this.closeModal}
        >
          {this.modalBody()}
        </ConfirmationModal>
      </>
    );
  }
}
