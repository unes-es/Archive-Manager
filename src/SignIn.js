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
        
            <form onSubmit={this.handleSignIn}>
            <label htmlFor="Username">Username</label>
            <input type="text" name="username" placeholder="Enter your email or username"/>
            <label htmlFor="Password">Password</label>
            <input type="password" name="password" placeholder="Enter your password"/>
            <Link to="/ForgotPassword">Forgot password?</Link>
            <input type="checkbox" name="remenberMe"/>
            <label htmlFor="Remembre me">Remembre me</label>
            <button >Sign in</button>or <Link to="/signUp">Sign up</Link>
            </form>
        
            )
    }


}

export default SignIn
