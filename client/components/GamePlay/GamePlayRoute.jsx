import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import GamePlay from './GamePlay'

const GamePlayRoute = () => {
  return (
    <Switch>
      <Route exact path='/play' render={() => <Redirect to="/" />}/>
      <Route path='/play/:deck' component={GamePlay}/>
    </Switch>
  )
}

export default GamePlayRoute
