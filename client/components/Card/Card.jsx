import React from 'react'

function Card ({params}) {
  const details = Object.keys(params).map((key, i) => 
    <li>{key}: {params[key]}</li>
  )

  return (
    <div>
      {params.Name ? params.Name : 'Card info'}
      <ul>{details}</ul>
    </div>
  )
}

export default Card
