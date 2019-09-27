import React from 'react'
import './DeckSelect.css'

const DeckSelect = ({title, initial, currentValue, handleChange, options, handleToggle = null}) => {
  return (
    <div className='deckSelect'>
      <label>
      <span className="glbLabelText">{title}:</span>
        <select className="glbSlct inlineRight" value={currentValue} onChange={handleChange}>
        <option value={initial}>{initial}</option>
          {options.map((val) => <option value={val} key={val}>{val}</option>)}
        </select>
      </label>
      {handleToggle && <button type="button" className="glbSlctToggle" onClick={handleToggle}>&#8693;</button>}
    </div>
  )
}

export default DeckSelect
