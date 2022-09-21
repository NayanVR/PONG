import React, { useEffect } from 'react'
import ChatSection from '../components/ChatSection'
import Game from '../components/Game'

export default function GameScreen({ socket, goToCredentials }) {

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Game socket={socket} goToCredentials={goToCredentials} />
      <ChatSection />
    </div>
  )
}
