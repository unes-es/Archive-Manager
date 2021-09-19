import React from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

export default function DashboardRouter() {
  let { page } = useParams();
  switch (page.toLowerCase()) {
    case "profile":
      return <Profile />;
      break;
    default:
      return <div>{page}</div>;
  }
}
