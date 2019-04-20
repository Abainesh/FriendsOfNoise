import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../Home'
import Signup from './../Signup'

const Router = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/signup' component={Signup}/>
  </Switch>
)

export default Router
