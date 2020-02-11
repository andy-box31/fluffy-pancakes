import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
import battleEngine from '../../utilities/battleEngine'
import vpSetter from '../../utilities/viewportHeightSetter'
import decks from '../../utilities/decks'
import { goBattle, dealCards, getCards } from '../../actions/index'
import { PLAYERS, GAME_LEVEL } from '../../utilities/constants'
import CardStack from '../CardStack/CardStack'
import TheMiddle from '../TheMiddle/TheMiddle'
import './GamePlay.css'

class GamePlayComputer extends React.Component {
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
    this.tryInitBattleEngine()

    if (decks.includes(this.props.match.params.deck) && // there is a deck name in the URL
        (!this.props.deckInfo.title || // the deckInfo has not been set
          this.props.match.params.deck != this.props.deckInfo.title.toLowerCase()) // the deckinfo does not match the URL
        ) {
      this.props.getCards(this.props.match.params.deck, () => {
        if (!!this.props.deckInfo.title && // deckinfo has been set
            (this.props.match.params.deck === this.props.deckInfo.title.toLowerCase()) // it matches the URL
          ) {
          this.props.dealCards()
          this.tryInitBattleEngine()
        }
      })
    }
  }

  componentDidUpdate () {
    this.checkPauseForComputer()
  }

  // init the battle engine if we have not already
  tryInitBattleEngine () {
    if (this.battleEngine === null &&
      this.props.cards.length > 0 &&
      this.props.deckInfo.competeOn.length > 0) {
      this.battleEngine = new battleEngine(this.props.cards, this.props.deckInfo, GAME_LEVEL.GT_MEDIAN)
    }
  }

    // pauseForComputer is to simulate "computer thinking time" which allows the player to inspect her own card before the computer turn, otherwise the computer turn would seem instant and the player would know if they win or lose their card before even seeing what their card is.
  checkPauseForComputer () {
    if (!this.state.pauseForComputer &&
      this.props.activePlayer === PLAYERS.PLAYER_2 && // computer player
      !this.state.revealCards &&
      !this.props.winner)
    {
      this.setState({pauseForComputer: true})
    }
  }

  handleSelection (e) {
    if (this.props.activePlayer === PLAYERS.PLAYER_2) { return }
    this.setState({revealCards: true, target: e.target, pick: e.target.value})
  }

  endRevealCards () {
    let newState = {revealCards: false}
    if (this.props.activePlayer === PLAYERS.PLAYER_2) {
      this.dispatchBattle(this.state.pick)
      newState.pauseForComputer = true
      newState.pick = undefined
    } else {
      this.dispatchBattle(this.state.target.value)
      this.state.target.checked = false
      newState.target = undefined
      newState.pick = undefined
    }
    this.setState(newState)
  }

  endPauseForComputer () {
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
    const { hand1Cards, hand2Cards, activePlayer, deckInfo, match } = this.props
    const { revealCards, pauseForComputer, pick } = this.state
    const isPlayer1 = activePlayer === PLAYERS.PLAYER_1
    const isPlayer2 = activePlayer === PLAYERS.PLAYER_2
    const showCard1 = true
    const showCard2 = revealCards
    const readOnlyCard1 = (revealCards || isPlayer2)
    const readOnlyCard2 = true 
    let winLoseTie = (() => {
      if(pick && (hand1Cards[0][pick] === hand2Cards[0][pick])) {
        return `Tie, cards to the middle`
      } else {
        if(pick && (hand1Cards[0][pick] > hand2Cards[0][pick])) {
          return `Player 1 takes it`
        } else {
          return `Player 2 takes it`
        }
      }
    })()

    const backgroundImage = { backgroundImage: `url(${deckInfo.backgroundImage})` }
    isPlayer2 ? backgroundImage.transform = "rotate(-35deg)" : () => {}

    return (
      (!decks.includes(match.params.deck)) ? ( <Redirect push to="/" /> ) : (
        (!hand1Cards || hand1Cards.length < 1) ? <p>Waiting for {match.params.deck}</p> :
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
              {!revealCards && isPlayer1 &&
                <p><span className="standOut">{activePlayer}</span> take your turn!</p>
              }
              {isPlayer2 && pauseForComputer &&
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
                  <p className="smaller">{winLoseTie}</p>
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
    activePlayer: state.activePlayer,
    winner: state.winner,
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goBattle: (args) => dispatch(goBattle(args)),
    dealCards: () => dispatch(dealCards()),
    getCards: (val, cb)=> dispatch(getCards(val, cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayComputer)
