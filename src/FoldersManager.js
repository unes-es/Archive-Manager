import EventsManager from "./EventsManager";
import File from "./File";
import Folder from "./Folder";
const axios = require("axios").default;

export default class FoldersManager {
  savedFolder = new Folder();
  static async init() {
    this.folders = [];
    // await axios
    //   .get("http://localhost:3001/folders/")
    //   .then((response) => {
    //     response.data.forEach((folder) => {
    //       this.folders.push(new Folder(folder));
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    await EventsManager.getFolders().then((folders) => {
      folders.forEach((folder) => {
        this.folders.push(new Folder(folder));
      });
    });
    // EventsManager.getFolders().forEach((folder) => {
    //   this.folders.push(new Folder(folder));
    // });
  }

  static folders = []; // = Data.map((row) => ({ ...row, selected: false }));
  static action = "";
  static getFolders(status) {
    // let folders = [];
    // this.getFoldersByStatus(status).forEach((folder) => {
    //   folders.push(new Folder(folder));
    // });
    // return folders;
    return this.getFoldersByStatus(status).map((row) => ({
      ...row,
      selected: false,
    }));
  }

  static async save() {
    const result = { respond: null, error: null };
    await axios
      .post("http://localhost:3001/folders/" + this.action, {
        folder: this.savedFolder,
      })
      .then((response) => {
        this.savedFolder = new Folder(response.data.folder);
        result.respond = this.savedFolder;
        if (this.action === "add") {
          this.folders[this.folders.length - 1] = this.savedFolder;
        }
      })
      .catch((error) => {
        console.log(error);
        result.error = error;
      });
    return result;
  }

  static lastSavedFolder = () => {
    return this.savedFolder;
  };

  static getActiveFolders() {
    return this.getFoldersByStatus("Active");
  }

  static getArchivedFolders() {
    return this.getFoldersByStatus("Archived");
  }
  static getRemovedFolders() {
    return this.getFoldersByStatus("Removed");
  }

  static getFoldersByStatus(status) {
    return this.folders
      .filter((row) => {
        return row.status === status;
      })
      .map((row) => ({
        ...row,
      }));
  }

  static getFolderById(id) {
    return new Folder(
      this.folders
        .filter((row) => {
          return row.id === id;
        })
        .map((row) => ({
          ...row,
        }))[0]
    );
  }
  static indexOf(id) {
    return this.folders.findIndex((folder) => {
      return folder.id === id;
    });
  }

  static add(folder) {
    this.action = "add";
    //folder = new Folder(folder);
    this.folders.push(folder);
    this.savedFolder = folder;
    //EventsManager.execute("add", folder);
  }

  static deleteFolders(folders) {
    folders.forEach((folder) => {
      EventsManager.execute("remove", folder);
      this.delete(folder.id);
    });
  }

  static delete(id) {
    this.action = "update";
    this.folders[this.indexOf(id)].status = "Removed";
    this.savedFolder = this.folders[this.indexOf(id)];
    //EventsManager.execute("remove", this.folders[this.indexOf(id)]);
  }
  static edit(folder) {
    this.action = "update";
    this.folders[this.indexOf(folder.id)] = folder;
    this.savedFolder = folder;
    //EventsManager.execute("edit", folder);
  }

  static archive(id) {
    this.action = "update";
    this.folders[this.indexOf(id)].status = "Archived";
    this.savedFolder = this.folders[this.indexOf(id)];
    //EventsManager.execute("archive", this.folders[this.indexOf(id)]);
  }

  static restore(id) {
    this.action = "update";
    this.folders[this.indexOf(id)].status = "Active";
    this.savedFolder = this.folders[this.indexOf(id)];
    //EventsManager.execute("restore", this.folders[this.indexOf(id)]);
  }

  //file manager

  static getFileById(folder, file) {
    const _file = this.findFileInFolder(file, folder);
    if (_file !== undefined) {
      return _file;
    } else {
      return new File("1");
    }
  }

  static indexOfFile(fileId, folderId) {
    return this.folders[this.indexOf(folderId)].files.findIndex(
      (file) => file.id === fileId
    );
  }

  static addFileToFolder(file, folderId) {
    let folder = this.folders[this.indexOf(folderId)];
    file.status = "Active";
    if (folder.files !== undefined) {
      file.id = folder.files.length + 1;
      this.folders[this.indexOf(folderId)].files.push(file);
    } else {
      file.id = "1";
      this.folders[this.indexOf(folderId)] = { ...folder, files: [file] };
    }
    this.savedFolder = this.folders[this.indexOf(folderId)];
  }
  static deleteFileFromFolder(fileId, folderId) {
    this.folders[this.indexOf(folderId)].files[
      this.indexOfFile(fileId, folderId)
    ].status = "Removed";
    this.savedFolder = this.folders[this.indexOf(folderId)];
  }

  static editFile(file, folderId) {
    this.folders[this.indexOf(folderId)].files[
      this.indexOfFile(file.id, folderId)
    ] = file;
    this.savedFolder = this.folders[this.indexOf(folderId)];
  }

  static getFilesByStatus(folderId, status) {
    const files = this.folders[this.indexOf(folderId)].files;
    if (files !== undefined) {
      return files
        .filter((row) => {
          return row.status === status;
        })
        .map((row) => ({
          ...row,
        }));
    }
  }

  static getActiveFiles(folderId) {
    return this.getFilesByStatus(folderId, "Active");
  }

  static findFileInFolder(file, folder) {
    const files = folder.files;
    if (folder.files !== undefined) {
      return files
        .filter((row) => {
          return row.id === file.id;
        })
        .map((row) => ({
          ...row,
        }))[0];
    } else {
      return new File(0);
    }
  }
}
