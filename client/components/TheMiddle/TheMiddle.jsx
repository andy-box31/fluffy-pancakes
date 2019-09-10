import React from 'react'
import './TheMiddle.css'

// TODO get prop directly from redux istead of passed through GamePlay
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

export default TheMiddle
