import { useState } from 'react'
import Welcome from './layouts/welcome.jsx'
import Credentials from './layouts/credentials.jsx'
import GameScreen from './layouts/gameScreen.jsx'
import { io } from "socket.io-client"
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// const socket = io("http://localhost:5000");
const socket = io("https://pong-backend.onrender.com");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomCode, setRoomCode] = useState("")
  const [clientNumber, setClientNumber] = useState(0);
  const components = {
    welcome: <Welcome clickToContinue={goToCredentials} />,
    credentials: <Credentials createRoom={createRoom} joinRoom={joinRoom} socket={socket} />
  }
  const [renderComp, setRenderComp] = useState(components.welcome)


  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    return () => {
      socket.off('connect');
    }
  }, [])



  function goToCredentials(message) {
    if (message) toast.error(message);
    setRenderComp(components.credentials)
  }

  function joinRoom(clientNum, uName) {
    setClientNumber(clientNum);
    setRenderComp(
      <GameScreen clientNumber={clientNum} socket={socket} goToCredentials={goToCredentials} username={uName} />
    )
  }

  function createRoom(roomName, clientNum, uName) {
    setClientNumber(clientNum);
    setRoomCode(roomName);
    setRenderComp(
      <GameScreen clientNumber={clientNum} socket={socket} goToCredentials={goToCredentials} username={uName} />
    )
  }


  return (
    <>
      {renderComp}
      <Toaster />
    </>
  )
}

export default App
