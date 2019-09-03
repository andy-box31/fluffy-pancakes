import React from 'react'

const RadioSelector = ({params = [], handleChange, activeParam, name}) => { 
  return (
      <React.Fragment>
      {params.map((param, i) => {
      return (
        <label className="selectionElement" key={param}>
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
    </React.Fragment>
  )
  
}

export default RadioSelector
