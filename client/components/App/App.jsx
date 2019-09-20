import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { GAME_STATE } from '../../utilities/constants'
import Splash from '../Splash/Splash'
import GamePlay from '../GamePlay/GamePlay'
import FullDeck from '../FullDeck/FullDeck'

const App = ({gameState}) => {
  return (
    <BrowserRouter>
      {gameState === GAME_STATE.SHOW_DECK && <Redirect push to="/deck" />}
      {gameState === GAME_STATE.DURING_GAME && <Redirect push to="/play" />}
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/deck" component={FullDeck} />
        <Route exact path="/play" component={GamePlay} />
      </Switch>
    </BrowserRouter>
  )
}

function mapStateToProps (state) {
  return {
    gameState: state.gameState
  }
}

export default connect(mapStateToProps)(App)
