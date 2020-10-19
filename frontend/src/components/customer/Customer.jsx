import React from 'react'
import { ToastProvider } from 'react-toast-notifications';

import './Customer.css'
import Main from '../templates/Main'
import CustomerRegistration from './CustomerRegistration'
import CustomerSearch from './CustomerSearch'

export default () => {

    return(
        <Main>
            <ToastProvider>
                <CustomerRegistration></CustomerRegistration>
                <hr></hr>
                <CustomerSearch></CustomerSearch>
            </ToastProvider>
        </Main>
    )
}