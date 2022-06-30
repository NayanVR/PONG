import { useState } from 'react'
import './styles/App.css'
import './styles/welcome.css'
import Welcome from './layouts/welcome.jsx'
import Credentials from './layouts/credentials.jsx'
import Game from './layouts/game.jsx'

function App() {

  const components = {
    welcome : <Welcome clickToContinue={clickToContinue}/>,
    credentials: <Credentials joinRoom={joinRoom}/>,
    game: <Game />
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
