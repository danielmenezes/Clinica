import React, { useState } from 'react'

import './Customer.css'
import Main from '../templates/Main'
import CustomerRegistration from './CustomerRegistration'
import CustomerSearch from './CustomerSearch'

export default () => {
    const [currentUser, setCurretUser] = useState({})

    return(
        <Main>
            <CustomerRegistration currentUser={currentUser}></CustomerRegistration>
            <hr></hr>
            <CustomerSearch currentUser={setCurretUser}></CustomerSearch>
        </Main>
    )
}