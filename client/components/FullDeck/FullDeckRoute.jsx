import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import FullDeck from './FullDeck'

const FullDeckRoute = () => {
  return (
    <Switch>
      <Route exact path='/deck' render={() => <Redirect to='/' />} />
      <Route path='/deck/:deck' component={FullDeck} />
    </Switch>
  )
}

export default FullDeckRoute
