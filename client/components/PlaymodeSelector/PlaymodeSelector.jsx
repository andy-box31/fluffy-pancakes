import React from 'react'
import { connect } from 'react-redux'
import { setPlaymode } from '../../actions/index'
import { PLAY_MODE } from '../../utilities/constants'
import RadioSelector from '../RadioSelector/RadioSelector'
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
      <h4>Playmode</h4>
      <RadioSelector
        params={Object.keys(PLAY_MODE)}
        name="playmodeSelection"
        handleChange={this.handlePlaymodeSelection}
        activeParam={this.props.playmode}
      />
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
