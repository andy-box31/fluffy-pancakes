import React from 'react'
import { connect } from 'react-redux'
import { setPlaymode } from '../../actions/index'
import { PLAY_MODE } from '../../utilities/constants'
import './PlaymodeSelector.css'

class PlaymodeSelector extends React.Component{
  constructor (props) {
    super(props)

    this.handlePlaymodeSelection = this.handlePlaymodeSelection.bind(this)
  }

  handlePlaymodeSelection (e) {
    this.props.setPlaymode(e.target.value)
  }

  render () {
    return <div className="PlaymodeSelector">
    {Object.keys(PLAY_MODE).map((mode, i) => {
      return (
        <label className="selectionElement" key={mode}>
          <input
            type="radio"
            name="playmodeSelection"
            value={mode}
            onChange={this.handlePlaymodeSelection}
            checked={this.props.playmode === mode}
          /> {PLAY_MODE[mode]}
        </label>
      )
    })}
  </div>
  }
}

function mapStateToProps (state) {
  return { 
    playmode: state.playmode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPlaymode: (mode) => dispatch(setPlaymode(mode))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaymodeSelector)
