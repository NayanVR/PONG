import { useState } from 'react'
import Welcome from './layouts/welcome.jsx'
import Credentials from './layouts/credentials.jsx'
import GameScreen from './layouts/gameScreen.jsx'

function App() {

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
