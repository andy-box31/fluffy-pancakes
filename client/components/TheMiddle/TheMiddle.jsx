import React from 'react'
import { connect } from'react-redux'
import './TheMiddle.css'

const TheMiddle = ({theMiddle}) => {
  const rand = Math.floor(Math.random()*25) - 15
  let middleRandomRotate = {
    transform: `rotate(${rand}deg)`
  }
  return (
    <React.Fragment>
      {theMiddle.length > 0 &&
        <div className="theMiddle" style={middleRandomRotate}>
          <p>{theMiddle.length}</p>
        </div>
      }
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return { theMiddle: state.theMiddle }
}

export default connect(mapStateToProps)(TheMiddle)
