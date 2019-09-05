import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import battleEngine from '../../utilities/battleEngine'
import { goBattle } from '../../actions/index'
import { PLAY_MODE, PLAYERS,  GAME_LEVEL } from '../../utilities/constants'
import Card from '../Card/Card'
import './GamePlay.css'

class GamePlay extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      turnCount: 0,
      pauseForComputer: false,
      revealCards: false,
      target: undefined,
      pick: undefined
    }
    this.battleEngine = null
    this.handleSelection = this.handleSelection.bind(this)
    this.endPauseForComputer = this.endPauseForComputer.bind(this)
    this.endRevealCards = this.endRevealCards.bind(this)
  }

  componentDidMount () {
    this.checkPauseForComputer()
    if (this.battleEngine === null && this.props.cards.length > 0 && this.props.deckInfo.competeOn.length > 0) {
      this.battleEngine = new battleEngine(this.props.cards, this.props.deckInfo, GAME_LEVEL.GT_MEDIAN)
    }
  }

  componentDidUpdate() {
    this.checkPauseForComputer()
    
  }

  checkPauseForComputer () {
    if (!this.state.pauseForComputer && !this.state.revealCards && this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_2 && !this.props.winner) {
      this.setState({pauseForComputer: true})
    }
  }

  handleSelection (e) {
    if (this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_2) {
      return
    }
    this.setState({revealCards: true, target: e.target, pick: e.target.value})
  }

  endRevealCards () {
    let newState = {revealCards: false}
    if (this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_2) {
      this.dispatchBattle(this.state.pick)
      newState.pauseForComputer = true
      newState.pick = undefined
    } else if (this.props.playmode === PLAY_MODE.VS_LOCAL || (this.props.playmode === PLAY_MODE.VS_COMPUTER && this.props.activePlayer === PLAYERS.PLAYER_1)){
      this.dispatchBattle(this.state.target.value)
      this.state.target.checked = false
      newState.target = undefined
      newState.pick = undefined
    }
    this.setState(newState)
  }

  endPauseForComputer () {
    if(this.props.playmode === PLAY_MODE.VS_LOCAL){
      // this shouldn't be possible but just in case
      return 
    }
    const attr = this.battleEngine.selectAttribute(this.props.hand2Cards[0])
    this.setState({pauseForComputer: false, revealCards: true, pick: attr})
  }

  dispatchBattle (pick) {
    this.props.goBattle(pick)
    this.setState(prevState => {
      return {turnCount: prevState.turnCount + 1}
    })
  }

  render () {
    const { hand1Cards, hand2Cards, activePlayer, theMiddle, playmode } = this.props
    const { revealCards, pauseForComputer, pick } = this.state

    const isPlayer1 = activePlayer === PLAYERS.PLAYER_1
    const isPlayer2 = activePlayer === PLAYERS.PLAYER_2
    const isVsComputer = playmode === PLAY_MODE.VS_COMPUTER
    const isVsLocal = playmode === PLAY_MODE.VS_LOCAL

    const showCard1 = (revealCards || isPlayer1 || (isPlayer2 && isVsComputer))
    const showCard2 = (revealCards || (isPlayer2 && isVsLocal))
    const readOnlyCard1 = (revealCards || isPlayer2)
    const readOnlyCard2 = (isVsComputer || revealCards || isPlayer1)
   
    return (
      <div className={classNames({
        outer: true,
        player1: isPlayer1,
        player2: isPlayer2
      })}>
        <div className="grid">
          <div className="p1Outer">
          {showCard1 &&
            <Card
              params={hand1Cards[0]}
              onSubmit={this.handleSelection}
              readOnly={readOnlyCard1}
            />
          }
          {!showCard1 && <div className="opponentCard" />}
          </div>
          <div className="info">
            Trumps
            {activePlayer}
            {theMiddle.length > 0 && <div className="theMiddle">{theMiddle.length}</div>}
            {isVsComputer && isPlayer2 && pauseForComputer && <button type="button" className="dealBtn" onClick={this.endPauseForComputer}>Continue</button>}
            {revealCards && <button type="button" className="dealBtn" onClick={this.endRevealCards}>Next</button>}
            {!!pick && <p>{pick} {hand1Cards[0][pick]} VS {hand2Cards[0][pick]}</p>}
            
          </div>
          <div className="p2Outer">

            {showCard2 &&
              <Card
                params={hand2Cards[0]}
                onSubmit={this.handleSelection}
                readOnly={readOnlyCard2}
              />
            }
            {!showCard2 && <div className="opponentCard" />}
          </div>
          <div className="score">
            {hand1Cards.length} VS
            {hand2Cards.length}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { 
    cards: state.cards,
    deckInfo: state.deckInfo,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards,
    playmode: state.playmode,
    activePlayer: state.activePlayer,
    theMiddle: state.theMiddle,
    winner: state.winner
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goBattle: (args) => dispatch(goBattle(args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
