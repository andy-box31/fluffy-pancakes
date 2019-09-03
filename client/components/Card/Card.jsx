import React from 'react'
import { connect } from 'react-redux'
import './Card.css'

const Card = ({params, onSubmit, attrs, readOnly}) => {
  const details = Object.keys(params).map((key, i) => {
    if (!attrs.includes(key)){
      return
    }
    if (readOnly) {
      return <p key={key}> {key}: {params[key]} </p> //TODO should be a list
    }
    return (
      <label key={key} className="cardRadio">
        <input
          type="radio"
          name="selection"
          value={key}
          onChange={onSubmit}
        /> {key}: {params[key]}
      </label>
    )
  })
  return (
    <div className="card">
      <header className="cardHeader">
        {params.Image && <img className="cardImage" src={params.Image} alt={`image of ${params.Name}`} /> }
        <h1 className="cardTitle">
          {params.Name ? params.Name : 'Card info'}
        </h1>
      </header>
      <div className="cardContent"></div>
      {details}
    </div>
  )
}

function mapStateToProps (state) {
  return { attrs: state.deckInfo.competeOn }
}

export default connect(mapStateToProps)(Card)
