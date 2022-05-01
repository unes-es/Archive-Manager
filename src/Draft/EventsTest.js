import React, { Component } from "react";
import Folder from "../Folder";
import Table from "../Components/Table";
const axios = require("axios").default;

export default class EventsTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.init();
  }

  init = () => {
    this.folders = [];
    this.setState({
      data: [],
    });
    axios
      .get("http://localhost:3001/events/")
      .then((response) => {
        const folders_ = {};
        response.data.forEach((folder) => {
          folders_[folder.folderId] = folder.data;
        });

        console.log(Object.values(folders_));

        // console.log(this.folders);
        this.setState({
          data: Object.values(folders_)
            .filter((row) => {
              return row.status === "Active";
            })
            .map((row) => ({
              ...row,
            })),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  folders = [];

  getFolderHistory = (folder) => {
    console.log("history");
    axios
      .get("http://localhost:3001/events/event/" + folder.id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  actions = (folder) => {
    return (
      <>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //this.showModal("delete", folder);
            console.log(folder);
            this.execute("remove", folder);
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
        <span> </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //this.showModal("archive", folder);
            this.execute("archive", folder);
          }}
        >
          <i className="bi bi-archive"></i>
        </button>
        <span> </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //this.showModal("archive", folder);
            this.getFolderHistory(folder);
          }}
        >
          <i className="bi bi-clock-history"></i>
        </button>
      </>
    );
  };

  execute = (command, folder) => {
    //const data = [];
    console.log(folder);
    if (folder === undefined) {
      folder = new Folder();
    }
    var event = "";
    //data.push({ event: event, data: folder });
    switch (command) {
      case "add":
        event = "Created";
        break;
      case "remove":
        event = "Removed";
        folder.status = event;
        break;
      case "archive":
        event = "Archived";
        folder.status = event;
        break;
      case "edit":
        event = "Edited";
        break;
      case "restore":
        event = "Restored";
        folder.status = "active";
        break;
      default:
        event = "defaultEvent";
        break;
    }

    axios
      .post("http://localhost:3001/events/add", {
        event: { event: event, data: folder, folderId: folder.id },
      })
      .then((response) => {
        console.log(response);
        this.init();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { data } = this.state;
    console.log(data);
    const td = data.map((row) => {
      return (
        <tr>
          <td>{row.event}</td>
        </tr>
      );
    });
    console.log(td);
    return (
      <>
        <div>events</div>
        <button
          onClick={() => {
            this.execute("add");
          }}
        >
          add
        </button>
        <button
          onClick={() => {
            this.execute("remove");
          }}
        >
          remove
        </button>
        <Table
          actions={this.actions}
          data={data}
          columns={["title", "date", "id"]}
          header={["title", "date", "id"]}
        />
      </>
    );
  }
}
