import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { GAME_STATE } from '../../utilities/constants'
import Splash from '../Splash/Splash'
import GamePlayRoute from '../GamePlay/GamePlayRoute'
import  FullDeckRoute  from '../FullDeck/FullDeckRoute'
import Four0Four from './Four0Four'

const App = ({gameState, deckInfo}) => {
  return (
    <BrowserRouter>
      {gameState === GAME_STATE.SHOW_DECK && <Redirect push to={`/deck/${deckInfo.title.toLowerCase()}`} />}
      {gameState === GAME_STATE.DURING_GAME && <Redirect push to={`/play/${deckInfo.title.toLowerCase()}`} />}
      {gameState === GAME_STATE.POST_GAME && <Redirect to='/' />}
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/deck" component={FullDeckRoute} />
        <Route path="/play" component={GamePlayRoute} />
        <Route component={Four0Four} />
      </Switch>
    </BrowserRouter>
  )
}

function mapStateToProps (state) {
  return {
    gameState: state.gameState,
    deckInfo: state.deckInfo
  }
}

export default connect(mapStateToProps)(App)
