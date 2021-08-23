import React from 'react'
import {Link} from 'react-router-dom';

function Nav(){
    return(
    <nav className="hstack p-3 bg-dark text-white ">
        <h3><Link className="text-white text-decoration-none" to="/home">Home</Link></h3>
        <ul className=" ms-auto nav justify-content-end ">
            <li className="nav-item"><Link className="nav-link px-2 text-white" to="/signIn">Sign in</Link></li>
            <li className="nav-item"><Link className="nav-link px-2 text-white" to="/signUp">Sign up</Link></li>
        </ul>
    </nav>
    )
}

export default Nav