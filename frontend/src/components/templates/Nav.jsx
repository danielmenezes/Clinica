import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'
import {appContext} from '../../main/contexts/Context'

export default props => {
  const {currentUserLogged} = useContext(appContext)

 
  return (
    <nav className="nav">
      { currentUserLogged &&
        <>
          <Link to="/pacientes" >
            <i className="fa fa-users"></i> Clientes
          </Link>
          <Link to="/agendamento" >
            <i className="fa fa-calendar"></i> Agendamento
          </Link>
        </>
      }
    </nav>
  )
}
