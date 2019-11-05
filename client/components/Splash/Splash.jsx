import React from 'react'
import { connect } from 'react-redux'
import { dealCards, showDeck } from '../../actions/index'
import { GAME_STATE } from '../../utilities/constants'
import Navigation from '../Navigation/Navigation'
import DeckSelector from '../DeckSelector/DeckSelector'
import './Splash.css'

const Splash = ({showDeck, dealCards, cards, gameState, winner = null}) => {
  return (
    <div className="splash">
      <div className="poly">
        <h1>TRUMPS</h1>
      </div>
      <header className="header">
        <h1>TRUMPS</h1> 
        <Navigation showDeck={showDeck}/>
      </header>
      <main className="mainContent">
        {winner && <h3>WOOP WOOP {winner} Wins</h3>}
        <DeckSelector />
        <button
          type="button"
          className="glbBtn"
          disabled={cards.length === 0 || gameState === GAME_STATE.DURING_GAME} // TODO - something better for weird condition when user clicks backbutton,
          onClick={dealCards}>Deal</button>
        <button
          type="button"
          className="glbBtn"
          disabled={cards.length === 0 || gameState === GAME_STATE.SHOW_DECK} // TODO - something better for weird condition when user clicks backbutton
          onClick={showDeck}>
            Full deck
          </button>
      </main>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    winner: state.winner,
    cards: state.cards,
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dealCards: () => dispatch(dealCards()),
    showDeck: () => dispatch(showDeck())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
