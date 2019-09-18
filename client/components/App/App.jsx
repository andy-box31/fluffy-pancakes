import React from 'react'
import { connect } from 'react-redux'
import { GAME_STATE } from '../../utilities/constants'
import Splash from '../Splash/Splash'
import GamePlay from '../GamePlay/GamePlay'
import FullDeck from '../FullDeck/FullDeck'

const App = ({gameState}) => {
  return (
    <React.Fragment>
      {(gameState === GAME_STATE.PRE_GAME || gameState === GAME_STATE.POST_GAME) &&
        <Splash />
      }
      {(gameState === GAME_STATE.SHOW_DECK) &&
        <FullDeck />
      }
      {gameState === GAME_STATE.DURING_GAME && 
        <GamePlay />
      }
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    gameState: state.gameState
  }
}

export default connect(mapStateToProps)(App)
