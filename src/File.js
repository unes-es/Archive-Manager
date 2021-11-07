import { format } from "date-fns";

export default class File {
  constructor(fileId) {
    this.id = fileId;
  }
  id;
  name = "";
  path = "";
  date = format(new Date(), "yyyy-MM-dd");
  progress = "";
  status = "Active";
}
