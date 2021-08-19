import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import ForgotPassword from './ForgotPassword';

function App() {

  return (<Router>
            <Switch>
              <Route exact path="/">
                <SignIn/>
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


    </Router>);
}

export default App;
