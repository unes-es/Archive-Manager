import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import ForgotPassword from './ForgotPassword';
import Nav from './Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (

  <Router>
    <div className="">
      <Nav/>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/home">
                <Home/>
              </Route>
              <Route exact path="/SignIn">
                <SignIn/>
              </Route>
              <Route exact path="/SignUp">
                <SignUp/>
              </Route>
              <Route exact path="/ForgotPassword">
                <ForgotPassword/>
              </Route>
            </Switch>
    </div>

    </Router>);
}

export default App;
