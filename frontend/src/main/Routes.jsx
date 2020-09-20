import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Customer from '../components/customer/Customer'
import Scheduling from '../components/scheduling/Scheduling'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/pacientes' component={Customer} />
        <Route path='/agendamento' component={Scheduling} />
        <Redirect from='*' to='/' />
    </Switch>