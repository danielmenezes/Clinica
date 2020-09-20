import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export default props => 
    <nav className="nav">
        <Link to="/pacientes" >
                <i className="fa fa-users"></i> Clientes
        </Link>
        <Link to="/agendamento" >
                <i className="fa fa-calendar"></i> Agendamento
        </Link>
    </nav>