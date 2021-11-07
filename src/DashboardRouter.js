import React from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import Folders from "./Folders";

export default function DashboardRouter() {
  let { page } = useParams();
  switch (page.toLowerCase()) {
    case "profile":
      return <Profile />;
    case "folders":
      return <Folders status="Active" />;
    case "archives":
      return <Folders status="Archived" />;
    case "trash":
      return <Folders status="Removed" />;
    default:
      return <div>{page}</div>;
  }
}
