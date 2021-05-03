import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.scss'

export function NavBar(){
    return(
        <div className="topnav" id="myTopnav">
        <Link to="/" className="active">Home</Link>
        <Link to="/list" >Contact</Link>
        <Link to="/login">Login</Link>
        {/* <a href="javascript:void(0);" class="icon" onClick="{myFunction}">&#9776;</a> */}
        </div>
    )
}