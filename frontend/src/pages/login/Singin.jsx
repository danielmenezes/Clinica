import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import Main from '../../components/templates/Main'
import './Singin.css'
import userLogin from  './images/userlogin.png'
import api from '../../services/api'
import { userKey } from '../../main/global'
import { appContext } from '../../main/contexts/Context'


export default () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const history = useHistory()
    const { setCurrentUserLogged } = useContext(appContext)

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { name, password }

        api.post('/signin', data).then(res => {
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            localStorage.setItem(userKey, JSON.stringify(res.data))
            setCurrentUserLogged(res.data)
            history.push('/')
        }).catch(err => {
            if(err && err.response && err.response.data) {
                toast.error(err.response.data)
            }
        })

    }

    return (
        <Main>
            <div className="page-login">
                <div className="auth-modal">
                    <img src={userLogin} alt="login"/>
                    <form onSubmit={handleSubmit} className="auth-form" action="">
                        <label htmlFor="name">Usuário</label>
                        <input type="text" onChange={event => setName(event.target.value)} name="name" />
                        <label htmlFor="password">Senha</label>
                        <input type="password" onChange={event => setPassword(event.target.value)} name="password"/>
                        <button type='submit'> Entrar </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </Main>
    )
}