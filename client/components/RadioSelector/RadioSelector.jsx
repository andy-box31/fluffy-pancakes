import React from 'react'
import PropTypes from 'prop-types'
import './RadioSelector.css'

const RadioSelector = ({ params = [], handleChange, activeParam, name }) => {
  return (
    <div className='radioSelector'>
      {params.map((param) => {
        return (
          <label className='radioBtn' key={param}>
            <input
              type='radio'
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

RadioSelector.propTypes = {
  params: PropTypes.array,
  handleChange: PropTypes.func,
  activeParam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string
}

export default RadioSelector
