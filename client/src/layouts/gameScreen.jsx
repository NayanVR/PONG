import React from 'react'
import ChatSection from '../components/ChatSection'
import Game from '../components/Game'

export default function GameScreen() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Game />
      <ChatSection />
    </div>
  )
}
