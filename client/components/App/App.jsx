import React from 'react'
import { connect } from 'react-redux'
import Api from '../../services/api'
import { connect } from 'react-redux'
import { getCards, dealCards } from '../../actions/index'
import Card from '../Card/Card'
import PreviewCard from '../PreviewCard/PreviewCard'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super (props)
    this.handleSelection = this.handleSelection.bind(this)
    this.dealCards = this.dealCards.bind(this)
  }

  componentDidMount(){
    // This action is intercepted by the sagas middleware which fires setCards action.
    this.props.getCards()
  }

  dealCards () {
    console.log('call deal')
    this.props.dealCards(this.props.cards)
  }

  handleSelection (args) {
    console.log('args', args)
  }

  render () {
    const { name, cards, hand1Cards, hand2Cards, shuffledCards } = this.props
    if (cards) {
      let shuffled = <p>shuffled</p>
      let hand1 = <p>hand1</p>
      let hand2 = <p>hand2</p>
      if(shuffledCards) {
          shuffled = (<ul className="previewList">
            {shuffledCards.map((card) => <li key={card.Name}><PreviewCard params={{name: card.Name}}></PreviewCard></li>)}
          </ul>)
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
      const preview = (<ul className="previewList">
        {cards.map((card) => <li key={card.Name}><PreviewCard params={card} /></li>)}
      </ul>)
      const card = cards[1]
      return (
      <React.Fragment>
        <h1>Yo, {name}</h1>
        {cards.length > 0 && <Card params={card} onSubmit={this.handleSelection} />}
        {preview}
        <button type="button" onClick={this.dealCards}>deal</button>
        {shuffled}
        {hand1}
        {hand2}
      </React.Fragment>
      )
    } //else
    return <h1>Yo, {name}</h1>
  }
}

const mapStateToProps = state => {
  return { 
    cards: state.cards,
    shuffledCards: state.shuffledCards,
    hand1Cards: state.hand1Cards,
    hand2Cards: state.hand2Cards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCards: () => dispatch(getCards()),
    dealCards: (cards) => dispatch(dealCards(cards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
