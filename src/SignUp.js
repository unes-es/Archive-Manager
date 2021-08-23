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
            <div className="container modal-dialog">
                <div className="modal-content rounded-5 shadow p-5">
                    <form>    
                                
                    <div className="mb-3">
                        <label className="form-label"  htmlFor="Email">Email</label>
                        <input className="form-control" type="text" name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Confirm Email">Confirm Email</label>
                         <input className="form-control" type="text" name="confirmEmail" placeholder="Confirm your email"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Username">Username</label>
                         <input className="form-control" type="text" name="username" placeholder="Enter your username"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Password">Password</label>
                         <input className="form-control" type="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="confirm Password">Confirm Password</label>
                        <input className="form-control" type="password" name="confirm password" placeholder="Confirm your password"/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSignUp}>Sign up</button> already have account? <Link to="/SignIn">Sign in</Link>
                    </form>
                </div>
            </div>
            )
    }


}

export default SignUp