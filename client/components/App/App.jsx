import React from 'react'
import { connect } from 'react-redux'
import { getCards, dealCards, goBattle, setPlaymode } from '../../actions/index'
import { PLAY_MODE, PLAYERS } from '../../utilities/constants'
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
    this.dealCards = this.dealCards.bind(this)
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

  dealCards () {
    this.props.dealCards(this.props.cards)
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
    // TODO figure out which attribute to pick
    this.dispatchBattle('Size')
  }

  render () {
    const { name, cards, hand1Cards, hand2Cards, activePlayer, winner } = this.props
    if (cards) {
      let hand1, hand2, activeCard, victory
      let activeHand = activePlayer === PLAYERS.PLAYER_1 ? hand1Cards : hand2Cards
      if (winner) {
        victory = <h1>{winner} is the winner!</h1>
      } 
      if (hand1Cards) {
        hand1 = (<ul className="previewListLeft">
          {hand1Cards.map((card) => <li key={card.Name}><PreviewCard params={{name: card.Name}}></PreviewCard></li>)}
        </ul>)
      }
      if (hand2Cards) {
        hand2 = (<ul className="previewListRight">
          {hand2Cards.map((card) => <li key={card.Name}><PreviewCard params={{name: card.Name}}></PreviewCard></li>)}
        </ul>)
      }
      activeCard = <div className="reverseCard"></div>
      if (activeHand && activeHand.length > 0) {
        activeCard = <Card params={activeHand[0]} onSubmit={this.handleSelection} />
      }
      const preview = (<ul className="previewList">
        {cards.map((card) => <li key={card.Name}><PreviewCard params={card} /></li>)}
      </ul>)
      return (
      <React.Fragment>
        {victory}
        {!victory && (
          <div>
            <h1>{activePlayer}'s turn</h1>
            <PlaymodeSelector onSelect={this.handlePlaymodeSelection} />
            <button type="button" onClick={this.dealCards}>deal</button>
            <div className="flexOuter">
              <div className="flexCol">{hand1}</div>
              <div className="flexCol">
                {activeCard}
              </div>
              <div className="flexCol">{hand2}</div>
            </div>
            <div className="preview">
              {preview}
            </div>
          </div>
        )}
      </React.Fragment>
      )
    } //else
    return <h1>Yo, {name}</h1>
  }
}

function mapStateToProps (state) {
  return { 
    cards: state.cards,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards,
    playmode: state.playmode,
    activePlayer: state.activePlayer,
    winner: state.winner
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
