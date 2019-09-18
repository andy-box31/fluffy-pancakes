import React from 'react'
import { connect } from 'react-redux'
import Card from '../Card/Card'
import './FullDeck.css'

const FullDeck = ({cards}) => {
  return <div className="fullDeckOuter">
    {cards.map((card) => {
      return (
        <div key={card.Name} className="cardWrapper">
          <Card params={card} />
        </div>
      )
    })}
  </div>
}

function mapStateToProps (state) {
  return {
    cards: state.cards
  }
}

export default connect(mapStateToProps)(FullDeck)
