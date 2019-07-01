import React from 'react'
import './Card.css'

function Card ({params}) {
  const details = Object.keys(params).map((key, i) => 
    <li key={key}>{key}: {params[key]}</li>
  )

  return (
    <div className="card">
      <header className="cardHeader">
        {params.Image && <img className="cardImage" src={params.Image} alt={`image of ${params.Name}`} /> }
        <h1 className="cardTitle">
          {params.Name ? params.Name : 'Card info'}
        </h1>
      </header>
      <div className="cardContent"></div>
      <ul>{details}</ul>
    </div>
  )
}

export default Card
