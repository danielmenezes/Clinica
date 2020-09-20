import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './Header.css'

export default props => 
    <header className="header">
        <div className="logo">
            <Link to="/">
                <img src={logo} alt="Logo"/>
            </Link>
        </div>
        <span className="login">
            Bem vindo(a)! <strong> Daniel </strong>
            <span className="fa fa-user"> </span>
            <a href="/">
            <span className="logout fa fa-sign-out"></span>
            {props.name}
        </a>
        </span>
    </header>