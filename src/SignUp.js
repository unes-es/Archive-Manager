import React,{Component} from 'react'
import {Link} from "react-router-dom"
import AuthContext from './AuthContext'


class SignUp extends Component{

    constructor(props){
        super(props)
        this.state = {
                        email : "",
                        username : "",
                        confirmEmail : "",
                        password : "",
                        confirmPassword : "",
                        errors : []
                        }
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSignUp(e){
        e.preventDefault();
        const errors = []
        if(this.state.email !== this.state.confirmEmail)
            errors.push("Emails do not match")
        if(this.state.password !== this.state.confirmPassword)
            errors.push("Passwords do not match")
        this.setState({
            errors : errors
        })
        
        const user = {
            username : this.state.username
        }

        this.context.signUp(user)

        

    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
        

    }

    render(){
        return(
            <div className="container modal-dialog">
                <div className="modal-content rounded-5 shadow p-5">
                {this.state.errors.length>0 && <div className="alert alert-warning" role="alert">
                {this.state.errors.map((error)=>{
                    return (<li>{error}</li>)
                })}
                </div>}
                    <form>    
                                
                    <div className="mb-3">
                        <label className="form-label"  htmlFor="Email">Email</label>
                        <input className="form-control" value={this.state.email}  onChange={this.handleChange} type="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Confirm Email">Confirm Email</label>
                         <input className="form-control" value={this.state.confirmEmail}  onChange={this.handleChange} type="email" name="confirmEmail" placeholder="Confirm your email"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Username">Username</label>
                         <input className="form-control" value={this.state.username}  onChange={this.handleChange} type="text" name="username" placeholder="Enter your username"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Password">Password</label>
                         <input className="form-control" value={this.state.password}  onChange={this.handleChange} type="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="confirm Password">Confirm Password</label>
                        <input className="form-control" value={this.state.confirmPassword}  onChange={this.handleChange} type="password" name="confirmPassword" placeholder="Confirm your password"/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSignUp}>Sign up</button> already have account? <Link to="/SignIn">Sign in</Link>
                    </form>
                </div>
            </div>
            )
    }


}
SignUp.contextType = AuthContext
export default SignUp