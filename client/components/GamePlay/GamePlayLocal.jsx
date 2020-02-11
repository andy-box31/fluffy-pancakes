import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
import vpSetter from '../../utilities/viewportHeightSetter'
import decks from '../../utilities/decks'
import { goBattle, dealCards, getCards } from '../../actions/index'
import { PLAYERS } from '../../utilities/constants'
import CardStack from '../CardStack/CardStack'
import TheMiddle from '../TheMiddle/TheMiddle'
import './GamePlay.css'

class GamePlayLocal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      turnCount: 0,
      revealCards: false,
      target: undefined,
      pick: undefined
    }
    this.handleSelection = this.handleSelection.bind(this)
    this.endRevealCards = this.endRevealCards.bind(this)
  }

  componentDidMount () {
    vpSetter()

    if( decks.includes(this.props.match.params.deck) &&
      (!this.props.deckInfo.title ||
        this.props.match.params.deck != this.props.deckInfo.title.toLowerCase())
      ) {
      this.props.getCards(this.props.match.params.deck, () => {
        if (!!this.props.deckInfo.title &&
          (this.props.match.params.deck === this.props.deckInfo.title.toLowerCase())) {
          this.props.dealCards()
        }
      })
    }
  }

  handleSelection (e) {
    this.setState({revealCards: true, target: e.target, pick: e.target.value})
  }

  endRevealCards () {
    this.dispatchBattle(this.state.target.value)
    this.state.target.checked = false

    this.setState({
      revealCards: false,
      target: undefined,
      pick: undefined
    })
  }

  dispatchBattle (pick) {
    this.props.goBattle(pick)
    this.setState(prevState => {
      return {turnCount: prevState.turnCount + 1}
    })
  }

  render () {
    const { hand1Cards, hand2Cards, activePlayer, deckInfo, match } = this.props
    const { revealCards, pick } = this.state

    const isPlayer1 = activePlayer === PLAYERS.PLAYER_1
    const isPlayer2 = activePlayer === PLAYERS.PLAYER_2
    const showCard1 = revealCards || isPlayer1
    const showCard2 = revealCards || isPlayer2

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
    
    const backgroundImage = {
      backgroundImage: `url(${deckInfo.backgroundImage})`
    }
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
                readOnly={revealCards}
                showCard={showCard1}
                stackSize={hand1Cards.length - 1}
              />
            </div>
            <div className="infoTop">
              <header>
                <h1>Trumps</h1>
              </header>
              {!revealCards &&
                <p><span className="standOut">{activePlayer}</span> take your turn!</p>
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
                readOnly={revealCards}
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

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayLocal)
