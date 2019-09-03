import React from 'react'
import { connect } from 'react-redux'
import { GAME_LEVEL } from '../../utilities/constants'
import { setGameLevel } from '../../actions/index'
import PlaymodeSelector from '../PlaymodeSelector/PlaymodeSelector'
import RadioSelector from '../RadioSelector/RadioSelector'
import classNames from 'classnames'
import './Navigation.css'

const Navigation = ({gameLevel, setGameLevel}) => {
  const [menuOpen, toggleMenu] = React.useState(false)

  const handleToggle = () => {
    toggleMenu(!menuOpen)
  }

  const handleGameLevelSelection = (e) => {
    setGameLevel(e.target.value)
  }

  return (
    <div className={classNames({
      menu: true,
      open: menuOpen
    })} >
      <button type="button" className="icon settings" onClick={handleToggle}>toggle</button>
      {menuOpen && <nav>
        <PlaymodeSelector />
        <hr />
        <h4>difficulty</h4>
        <RadioSelector
          params={Object.keys(GAME_LEVEL)}
          name="gameLevelSelection"
          handleChange={(handleGameLevelSelection)}
          activeParam={gameLevel}
        />

      </nav>
      }
    </div>
  )
}

function mapStateToProps (state) {
  return { 
    gameLevel: state.gameLevel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameLevel: (value) => dispatch(setGameLevel(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)