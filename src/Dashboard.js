import React from "react";
import AuthContext from "./AuthContext";

export default function Dashboard() {
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        return (
          <div className="container">
            <h1>Dashboard</h1>
            <h2>Welcome, {user.username}</h2>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
