import React from 'react'
import './RadioSelector.css'

const RadioSelector = ({params = [], handleChange, activeParam, name}) => { 
  return (
      <div className="radioSelector">
        {params.map((param, i) => {
        return (
          <label className="radioBtn" key={param}>
            <input
              type="radio"
              name={name}
              value={param}
              onChange={handleChange}
              checked={activeParam === param}
            /> {param}
          </label>
        )
      })}
    </div>
  )
}

export default RadioSelector
