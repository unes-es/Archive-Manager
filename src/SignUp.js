import React,{Component} from 'react'
import {Link} from "react-router-dom"


class SignUp extends Component{

    constructor(props){
        super(props)
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    handleSignUp(e){
        e.preventDefault();
        console.log("signed up")
    }

    render(){
        return(
        
            <form>            
            <label htmlFor="Email">Email</label>
            <input type="text" name="email" placeholder="Enter your email"/>
            <label htmlFor="Confirm Email">Confirm Email</label>
            <input type="text" name="confirmEmail" placeholder="Confirm your email"/>
            <label htmlFor="Username">Username</label>
            <input type="text" name="username" placeholder="Enter your username"/>
            <label htmlFor="Password">Password</label>
            <input type="password" name="password" placeholder="Enter your password"/>
            <label htmlFor="confirm Password">Confirm Password</label>
            <input type="password" name="confirm password" placeholder="Confirm your password"/>
            <button onClick={this.handleSignUp}>Sign up</button>already have account?<Link to="/SignIn">Sign in</Link>
            </form>
        
            )
    }


}

export default SignUp