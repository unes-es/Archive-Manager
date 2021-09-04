import React, {Component } from 'react'


const AuthContext = React.createContext()

export class AuthProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : {}
        }
        this.signUp = this.signUp.bind(this)
    }


    signUp(user){
        this.setState({
            user : user
        },()=>{
            console.log(this.state.user)
        })
        
    }

    render() {
        const user = this.state.user
        const  {signUp} = this
        return (
            
            <AuthContext.Provider value={{
                user,
                signUp
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext