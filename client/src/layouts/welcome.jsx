import React from 'react'
import '../styles/welcome.css'
import '../styles/typography.css'
import '../styles/buttons.css'

export default function Welcome( {clickToContinue} ) {
    return (
        <main className="welcome-main-container">
            <div className="welcome-title">
                Welcome to    
            </div>
            <div className="playful-heading pong-title">
                PONG!
            </div>
            <button onClick={() => {clickToContinue()}} className="btn-primary cta-btn">Click to continue</button>
        </main>
    )
}