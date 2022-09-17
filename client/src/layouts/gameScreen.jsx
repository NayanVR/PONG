import React, { useEffect } from 'react'
import ChatSection from '../components/ChatSection'
import Game from '../components/Game'

export default function GameScreen({ socket, roomCode, clientNumber }) {

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Game socket={socket} roomCode={roomCode} clientNumber={clientNumber} />
      <ChatSection />
    </div>
  )
}
