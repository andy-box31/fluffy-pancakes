import React from 'react'
import { PLAY_MODE } from '../../utilities/constants'
// import './PlaymodeSelector.css'

const PlaymodeSelector = ({onSelect}) =>
    <div className="PlaymodeSelector">
      {Object.keys(PLAY_MODE).map((key, i) => {
        return (
          <label key={key}>
            <input
              type="radio"
              name="playmodeSelection"
              value={key}
              onChange={onSelect}
            /> {PLAY_MODE[key]}
          </label>
        )
      })}
    </div>

export default PlaymodeSelector
