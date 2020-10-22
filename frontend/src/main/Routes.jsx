import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Singin from '../pages/login/Singin'
import Home from '../pages/home/Home'
import Customer from '../pages/customer/Customer'
import Scheduling from '../pages/scheduling/Scheduling'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/singin' component={Singin} />
        <Route path='/pacientes' component={Customer} />
        <Route path='/agendamento' component={Scheduling} />
        <Redirect from='*' to='/' />
    </Switch>