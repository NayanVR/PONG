import React, { useState } from 'react'
import '../styles/typography.css'
import '../styles/buttons.css'
import '../styles/credentials.css'

export default function Credentials({ joinRoom }) {

  const [username, setUsername] = useState("")
  const [roomCode, setRoomCode] = useState("")

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }
  
  function handleRoomCodeChange(e) {
    setRoomCode(e.target.value)
  }
  
  return (
    <div className="credentials-container">
      <div className="playful-heading credentials-title">PLAY NOW</div>
      <input onChange={handleUsernameChange} value={username} type="text" name="username" placeholder="Username" />
      <input onChange={handleRoomCodeChange} value={roomCode} type="text" name="room code" placeholder="Room Code" />
      <div className="btns-container">
        <button onClick={joinRoom} className="btn-primary">Join Room</button>
        <button button className="btn-secondary">Create Room</button>
      </div>
    </div>
  )
}