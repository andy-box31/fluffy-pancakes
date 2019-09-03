import React from 'react'
import { connect } from 'react-redux'
import { dealCards, getCards } from '../../actions/index'
import Navigation from '../Navigation/Navigation'
import RadioSelector from '../RadioSelector/RadioSelector'
import './Splash.css'

const Splash = ({dealCards, getCards, winner = null}) => {
  const [deckChoice, updateChoice] = React.useState(false)

  const handleSelect = (e) => {
    updateChoice(e.target.value)
    getCards(e.target.value)
  }

  return (
    <div className="splash">
      <header className="header">
        <h1>Trumps</h1>
        {winner && <h3>WOOP WOOP {winner} Wins</h3>}
        <Navigation />
      </header>
      <main className="mainContent">
        <RadioSelector
          params={['transformers', 'transformersShort', 'dinosaurs']}
          name="deckSelection"
          handleChange={handleSelect}
          activeParam={deckChoice}
        />
        <button type="button" className="dealBtn" onClick={dealCards}>deal</button>
      </main>
    </div>
  )
}


function mapStateToProps (state) {
  return { winner: state.winner }
}

function mapDispatchToProps(dispatch) {
  return {
    dealCards: () => dispatch(dealCards()),
    getCards: (choice) => dispatch(getCards(choice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
