import React from 'react'
import Navigation from '../Navigation/Navigation'
import './Splash.css'

const Splash = ({dealCards, winner = null}) =>
    <div className="splash">
      <header className="header">
        <h1>Trumps</h1>
        {winner && <h3>WOOP WOOP {winner} Wins</h3>}
        <Navigation />
      </header>
      <main className="mainContent">
        <button type="button" className="dealBtn" onClick={dealCards}>deal</button>
      </main>
      
    </div>

export default Splash
