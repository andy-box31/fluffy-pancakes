import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Card.css'

const Card = ({ params, onSubmit, attrs, readOnly }) => {
  const details = Object.keys(params).map((key, i) => {
    if (!attrs.includes(key)) {
      return
    }
    if (readOnly) {
      return <p className={classnames({ cardChoice: true, cardChoice6: attrs.length > 5 })} key={key}> {key}: {params[key]} </p> // TODO should be a list
    }
    return (
      <label key={key} className={classnames({ cardChoice: true, cardChoice6: attrs.length > 5 })}>
        <input
          type='radio'
          name='selection'
          value={key}
          onChange={onSubmit}
        /> {key}: {params[key]}
      </label>
    )
  })
  // TODO: review disabled eslint
  const backgroundImage = !!params.Image ? { // eslint-disable-line no-extra-boolean-cast
    backgroundImage: `url(${params.Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  } : {}
  const rand = Math.random() * 3 - 2
  const cardRotate = {
    transform: `rotate(${rand}deg)`
  }
  return (
    <div className='card' style={cardRotate}>
      <header style={backgroundImage} className='cardHeader'>
        <h1 className='glbFullAbsolute cardTitle'>
          {params.Name ? params.Name : 'Card info'}
        </h1>
      </header>
      <div className='cardContent'>
        {details}
      </div>
    </div>
  )
}

Card.defaultProps = {
  readOnly: true
}

Card.propTypes = {
  params: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  attrs: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool
}

function mapStateToProps (state) {
  return { attrs: state.deckInfo.competeOn }
}

export default connect(mapStateToProps)(Card)
