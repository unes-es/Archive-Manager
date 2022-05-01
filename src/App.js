import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import Test from "./Draft/Test";
import EventsTest from "./Draft/EventsTest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/test" component={Test} />
            <Route path="/events" component={EventsTest} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <UnauthenticatedRoute path="/signIn" component={SignIn} />
            <UnauthenticatedRoute path="/signUp" component={SignUp} />
            <Route path="/forgotPassword" component={ForgotPassword} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
