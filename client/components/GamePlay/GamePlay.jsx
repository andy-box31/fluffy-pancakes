import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import classNames from 'classnames'
import battleEngine from '../../utilities/battleEngine'
import vpSetter from '../../utilities/viewportHeightSetter'
import { goBattle } from '../../actions/index'
import { PLAY_MODE, PLAYERS, GAME_LEVEL, GAME_STATE } from '../../utilities/constants'
import CardStack from '../CardStack/CardStack'
import TheMiddle from '../TheMiddle/TheMiddle'
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
    vpSetter()
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
    const { hand1Cards, hand2Cards, activePlayer, playmode, deckInfo, gameState } = this.props
    const { revealCards, pauseForComputer, pick } = this.state

    const isPlayer1 = activePlayer === PLAYERS.PLAYER_1
    const isPlayer2 = activePlayer === PLAYERS.PLAYER_2
    const isVsComputer = playmode === PLAY_MODE.VS_COMPUTER
    const isVsLocal = playmode === PLAY_MODE.VS_LOCAL

    const showCard1 = (revealCards || isPlayer1 || (isPlayer2 && isVsComputer))
    const showCard2 = (revealCards || (isPlayer2 && isVsLocal))
    const readOnlyCard1 = (revealCards || isPlayer2)
    const readOnlyCard2 = (isVsComputer || revealCards || isPlayer1)

    let winLoseTie
    if(pick && (hand1Cards[0][pick] === hand2Cards[0][pick])) {
      winLoseTie = <p className="smaller">Tie, cards to the middle</p>
    }else {
      if(pick && (hand1Cards[0][pick] > hand2Cards[0][pick])) {
        winLoseTie = <p className="smaller">Player 1 takes it</p>
      } else {
        winLoseTie = <p className="smaller">Player 2 takes it</p>
      }
    }
    
    const backgroundImage = {
      backgroundImage: `url(${deckInfo.backgroundImage})`
    }
    isPlayer2 ? backgroundImage.transform = "rotate(-35deg)" : () => {}
    return (
      (gameState != GAME_STATE.DURING_GAME) ? ( <Redirect push to="/" /> ) : (
      <div className={classNames({
        outer: true,
        player1: isPlayer1,
        player2: isPlayer2
      })}>
        <div className="glbFullFixed outerBackground" style={backgroundImage}></div>
        <div className="grid">
          <div className="p1Outer">
            <CardStack
              params={hand1Cards[0]}
              onSubmit={this.handleSelection}
              readOnly={readOnlyCard1}
              showCard={showCard1}
              stackSize={hand1Cards.length - 1}
            />
          </div>
          <div className="infoTop">
            <header>
              <h1>Trumps</h1>
            </header>
            {!revealCards && (!isVsComputer || isPlayer1) &&
              <p><span className="standOut">{activePlayer}</span> take your turn!</p>
            }
            {isVsComputer && isPlayer2 && pauseForComputer &&
              <React.Fragment>
                <p>She's thinking..... </p>
                <button type="button" className="glbFullAbsolute fullPageButton" onClick={this.endPauseForComputer}>Continue</button>
              </React.Fragment>
            }
            {revealCards &&
              <button type="button" className="glbFullAbsolute fullPageButton" onClick={this.endRevealCards}>Next</button>
            }
            {!!pick &&
              <div>
                <p>{pick}</p>
                <p className="scores"><span className="score">{hand1Cards[0][pick]}</span> <span className="versus">VS</span> <span className="score">{hand2Cards[0][pick]}</span></p>
                {winLoseTie}
              </div>
            }
          </div>
          <div className="p2Outer">
            <CardStack
              params={hand2Cards[0]}
              onSubmit={this.handleSelection}
              readOnly={readOnlyCard2}
              showCard={showCard2}
              stackSize={hand2Cards.length - 1}
            />
          </div>
          <div className="infoBottom">
            <p className="cardScores"><span className="score">{hand1Cards.length}</span> <span className="versus">VS</span> <span className="score">{hand2Cards.length}</span></p>
            <TheMiddle />
          </div>
        </div>
      </div>
    )
    )}
}

function mapStateToProps (state) {
  return { 
    cards: state.cards,
    deckInfo: state.deckInfo,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards,
    playmode: state.playmode,
    activePlayer: state.activePlayer,
    winner: state.winner,
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goBattle: (args) => dispatch(goBattle(args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
