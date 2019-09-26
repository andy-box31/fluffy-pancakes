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

  const [shownCards, updateCards] = React.useState(cards)
  const [isChanged, updateChanged] = React.useState(false)
  const [currentFilter, updateFilter] = React.useState('all')
  const [currentSort, updateSort] = React.useState('Name')

  React.useEffect(() => {
    if(isChanged){
      callUpdates()
    }
  })

  const callUpdates = () => {
    updateChanged(false)
    doSort(currentSort)
  }

  if(shownCards.length === 0 && cards.length > 0){
    updateCards(cards)
  }

  let filters = new Set()
  for(const card of cards){
    filters.add(card.Type)
  }

  let filterOptions = []
  for (const option of filters.values()){
    filterOptions.push(<option value={option} key={option}>{option}</option>)
  }

  let attributes = info.competeOn

  let sortOptions = []
  for (const option of filters.values()){
    sortOptions.push(<option value={option} key={option}>{option}</option>)
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
  const sortAlpha = (a,b) => {
    return (a.Name > b.Name) ? 1 : -1
  }

  const doSort = (val) => {
    updateSort(val)
    let newShownCards = val === 'Name' ? shownCards.sort(sortAlpha) : shownCards.sort((a, b) => a[val] - b[val])
    updateCards(newShownCards)
  }

  return (
    (cards.length < 1 && !decks.includes(match.params.deck)) ? ( <Redirect push to="/" /> ) : (
      <div className="fullDeckOuter">
        <header>
          <div className='deckFilterOuter'>
            <label>
              Filter cards:
              <select value={currentFilter} onChange={handleFilter}>
              <option value="all">all</option>
                {filterOptions}
              </select>
            </label>
          </div>
          <div className='deckSortOuter'>
            <label>
              Sort cards:
              <select value={currentSort} onChange={handleSort}>
              <option value="Name">Name</option>
                {attributes.map((attr) => <option value={attr} key={attr}>{attr}</option>)}
              </select>
            </label>
          </div>
        </header>
        {cards.length < 1 ? <p>Waiting for {match.params.deck}</p> :
          shownCards.map((card) => {
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
