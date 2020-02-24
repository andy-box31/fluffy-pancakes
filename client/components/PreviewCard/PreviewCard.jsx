import React from 'react'
import PropTypes from 'prop-types'
import './PreviewCard.css'

const PreviewCard = ({ params }) => {
  const details = Object.keys(params).map((key, i) =>
    <p key={key}>
      {key}: {params[key]}
    </p>
  )
  return (
    <div className='previewCard'>
      <div className='previewCardContent' />
      <div>{details}</div>
    </div>
  )
}

PreviewCard.propTypes = {
  params: PropTypes.object
}

export default PreviewCard
