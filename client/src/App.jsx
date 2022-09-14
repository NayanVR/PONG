import { useState } from 'react'
import Welcome from './layouts/welcome.jsx'
import Credentials from './layouts/credentials.jsx'
import GameScreen from './layouts/gameScreen.jsx'
import { io } from "socket.io-client"
import { useEffect } from 'react'

const socket = io("http://localhost:5000");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    return () => {
      socket.off('connect');
    }
  }, [])


  const components = {
    welcome: <Welcome clickToContinue={clickToContinue} />,
    credentials: <Credentials joinRoom={joinRoom} />,
    game: <GameScreen />
  }

  const [renderComp, setRenderComp] = useState(components.welcome)

  function clickToContinue() { setRenderComp(components.credentials) }

  function joinRoom() { setRenderComp(components.game) }

  return (
    <>
      {renderComp}
    </>
  )
}

export default App
