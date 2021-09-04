import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import ForgotPassword from './ForgotPassword';
import Nav from './Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';

function App() {

  return (

  <Router>
    <AuthProvider>
    <div className="">
      <Nav/>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/home">
                <Home/>
              </Route>
              <Route path="/SignIn">
                <SignIn/>
              </Route>
              <Route path="/SignUp">
                <SignUp/>
              </Route>
              <Route path="/ForgotPassword">
                <ForgotPassword/>
              </Route>
            </Switch>
    </div>
    </AuthProvider>
    </Router>);
}

export default App;
