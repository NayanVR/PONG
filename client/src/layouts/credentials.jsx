import React, { useState } from 'react'
import '../styles/typography.css'
import '../styles/buttons.css'
import '../styles/credentials.css'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Credentials({ joinRoom, createRoom, socket }) {

  const [username, setUsername] = useState("")
  const [roomCode, setRoomCode] = useState("")

  useEffect(() => {
    socket.on('roomCreated', (roomName, clientNumber) => {
      createRoom(roomName, clientNumber, username);
    });
    socket.on('roomJoined', (clientNumber) => {
      joinRoom(clientNumber, username);
    });
    socket.on('roomNotFound', () => {
      toast.error('Room not found');
    });
    socket.on('tooManyPlayers', () => {
      toast.error('Room is Full');
    });

    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('roomNotFound');
      socket.off('tooManyPlayers');
    }
  }, [username])


  function handleCreateRoom() {
    if (username === "") {
      toast.error("Please enter Username");
      return;
    }
    socket.emit('newGame', username);
  }

  function handleJoinRoom() {
    if (username === "" || roomCode === "") {
      toast.error("Please enter Username & Room Code");
      return;
    }
    socket.emit('joinGame', username, roomCode);
  }

  return (
    <div className="credentials-container">
      <div className="playful-heading credentials-title">PLAY NOW</div>
      <input onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
      <input onChange={e => setRoomCode(e.target.value)} value={roomCode} type="text" placeholder="Room Code" />
      <div className="btns-container">
        <button onClick={handleJoinRoom} className="btn-primary">Join Room</button>
        <button onClick={handleCreateRoom} className="btn-secondary">Create Room</button>
      </div>
      <Toaster />
    </div>
  )
}