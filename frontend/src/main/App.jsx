import React, { useContext, useEffect, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { useHistory } from 'react-router-dom'

import './App.css'
import Header from '../components/templates/Header'
import Nav from '../components/templates/Nav'
import Footer from '../components/templates/Footer'
import Routes from './Routes'
import { appContext } from '../main/contexts/Context'
import { userKey } from '../main/global'
import api from '../services/api'


export default props => {
    const { setCurrentUserLogged } = useContext(appContext)
    const [validateToken, setValidateToken] = useState(true)
    const history = useHistory()

    useEffect(() => {
        async function validate() {
            const user = localStorage.getItem(userKey)
            const userData = JSON.parse(user)
            setCurrentUserLogged(null)

            if (!userData) {
                setValidateToken(false)
                history.push('/singin')
                return
            }

            const res = await api.post('/validateToken', userData)

            if (res.data) {
                setCurrentUserLogged(userData)
            } else {
                localStorage.removeItem(userKey)
                history.push('/singin')
            }

            setValidateToken(false)
        }

        validate()
    }, [history, setCurrentUserLogged])

    return (
        <div className="app">
            {!validateToken &&
                <>
                    <Header />
                    <Nav />
                    <Routes />
                    <Footer />
                </>
            }
        </div>
    )
}
