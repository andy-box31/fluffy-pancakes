import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SimpleChat from './SimpleChat'

const SimpleChatRoute = () => {
  return (
    <Switch>
      <Route path='/' component={SimpleChat} />
    </Switch>
  )
}

export default SimpleChatRoute
