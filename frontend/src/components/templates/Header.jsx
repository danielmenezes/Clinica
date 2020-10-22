import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './Header.css'
import { userKey } from '../../main/global'
import {appContext} from '../../main/contexts/Context'

export default props => {
    const {currentUserLogged, setCurrentUserLogged} = useContext(appContext)
    const history = useHistory()
    

    const logout = () => {
        localStorage.removeItem(userKey)
        setCurrentUserLogged(null)
        history.push('/singin')
    }


    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            { currentUserLogged &&
                <span className="login">
                    Bem vindo(a)! <strong> {currentUserLogged.name} </strong>
                    <span className="fa fa-user"> </span>

                    <button type='button' onClick={logout}
                    className="logout fa fa-sign-out">   
                    </button>
                </span>
            }
        </header>
    )
}
