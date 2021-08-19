import React,{Component} from 'react'
import {Link} from "react-router-dom"

class ForgotPassword extends Component{

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("email sent")
    }

    render(){
        return(
        
            <form>
            <label htmlFor="Username">Username</label>
            <input type="text" name="username" placeholder="Enter your email or username"/>
            <button onClick={this.handleSubmit}>Send</button>
            <Link to="/SignIn">Sign in</Link> or <Link to="/signUp">Sign up</Link>
            </form>
        
            )
    }


}

export default ForgotPassword