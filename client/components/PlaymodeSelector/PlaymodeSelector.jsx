import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setPlaymode } from '../../actions/index'
import { PLAY_MODE } from '../../utilities/constants'
import RadioSelector from '../RadioSelector/RadioSelector'
import './PlaymodeSelector.css'

class PlaymodeSelector extends React.Component {
  constructor (props) {
    super(props)
    this.playmodeSelection = this.playmodeSelection.bind(this)
  }

  playmodeSelection (e) {
    this.props.setPlaymode(e.target.value)
  }

  render () {
    return (
      <div className='playmodeSelector'>
        <h4 className='sectionTitle'>Playmode</h4>
        <RadioSelector
          params={Object.keys(PLAY_MODE)}
          name='playmodeSelection'
          handleChange={this.playmodeSelection}
          activeParam={this.props.playmode}
        />
      </div>
    )
  }
}

PlaymodeSelector.propTypes = {
  playmode: PropTypes.string,
  setPlaymode: PropTypes.func
}

function mapStateToProps (state) {
  return {
    playmode: state.playmode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPlaymode: (mode) => dispatch(setPlaymode(mode))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaymodeSelector)
