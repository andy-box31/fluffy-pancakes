import React from 'react'
import { connect } from 'react-redux'
import { getCards, dealCards, goBattle, setPlaymode } from '../../actions/index'
import { PLAY_MODE, PLAYERS, GAME_STATE } from '../../utilities/constants'
import Card from '../Card/Card'
import PreviewCard from '../PreviewCard/PreviewCard'
import PlaymodeSelector from '../PlaymodeSelector/PlaymodeSelector'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      turnCount: 0
    }
    this.handleSelection = this.handleSelection.bind(this)
    this.handlePlaymodeSelection = this.handlePlaymodeSelection.bind(this)
    this.handleDealCards = this.handleDealCards.bind(this)
  }

  componentDidMount(){
    // This action is intercepted by the sagas middleware which fires setCards action.
    this.props.getCards()
  }

  componentDidUpdate() {
    // if it's the computers turn then have computer take turn - SHOULD BE MOVED TO CORRECT LOCATION
    if (!this.props.winner && this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_2) {
      this.computerTurn()
    }
  }

  handlePlaymodeSelection (e) {
    this.props.setPlaymode(e.target.value)
  }

  handleSelection (e) {
    this.dispatchBattle(e.target.value)
    e.target.checked = false
  }

  handleDealCards () {
    this.props.dealCards(this.props.cards)
  }

  dispatchBattle (pick) {
    this.props.goBattle(pick)
    this.setState(prevState => {
      return {turnCount: prevState.turnCount + 1}
    })
  }

  computerTurn () {
    // TODO figure out which attribute to pick
    this.dispatchBattle('Size')
  }

  render () {
    const { name, hand1Cards, hand2Cards, activePlayer, winner, theMiddle, gameState } = this.props
    if (activePlayer) {
      let activeCard, victory, preGame
      let activeHand = activePlayer === PLAYERS.PLAYER_1 ? hand1Cards : hand2Cards
      if (winner) {
        victory = <h1>{winner} is the winner!</h1>
      }
      if (gameState === GAME_STATE.PRE_GAME) {
        preGame = <button type="button" onClick={this.handleDealCards}>deal</button>
      }
      activeCard = <div className="reverseCard"></div>
      if (activeHand && activeHand.length > 0) {
        activeCard = <Card params={activeHand[0]} onSubmit={this.handleSelection} />
      }
      return (
      <React.Fragment>
        {victory}
        {preGame}
        {false && <PlaymodeSelector onSelect={this.handlePlaymodeSelection} />}
        {gameState === GAME_STATE.DURING_GAME && (
          <div className="outer">
            <div className="active">
              {activeCard}
            </div>
            <div className="info">
              Trumps
              {activePlayer}
              {theMiddle.length > 0 && <div className="theMiddle">{theMiddle.length}</div>}
              
            </div>
            <div className="opponent">
              <div className="opponentCard"></div>
            </div>
            <div className="score">
              {hand1Cards.length} VS
              {hand2Cards.length}
            </div>
          </div>
        )}
      </React.Fragment>
      )
    } //else
    return <h1>Problem retrieving data :\ ... Wierd</h1>
  }
}

function mapStateToProps (state) {
  return { 
    cards: state.cards,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards,
    playmode: state.playmode,
    gameState: state.gameState,
    activePlayer: state.activePlayer,
    winner: state.winner,
    theMiddle: state.theMiddle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCards: () => dispatch(getCards()),
    dealCards: (cards) => dispatch(dealCards(cards)),
    goBattle: (args) => dispatch(goBattle(args)),
    setPlaymode: (mode) => dispatch(setPlaymode(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
