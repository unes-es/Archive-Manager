import React, { Component } from "react";
import FileViewer from "react-file-viewer";
import Table from "./Components/Table";
import Input from "./Components/Input";
import { format } from "date-fns";
import ConfirmationModal from "./Components/ConfirmationModal";
import File from "./File";
import FoldersManager from "./FoldersManager";
import FilePreviewerThumbnail from "react-file-previewer";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
registerPlugin(FilePondPluginFileEncode);

var mime = require("mime-types");

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      folder: this.props.folder,
      files: this.props.folder.files,
      file: new File(),
      fileBase64: "",
      _for: "",
      showAlert: false,
      alertBody: "",
      alertVariant: "success",
      history: [],
    };
    console.log(this.props.folder);
    this.props.folder.getFolderEditHistory().then((history) => {
      this.setState({
        history: history,
      });
    });
  }

  view = (file) => {
    this.showModal("view", file);
  };

  showModal = (_for, file) => {
    this.setState({ file: file, _for: _for, show: true });
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  modalBody = () => {
    const { file, _for } = this.state;
    if (_for === "add" || _for === "edit") {
      return (
        <form>
          <Input
            name="name"
            text="Name"
            placeholder="Enter file name"
            value={file.name}
            onChange={this.handleChange}
          />
          <div className="mb-3">
            <label className="form-label" htmlFor="File">
              File
            </label>

            <FilePond
              required={true}
              allowReorder={false}
              allowMultiple={false}
              allowFileEncode={true}
              onupdatefiles={(files) => {
                console.log(files[0].getFileEncodeBase64String());
                //this.setState({fileBase64 : file[0].getFileEncodeBase64String()})
                if (files[0].getFileEncodeBase64String() !== undefined) {
                  file.file = files[0].getFileEncodeBase64String();
                  file.fileType = files[0].fileType;
                }
              }}
              labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <Input
            type="date"
            text="Date"
            name="date"
            value={format(new Date(file.date), "yyyy-MM-dd")}
            onChange={this.handleChange}
          />
        </form>
      );
    } else if (_for === "delete") return "delete?";
    else if (_for === "view") {
      if (file.file !== undefined) {
        console.log(file.file);

        return (
          <FilePreviewerThumbnail
            file={{
              data: new Buffer.from(file.file, "base64"),
              mimeType: file.fileType,
              name: file.name,
            }}
            hideControls={false}
          />

          // <FileViewer
          //   fileType={mime.extension(file.fileType)}
          //   dataUrl={"data:" + file.fileType + ";base64," + file.file}
          // />
        );
      } else {
        return "No file to view";
      }
    }
  };

  modalOnConfirm = () => {
    const { file, _for, folder } = this.state;
    FoldersManager.action = "update";
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
            return file.selected === true;
          })
        );
        break;
      default:
        break;
    }
    if (_for !== "view") {
      // FoldersManager.save().then((res) => {
      //   if (res.error !== null) {
      //     this.setState({ alertVariant: "danger", alertBody: res.error });
      //   } else {
      //     this.setState({ alertVariant: "success", folder: res.respond });
      //   }
      this.closeModal();
      //   this.setState({
      //     showAlert: true,
      //   });
      // });
    }
    //this.closeModal();
  };

  handleChange = (e) => {
    const file = { ...this.state.file };
    file[e.target.name] = e.target.value;
    this.setState({ file: file });
  };

  select = (e, id) => {
    e.stopPropagation();
    const { folder } = this.state;
    const index = folder.files.findIndex((file) => file.id === id);
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
          <i className="bi bi-pencil-square"></i>
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
          <i className="bi bi-trash"></i>
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
                      style={{ fontSize: 1.5 + "rem" }}
                    ></i>
                  </a>
                  {this.props.folder.title} - {this.props.folder.number}
                  <span style={{ position: "absolute", right: 0 + "px" }}>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => {
                        this.showModal("deleteSelection", this.state.file);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-3"
                      onClick={() => {
                        this.setState({ file: new File() }, () => {
                          this.showModal("add", this.state.file);
                        });
                      }}
                    >
                      <i className="bi bi-file-earmark-plus"></i>
                    </button>
                  </span>
                </div>
              </h2>
              <div className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {this.state.folder.files !== undefined &&
                  this.state.folder.files.length > 0 ? (
                    <Table
                      actions={this.actions}
                      data={this.state.folder.getActiveFiles()}
                      selectAll={this.selectAll}
                      select={this.select}
                      header={["Name", "Type", "Date", "Progress"]}
                      columns={["name", "fileType", "date", "progress"]}
                      view={this.view}
                    />
                  ) : (
                    <span>
                      no files yet! click the<span> </span>
                      <i className="bi bi-file-earmark-plus"></i>
                      <span> </span>to add a file
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion mt-3 col-sm-8">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <div className="accordion-button">history</div>
              </h2>
              <div className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <Table
                    data={this.state.history}
                    header={["Event", "Date"]}
                    columns={["event", "createdAt"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirmationModal
          onConfirm={this.modalOnConfirm}
          show={this.state.show}
          onCancel={this.closeModal}
          noText={<i className="bi bi-x-circle"></i>}
          yesText={<i className="bi bi-check-circle"></i>}
        >
          {this.modalBody()}
        </ConfirmationModal>
      </>
    );
  }
}
