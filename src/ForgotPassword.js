import React,{Component} from 'react'

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
            <div className="modal-dialog">
                <div className="modal-content rounded-5 shadow p-5">
                    <form class="row g-3">
                        <div class="col-auto">
                            <label className="form-control-plaintext" htmlFor="Username">Username</label>
                        </div>
                        <div class="col-auto">
                            <input className="form-control" type="text" name="username" placeholder="Enter your email or username"/>
                        </div>
                        <div class="col-auto">
                            <button  class="btn btn-primary mb-3" onClick={this.handleSubmit}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
            )
    }


}

export default ForgotPassword