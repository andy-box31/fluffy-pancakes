import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PLAY_MODE } from '../../utilities/constants'
import GamePlayLocal from './GamePlayLocal'
import GamePlayComputer from './GamePlayComputer'

const GamePlay = (props) => {
  return (
    <>
      {props.playmode === PLAY_MODE.VS_COMPUTER && <GamePlayComputer {...props} />}
      {props.playmode === PLAY_MODE.VS_LOCAL && <GamePlayLocal {...props} />}
    </>
  )
}

GamePlay.propTypes = {
  playmode: PropTypes.string
}

function mapStateToProps (state) {
  return {
    playmode: state.playmode
  }
}

export default connect(mapStateToProps, null)(GamePlay)
