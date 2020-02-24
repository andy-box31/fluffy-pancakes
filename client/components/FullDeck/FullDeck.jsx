import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { sortAlphabetical, sortAlphabeticalInverse } from '../../utilities/other'
import decks from '../../utilities/decks'
import { getCards } from '../../actions/index'
import DeckSelect from '../DeckSelect/DeckSelect'
import Card from '../Card/Card'
import './FullDeck.css'

const FullDeck = ({ cards, info, match, getCards }) => {
  if (decks.includes(match.params.deck) && (!info.title || match.params.deck !== info.title.toLowerCase())) {
    getCards(match.params.deck)
  }

  const [shownCards, updateCards] = React.useState(cards)
  const [isChanged, updateChanged] = React.useState(false)
  const [orderLowHigh, updateOrder] = React.useState(true)
  const [currentFilter, updateFilter] = React.useState('all')
  const [currentSort, updateSort] = React.useState('Name')

  React.useEffect(() => {
    if (isChanged) { callUpdates() }
  })

  const callUpdates = () => {
    updateChanged(false)
    doSort(currentSort)
  }

  if (shownCards.length === 0 && cards.length > 0) {
    updateCards(cards)
  }

  let filters = new Set()
  for (const card of cards) {
    filters.add(card.Type)
  }

  const handleFilter = (e) => {
    let newShownCards = e.target.value === 'all' ? cards : cards.filter((card) => card.Type === e.target.value)
    updateCards(newShownCards)
    updateFilter(e.target.value)
    updateChanged(true)
  }

  const handleSort = (e) => {
    doSort(e.target.value)
  }

  const doSort = (val) => {
    updateSort(val)
    let newShownCards
    if (orderLowHigh) {
      newShownCards = val === 'Name' ? shownCards.sort(sortAlphabetical) : shownCards.sort((a, b) => a[val] - b[val])
    } else {
      newShownCards = val === 'Name' ? shownCards.sort(sortAlphabeticalInverse) : shownCards.sort((a, b) => b[val] - a[val])
    }
    updateCards(newShownCards)
  }

  return (
    (cards.length < 1 && !decks.includes(match.params.deck)) ? (<Redirect push to='/' />) : (
      <div className='fullDeckOuter'>
        <header className='fullDeckHeader'>
          <DeckSelect
            title='Filter'
            initial='all'
            currentValue={currentFilter}
            handleChange={handleFilter}
            options={[...filters]}
          />
          <DeckSelect
            title='Sort'
            initial='Name'
            currentValue={currentSort}
            handleChange={handleSort}
            options={info.competeOn}
            handleToggle={() => { updateOrder(!orderLowHigh); updateChanged(true) }}
          />
        </header>
        <main className='fullDeckMain'>
          {/* don't use ternaries like this */}
          {cards.length < 1 ? <p>Waiting for {match.params.deck}</p>
            : shownCards.map((card) => {
              return (
                <div key={card.Name} className='cardWrapper'>
                  <Card params={card} />
                </div>
              )
            })}
        </main>
      </div>
    )
  )
}

FullDeck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  info: PropTypes.object,
  match: PropTypes.object,
  getCards: PropTypes.func
}

function mapStateToProps (state) {
  return {
    cards: state.cards,
    info: state.deckInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCards: (choice) => dispatch(getCards(choice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullDeck)
