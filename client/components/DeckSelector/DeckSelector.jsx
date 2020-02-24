import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCards } from '../../actions/index'
import RadioSelector from '../RadioSelector/RadioSelector'
import decks from '../../utilities/decks'
import './DeckSelector.css'

const DeckSelector = ({ getCards }) => {
  const [deckChoice, updateChoice] = React.useState(false)

  const handleSelect = (e) => {
    updateChoice(e.target.value)
    getCards(e.target.value)
  }
  // remove debugging deck
  const filteredDecks = decks.filter(deck => !(deck === 'short'))
  return (
    <RadioSelector
      params={filteredDecks}
      name='deckSelection'
      handleChange={handleSelect}
      activeParam={deckChoice}
    />
  )
}

DeckSelector.propTypes = {
  getCards: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    getCards: (choice) => dispatch(getCards(choice))
  }
}

export default connect(null, mapDispatchToProps)(DeckSelector)
