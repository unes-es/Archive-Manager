import Data from "./data.json";
import File from "./File";
import Folder from "./Folder";

export default class FoldersManager {
  static folders = Data.map((row) => ({ ...row, selected: false }));

  static getFolders(status) {
    let folders = [];
    this.getFoldersByStatus(status).forEach((folder) => {
      folders.push(new Folder(folder));
    });
    return folders;
  }

  static save(folders) {
    console.log(folders);
  }

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
          return row.id == id;
        })
        .map((row) => ({
          ...row,
        }))[0]
    );
  }
  static indexOf(id) {
    return this.folders.findIndex((folder) => folder.id == id);
  }

  static add(folder) {
    folder = { ...folder, id: this.folders.length + 1 };
    this.folders.push(folder);
  }

  static deleteFolders(folders) {
    folders.forEach((folder) => {
      this.delete(folder.id);
    });
  }

  static delete(id) {
    this.folders[this.indexOf(id)].status = "Removed";
  }
  static edit(folder) {
    this.folders[this.indexOf(folder.id)] = folder;
  }

  static archive(id) {
    this.folders[this.indexOf(id)].status = "Archived";
  }

  static restore(id) {
    this.folders[this.indexOf(id)].status = "Active";
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

  static getFilesByStatus() {}

  static indexOfFile(fileId, folderId) {
    return this.folders[this.indexOf(folderId)].files.findIndex(
      (file) => file.id == fileId
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
  }
  static deleteFileFromFolder(fileId, folderId) {
    this.folders[this.indexOf(folderId)].files[
      this.indexOfFile(fileId, folderId)
    ].status = "Removed";
  }

  static editFile(file, folderId) {
    this.folders[this.indexOf(folderId)].files[
      this.indexOfFile(file.id, folderId)
    ] = file;
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
    console.log(folder);
    const files = folder.files;
    if (folder.files !== undefined) {
      return files
        .filter((row) => {
          return row.id == file.id;
        })
        .map((row) => ({
          ...row,
        }))[0];
    } else {
      return new File(0);
    }
  }
}
