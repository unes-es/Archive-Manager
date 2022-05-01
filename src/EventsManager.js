import Folder from "./Folder";
const axios = require("axios").default;

export default class EventsManager {
  static async getFolders() {
    const folders_ = {};
    await axios
      .get("http://localhost:3001/events/")
      .then((response) => {
        response.data.forEach((folder) => {
          folders_[folder.folderId] = folder.data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return Object.values(folders_);
  }
  static async execute(command, folder) {
    const result = { respond: null, error: null };
    var event = "";
    if (folder === undefined) {
      folder = new Folder();
    }
    switch (command) {
      case "add":
        event = "Created";
        break;
      case "remove":
        event = "Removed";
        break;
      case "archive":
        event = "Archived";
        break;
      case "edit":
        event = "Edited";
        break;
      case "restore":
        event = "Restored";
        break;
      case "editFile":
        event = "File edited";
        break;
      case "addFile":
        event = "File added";
        break;
      case "removeFile":
        event = "File removed";
        break;
      default:
        event = "defaultEvent";
        break;
    }

    await axios
      .post("http://localhost:3001/events/add", {
        event: { event: event, data: folder, folderId: folder.id },
      })
      .then((response) => {
        console.log(response);
        result.respond = new Folder(response.data.event.data);
      })
      .catch((error) => {
        console.log(error);
        result.error = error;
      });
    return result;
  }

  static async getEditHistory(folder) {
    var data = [];
    await axios
      .get("http://localhost:3001/events/event/" + folder.id)
      .then((response) => {
        console.log(response);
        data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  }
}
