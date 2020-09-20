import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Header from '../components/templates/Header'
import Nav from '../components/templates/Nav'
import Footer from '../components/templates/Footer'
import Routes from './Routes'

export default props => 
<BrowserRouter>
    <div className="app">
        <Header />
        <Nav />
        <Routes />
        <Footer />
    </div>
</BrowserRouter>