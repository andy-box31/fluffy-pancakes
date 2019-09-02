import React from 'react'
import PlaymodeSelector from '../PlaymodeSelector/PlaymodeSelector'
import classNames from 'classnames'
import './Navigation.css'

const Navigation = () => {
  const [menuOpen, toggleMenu] = React.useState(false)

  const handleToggle = () => {
    toggleMenu(!menuOpen)
  }

  return (
    <div className={classNames({
      menu: true,
      open: menuOpen
    })} >
      <button type="button" className="icon settings" onClick={handleToggle}>toggle</button>
      {menuOpen && <nav>
        <PlaymodeSelector />
      </nav>
      }
    </div>
  )
}

export default Navigation