import React, { useState } from 'react'
import '../styles/typography.css'
import '../styles/buttons.css'
import '../styles/credentials.css'
import { useEffect } from 'react'

export default function Credentials({ joinRoom, createRoom, socket }) {

  const [username, setUsername] = useState("")
  const [roomCode, setRoomCode] = useState("")

  useEffect(() => {
    socket.on('roomCreated', (roomName, clientNumber) => {
      createRoom(roomName, clientNumber);
    });
    socket.on('roomJoined', (clientNumber) => {
      joinRoom(clientNumber);
    });
  }, [])


  function handleCreateRoom() {
    socket.emit('newGame');
  }

  function handleJoinRoom() {
    socket.emit('joinGame', roomCode);
  }

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
        <button onClick={handleJoinRoom} className="btn-primary">Join Room</button>
        <button onClick={handleCreateRoom} className="btn-secondary">Create Room</button>
      </div>
    </div>
  )
}