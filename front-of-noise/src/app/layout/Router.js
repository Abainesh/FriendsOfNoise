import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../Home'
import Signup from './../Signup'
import Signin from './../Signin'
import About from './../About'
import Calendar from './../Calendar'
import Profile from './../Profile'
import Membership from './../Membership'
import withAuthentication from'./../withAuthentication';
import Store from './../Store'

const Router = () => (
  <Switch>
    <Route exact path='/'     component={Home}/>
    <Route path='/signup'     component={Signup}/>
    <Route path='/signin'     component={Signin}/>
    <Route path='/about'      component={About}/>
    <Route path='/calendar'   component={Calendar}/>
    <Route path='/profile'    component={withAuthentication(Profile)}/>
    <Route path='/membership' component={Membership}/>
    <Route path='/store'      component={Store}/>
  </Switch>
)

export default Router
