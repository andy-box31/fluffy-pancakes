import React from 'react'
import './PreviewCard.css'

const PreviewCard = ({params}) => {
  const details = Object.keys(params).map((key, i) =>
    <p key={key}>
      {key}: {params[key]}
    </p>
  )
  return (
    <div className="previewCard">
      <div className="previewCardContent"></div>
      <div>{details}</div>
    </div>
  )
}

export default PreviewCard
