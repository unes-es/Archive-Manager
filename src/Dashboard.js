import React from "react";
import AuthContext from "./AuthContext";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DashboardSideBar from "./DashboardSideBar";
import DashboardRouter from "./DashboardRouter";

export default function Dashboard() {
  let match = useRouteMatch();
  return (
    <div className="container-fluid">
      <div className="row">
        <DashboardSideBar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3">
          <Switch>
            <Route path={`${match.path}/:page`} component={DashboardRouter} />
            <Route path={`${match.path}/`}>
              <AuthContext.Consumer>
                {({ user }) => {
                  return (
                    <>
                      <h1>Dashboard</h1>
                      <h2>Welcome, {user.username}</h2>
                    </>
                  );
                }}
              </AuthContext.Consumer>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}
