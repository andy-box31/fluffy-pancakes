import React from 'react'
import { connect } from 'react-redux'
import './Card.css'

const Card = ({params, onSubmit, attrs, readOnly}) => {
  const details = Object.keys(params).map((key, i) => {
    if (!attrs.includes(key)){
      return
    }
    if (readOnly) {
      return <p className="cardChoice" key={key}> {key}: {params[key]} </p> //TODO should be a list
    }
    return (
      <label key={key} className="cardChoice">
        <input
          type="radio"
          name="selection"
          value={key}
          onChange={onSubmit}
        /> {key}: {params[key]}
      </label>
    )
  })

  const backgroundImage = !!params.Image ? {
    backgroundImage: `url(${params.Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  } : {}
  const rand = Math.random()*3 - 2
  const cardRotate = {
    transform: `rotate(${rand}deg)`
  }
  return (
    <div className="card" style={cardRotate}>
      <header style={backgroundImage} className="cardHeader">
        <h1 className="cardTitle">
          {params.Name ? params.Name : 'Card info'}
        </h1>
      </header>
      <div className="cardContent">
        {details}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return { attrs: state.deckInfo.competeOn }
}

export default connect(mapStateToProps)(Card)
