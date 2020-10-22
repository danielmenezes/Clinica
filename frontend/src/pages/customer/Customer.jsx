import React from 'react'


import './Customer.css'
import Main from '../../components/templates/Main'
import CustomerRegistration from './CustomerRegistration'
import CustomerSearch from './CustomerSearch'

export default () => {

    return(
        <Main>
            <CustomerRegistration></CustomerRegistration>
            <hr></hr>
            <CustomerSearch></CustomerSearch>
        </Main>
    )
}