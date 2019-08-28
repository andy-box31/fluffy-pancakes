import React from 'react'
import './Card.css'

const Card = ({params, onSubmit}) => {
  const details = Object.keys(params).map((key, i) => {
    if (key === 'Name' || key === 'Image' || key === 'Type'){
      return
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

export default Card
