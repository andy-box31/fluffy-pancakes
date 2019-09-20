import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GAME_STATE } from '../../utilities/constants'
import Card from '../Card/Card'
import './FullDeck.css'

const FullDeck = ({cards}) => {
  return (
    (cards.length < 1) ? ( <Redirect push to="/" /> ) : (
      <div className="fullDeckOuter">
        {cards.map((card) => {
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
    cards: state.cards
  }
}

export default connect(mapStateToProps)(FullDeck)
