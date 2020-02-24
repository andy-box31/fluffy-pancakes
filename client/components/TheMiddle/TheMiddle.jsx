import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './TheMiddle.css'

const TheMiddle = ({ theMiddle }) => {
  const rand = Math.floor(Math.random() * 25) - 15
  let middleRandomRotate = {
    transform: `rotate(${rand}deg)`
  }
  return (
    <>
      {theMiddle.length > 0 &&
        <div className='theMiddle' style={middleRandomRotate}>
          <p>{theMiddle.length}</p>
        </div>}
    </>
  )
}

TheMiddle.propTypes = {
  theMiddle: PropTypes.array
}

function mapStateToProps (state) {
  return { theMiddle: state.theMiddle }
}

export default connect(mapStateToProps)(TheMiddle)
