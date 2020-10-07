import React, { useState } from 'react'
import { ToastProvider } from 'react-toast-notifications';

import './Customer.css'
import Main from '../templates/Main'
import CustomerRegistration from './CustomerRegistration'
import CustomerSearch from './CustomerSearch'

export default () => {
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [editMode, setEditMode] = useState(false)

    return(
        <Main>
            <ToastProvider>
                <CustomerRegistration currentCustomer={[currentCustomer, setCurrentCustomer]} editMode={[editMode, setEditMode]}></CustomerRegistration>
                <hr></hr>
                <CustomerSearch currentCustomer={setCurrentCustomer} editMode={[editMode, setEditMode]} ></CustomerSearch>
            </ToastProvider>
        </Main>
    )
}