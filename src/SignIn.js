import React,{Component} from 'react'
import {Link} from "react-router-dom"

class SignIn extends Component{

    constructor(props){
        super(props)
        this.handleSignIn = this.handleSignIn.bind(this)
    }

    handleSignIn(e){
        e.preventDefault();
        console.log("signed in")
    }

    render(){
        return(
          <div className="container modal-dialog">
            <div className="modal-content rounded-5 shadow p-5">
            <form onSubmit={this.handleSignIn}>
            <div className="mb-3">
              <label className="form-label" htmlFor="Username">Username</label>
              <input className="form-control" type="text" name="username" placeholder="Enter your email or username"/>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Password">Password</label>
              <input className="form-control" type="password" name="password" placeholder="Enter your password"/>
            <Link to="/ForgotPassword">Forgot password?</Link>
            </div>           
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" name="remenberMe"/>  
              <label className="form-check-label" htmlFor="RemembreMe">Remembre me</label>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" >Sign in</button> or <Link to="/signUp">Sign up</Link>
            </div>
            </form>
            </div>
        </div>
            )
    }


}

export default SignIn
