import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './DeckSelect.css'

const DeckSelect = ({title, initial, currentValue, handleChange, options, handleToggle = null}) => {
  return (
    <div className='deckSelect'>
      <label>
      <span className="glbLabelText">{title}:</span>
        <select className={classnames({glbSlct: true, inlineRight: !!handleToggle})} value={currentValue} onChange={handleChange}>
        <option value={initial}>{initial}</option>
          {options.map((val) => <option value={val} key={val}>{val}</option>)}
        </select>
      </label>
      {handleToggle && <button type="button" className="glbSlctToggle" onClick={handleToggle}>&#8693;</button>}
    </div>
  )
}

DeckSelect.propTypes = {
  title: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleToggle: PropTypes.func
}

export default DeckSelect
