import { format } from "date-fns";

export default class File {
  constructor(file) {
    //this.id = fileId;
    if (file !== undefined) {
      this.id = file._id;
      this.name = file.name;
      this.file = file.file;
      this.fileType = file.fileType;
      this.date = format(new Date(file.date), "yyyy-MM-dd");
      this.progress = file.progress;
      this.status = "Active" && file.status;
    }
  }
  file;
  fileType;
  id;
  name = "";
  date = format(new Date(), "yyyy-MM-dd");
  progress = "";
  status = "Active";
}
