import React, { useState } from 'react'

import './Customer.css'
import Main from '../templates/Main'
import CustomerRegistration from './CustomerRegistration'
import CustomerSearch from './CustomerSearch'

export default () => {
    const [currentUser, setCurrentUser] = useState({})
    const [editMode, setEditMode] = useState(false)

    return(
        <Main>
            <CustomerRegistration currentUser={currentUser} editMode={[editMode, setEditMode]}></CustomerRegistration>
            <hr></hr>
            <CustomerSearch currentUser={setCurrentUser} editMode={[editMode, setEditMode]} ></CustomerSearch>
        </Main>
    )
}