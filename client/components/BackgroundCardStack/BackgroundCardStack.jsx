import React from 'react'
import classNames from 'classnames'
import './BackgroundCardStack.css'

const BackgroundCardStack = ({count, back}) => {
  let underCards  = []
  let rotateStyle = {
    transform: "rotate(-3deg)"
  }
  for(let i=0; (i<count && i<7); i++){ // 7 is plenty lets not polute the DOM too much :|
    let degrees = Math.random()*6-3
    rotateStyle = { transform: `rotate(${degrees}deg)` }
    underCards.push(<div key={i} style={rotateStyle} className={classNames({glbFullAbsolute: true, underCard: true, backside: back})} />)
  }
  return <React.Fragment>
          {underCards}
        </React.Fragment>
}

export default BackgroundCardStack
