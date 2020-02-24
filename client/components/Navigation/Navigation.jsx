import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GAME_LEVEL } from '../../utilities/constants'
import { setGameLevel } from '../../actions/index'
import PlaymodeSelector from '../PlaymodeSelector/PlaymodeSelector'
import RadioSelector from '../RadioSelector/RadioSelector'
import classNames from 'classnames'
import './Navigation.css'

const Navigation = ({ gameLevel, setGameLevel, deck }) => {
  const [menuOpen, toggleMenu] = React.useState(false)

  const handleToggle = () => {
    toggleMenu(!menuOpen)
  }

  const gameLevelSelection = (e) => {
    setGameLevel(e.target.value)
  }

  return (
    <div className={classNames({ menu: true, open: menuOpen })}>
      <button type='button' className='icon settings' onClick={handleToggle}>toggle</button>
      {menuOpen && (
        <nav>
          <PlaymodeSelector />
          <hr />
          <h4 className='sectionTitle'>Difficulty</h4>
          <RadioSelector
            params={Object.keys(GAME_LEVEL)}
            name='gameLevelSelection'
            handleChange={(gameLevelSelection)}
            activeParam={gameLevel}
          />
          <hr />
          {deck && <NavLink className='glbBtn viewCardsBtn' to={`/deck/` + deck.toLowerCase()}>Deck</NavLink>}
        </nav>
      )}
    </div>
  )
}

Navigation.propTypes = {
  gameLevel: PropTypes.string,
  setGameLevel: PropTypes.func,
  deck: PropTypes.string
}

function mapStateToProps (state) {
  return {
    gameLevel: state.gameLevel,
    deck: state.deckInfo.title
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setGameLevel: (value) => dispatch(setGameLevel(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
