import React, { Component } from "react";
import Files from "../Files";
import FoldersManager from "../FoldersManager";

export default class Test2 extends Files {
  status = "Archived";
  constructor(props) {
    super(props);
    this.state = {
      data: FoldersManager.getFoldersByStatus(this.status),
      show: false,
    };
    this.reload = this.reload.bind(this);
  }
  actions = (folder) => {
    return (
      <>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            FoldersManager.delete(folder.id);
            this.reload();
          }}
        >
          Delete
        </button>
      </>
    );
  };

  reload() {
    this.setState({ data: FoldersManager.getFoldersByStatus(this.status) });
  }

  render() {
    return (
      <Files
        status={this.status}
        data={this.state.data}
        actions={this.actions}
        reload={this.reload}
      />
    );
  }
}
