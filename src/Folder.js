import { format } from "date-fns";
import FoldersManager from "./FoldersManager";
import File from "./File";
import EventsManager from "./EventsManager";

export default class Folder {
  constructor(folder) {
    if (folder !== undefined) {
      this.id = folder._id !== undefined ? folder._id : "0";
      this.id = folder.id !== undefined || folder.id !== "0" ? folder.id : "0";
      this.number = folder.number;
      this.title = folder.title;
      this.date = format(new Date(folder.date), "yyyy-MM-dd");
      this.type = folder.type;
      this.progress = folder.progress;
      this.status = "Active" && folder.status;
      if (folder.files === undefined) {
        this.files = [];
      } else {
        this.files = [];
        folder.files.forEach((file) => {
          this.files.push(new File(file));
        });
      }
    } else {
      this.id = "0";
    }
  }

  id = "0";
  number = "";
  title = "";
  date = format(new Date(), "yyyy-MM-dd");
  type = "";
  progress = "";
  status = "Active";
  files = [];

  archive() {
    this.status = "Archived";
  }

  getActiveFiles = () => {
    return this.files.filter((file) => {
      return file.status === "Active";
    });
  };

  addFile = (file) => {
    file.id = this.files.length + 1;
    this.files.push(file);
    FoldersManager.savedFolder = this;
    EventsManager.execute("addFile", this);
  };

  editFile = (file) => {
    let index = this.indexOf(file.id);
    if (index === -1) {
      index = this.files.length;
    }
    this.files[index] = file;
    FoldersManager.savedFolder = this;
    EventsManager.execute("editFile", this);
  };

  deleteFile = (file) => {
    this.files[this.indexOf(file.id)].status = "Removed";
    FoldersManager.savedFolder = this;
    EventsManager.execute("removeFile", this);
  };

  deleteFiles = (files) => {
    files.forEach((file) => {
      this.deleteFile(file);
    });
  };

  indexOf(id) {
    return this.files.findIndex((file) => file.id === id);
  }

  getFolderEditHistory = () => {
    return EventsManager.getEditHistory(this);
  };

  contains = (string) => {
    return this.loopThroughObjectStrings(this).includes(string);
  };

  loopThroughObjectStrings = (object) => {
    var strings = "";
    Object.values(object).forEach((elm) => {
      if (typeof elm === "string") {
        strings = strings + " " + elm.toLowerCase();
      } else if (typeof elm === "object") {
        strings = strings + " " + this.loopThroughObjectStrings(elm);
      }
    });
    return strings;
  };
}
