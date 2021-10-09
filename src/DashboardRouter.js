import React from "react";
import { useParams } from "react-router-dom";
import Archive from "./Archive";
import Folders from "./Folders";
import Profile from "./Profile";

export default function DashboardRouter() {
  let { page } = useParams();
  switch (page.toLowerCase()) {
    case "profile":
      return <Profile />;
      break;
    case "folders":
      return <Folders />;
      break;
    case "archive":
      return <Archive />;
      break;
    default:
      return <div>{page}</div>;
  }
}
