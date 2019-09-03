import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import battleEngine from '../../utilities/battleEngine'
import { getCards, goBattle } from '../../actions/index'
import { PLAY_MODE, PLAYERS, GAME_STATE, GAME_LEVEL } from '../../utilities/constants'
import Splash from '../Splash/Splash'
import Card from '../Card/Card'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      turnCount: 0,
      wait: false
    }
    this.battleEngine = null
    this.handleSelection = this.handleSelection.bind(this)
    this.continuePlay = this.continuePlay.bind(this)
  }

  componentDidUpdate() {
    // if it's the computers turn then have computer take turn - SHOULD BE MOVED TO CORRECT LOCATION
    if (!this.state.wait && !this.props.winner && this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_2) {
      this.setState({wait: true})
    }
    if (this.battleEngine === null && this.props.cards.length > 0 && this.props.deckInfo.competeOn.length > 0) {
      this.battleEngine = new battleEngine(this.props.cards, this.props.deckInfo, GAME_LEVEL.GT_MEDIAN)
    }
  }

  continuePlay () {
    this.setState({wait: false})
    this.computerTurn()
  }

  handleSelection (e) {
    this.dispatchBattle(e.target.value)
    e.target.checked = false
  }

  dispatchBattle (pick) {
    this.props.goBattle(pick)
    this.setState(prevState => {
      return {turnCount: prevState.turnCount + 1}
    })
  }

  computerTurn () {
    let activeHand = this.props.activePlayer === PLAYERS.PLAYER_1 ? this.props.hand1Cards : this.props.hand2Cards
    const attr = this.battleEngine.selectAttribute(activeHand[0])
    this.dispatchBattle(attr)
  }

  render () {
    const { hand1Cards, hand2Cards, activePlayer, theMiddle, gameState, playmode } = this.props
    if (true) {
      let activeCard
      let activeHand = activePlayer === PLAYERS.PLAYER_1 ? hand1Cards : hand2Cards
      if (activeHand && activeHand.length > 0) {
        activeCard = <Card params={activeHand[0]} onSubmit={this.handleSelection} readOnly={playmode === PLAY_MODE.VS_COMPUTER && activePlayer === PLAYERS.PLAYER_2} />
      }
      return (
      <React.Fragment>
        {(gameState === GAME_STATE.PRE_GAME || gameState === GAME_STATE.POST_GAME) &&
          <Splash />
        }
        {gameState === GAME_STATE.DURING_GAME && (
          <div className={classNames({
            outer: true,
            player1: activePlayer === PLAYERS.PLAYER_1,
            player2: activePlayer === PLAYERS.PLAYER_2
          })}>
            <div className="grid">
              <div className="active">
                {activeCard}
              </div>
              <div className="info">
                Trumps
                {activePlayer}
                {theMiddle.length > 0 && <div className="theMiddle">{theMiddle.length}</div>}
                {this.state.wait && <button type="button" onClick={this.continuePlay}>Continue</button>}
              </div>
              <div className="opponent">
                <div className="opponentCard"></div>
              </div>
              <div className="score">
                {hand1Cards.length} VS
                {hand2Cards.length}
              </div>
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
    deckInfo: state.deckInfo,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards,
    playmode: state.playmode,
    gameState: state.gameState,
    activePlayer: state.activePlayer,
    theMiddle: state.theMiddle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goBattle: (args) => dispatch(goBattle(args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
