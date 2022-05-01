import React, { Component } from "react";

import FileViewer from "react-file-viewer";

import Table from "../Components/Table";
import FilePreviewerThumbnail from "react-file-previewer";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
registerPlugin(FilePondPluginFileEncode);

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ username: "00000" }],
      error: null,
      files: [],
      file: "",
      fileType: "",
      docs: [{ fileData: "" }],
    };
  }
  _base64ToArrayBuffer = (base64) => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  render() {
    return (
      <div>
        this is a test {this.state.users[0].username}
        <Table
          data={this.state.users}
          columns={["username"]}
          header={["Username"]}
        />
        <FilePond
          required={true}
          allowReorder={false}
          allowMultiple={false}
          allowFileEncode={true}
          onupdatefiles={(files) => {
            //this.setState({fileBase64 : file[0].getFileEncodeBase64String()})
            if (files[0] !== undefined) {
              this.setState({
                file: files[0].getFileEncodeBase64String(),
                fileType:
                  files[0].filename.split(".")[
                    files[0].filename.split(".").length - 1
                  ],
              });
              console.log(
                files[0].filename.split(".")[
                  files[0].filename.split(".").length - 1
                ]
              );
            }
          }}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        <div
          style={{
            border: "1px solid black",
            width: "500px",
            height: "700px",
          }}
        >
          {this.state.file && (
            <>
              {console.log(this.state.fileType)}
              <FileViewer
                filePath={
                  "data:" + this.state.fileType + ";base64," + this.state.file
                }
                //dataUrl={this.state.file}
                fileType={this.state.fileType}
                onError={(error) => {
                  console.log(error);
                }}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
