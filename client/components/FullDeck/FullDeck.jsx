import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import decks from '../../utilities/decks'
import { getCards } from '../../actions/index'
import Card from '../Card/Card'
import './FullDeck.css'

const FullDeck = ({cards, info, match, getCards}) => {
  if( decks.includes(match.params.deck) && (!info.title || match.params.deck != info.title.toLowerCase()) ) {
    getCards(match.params.deck)
  }
  return (
    (cards.length < 1 && !decks.includes(match.params.deck)) ? ( <Redirect push to="/" /> ) : (
      <div className="fullDeckOuter">
        {cards.length < 1 ? <p>Waiting for {match.params.deck}</p> :
          cards.map((card) => {
            return (
              <div key={card.Name} className="cardWrapper">
                <Card params={card} />
              </div>
            )
          })}
      </div>
    )
  )
}

FullDeck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
}

function mapStateToProps (state) {
  return {
    cards: state.cards,
    info: state.deckInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCards: (choice) => dispatch(getCards(choice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullDeck)
