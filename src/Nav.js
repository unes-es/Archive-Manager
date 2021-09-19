import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

function Nav() {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, logOut }) => {
        console.log("context");
        return (
          <>
            <nav className="sticky-top hstack p-3 bg-dark text-white ">
              <h3 className="navbar-nav me-2">
                <Link className="text-white text-decoration-none" to="/home">
                  Home
                </Link>
              </h3>
              <h3 className="navbar-nav">
                <Link
                  className="text-white text-decoration-none"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </h3>
              {isAuthenticated ? (
                <ul className=" ms-auto nav justify-content-end ">
                  <li className="nav-item">
                    <a
                      href="#"
                      className="nav-link px-2 text-white"
                      onClick={logOut}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className=" ms-auto nav justify-content-end ">
                  <li className="nav-item">
                    <Link className="nav-link px-2 text-white" to="/signIn">
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link px-2 text-white" to="/signUp">
                      Sign up
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Nav;
