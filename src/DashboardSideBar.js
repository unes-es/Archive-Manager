import React from "react";
import { NavLink } from "react-router-dom";

export default function DashboardSideBar() {
  return (
    <>
      <nav className="position-sticky col-lg-2 p-3 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              exact
              className="text-white nav-link"
              activeClassName="active"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="text-white nav-link"
              activeClassName="active"
              to="/dashboard/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="text-white nav-link"
              activeClassName="active"
              to="/dashboard/folders"
            >
              <i class="bi bi-folder2"></i> Folders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="text-white nav-link"
              activeClassName="active"
              to="/dashboard/archives"
            >
              <i class="bi bi-archive"></i> Archive
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="text-white nav-link"
              activeClassName="active"
              to="/dashboard/trash"
            >
              <i class="bi bi-trash"></i> Trash
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
