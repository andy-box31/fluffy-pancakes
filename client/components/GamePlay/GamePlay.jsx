import React from 'react'
import { connect } from 'react-redux'
import { PLAY_MODE } from '../../utilities/constants'
import GamePlayLocal from './GamePlayLocal'
import GamePlayComputer from './GamePlayComputer'

const GamePlay = (props) => {
  return <React.Fragment>
    {props.playmode === PLAY_MODE.VS_COMPUTER && <GamePlayComputer {...props} />}
    {props.playmode === PLAY_MODE.VS_LOCAL && <GamePlayLocal {...props} />}
    </React.Fragment>
}

function mapStateToProps (state) {
  return { 
    playmode: state.playmode
  }
}
export default connect(mapStateToProps, null)(GamePlay)
