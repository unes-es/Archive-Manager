import { format } from "date-fns";

export default class Folder {
  constructor(folder) {
    if (folder !== undefined) {
      this.id = folder.id;
      this.number = folder.number;
      this.title = folder.title;
      this.date = format(new Date(folder.date), "yyyy-MM-dd");
      this.type = folder.type;
      this.progress = folder.progress;
      this.status = "Active";
      if (folder.files === undefined) {
        this.files = [];
      } else {
        this.files = folder.files;
      }
    }
  }

  id = "";
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

  getActiveFiles() {
    return this.files.filter((file) => {
      return file.status == "Active";
    });
  }

  addFile = (file) => {
    file.id = this.files.length + 1;
    this.files.push(file);
    console.log(this);
  };

  editFile = (file) => {
    let index = this.indexOf(file.id);
    if (index == -1) {
      index = this.files.length;
    }
    this.files[index] = file;
  };

  deleteFile = (file) => {
    this.files[this.indexOf(file.id)].status = "Removed";
  };

  deleteFiles = (files) => {
    files.forEach((file) => {
      this.deleteFile(file);
    });
  };

  indexOf(id) {
    return this.files.findIndex((file) => file.id == id);
  }
}
