import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Animation from './components/Animation'
import PixiSpineAnimation from './components/Animation'
import PixiApp from './components/Animation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>

     {/* <Animation atlasFile='./assets/box/Box_1.atlas.txt' jsonFile='./assets/box/Box_1.json' /> */}
      <PixiApp />

    </div>
  )
}

export default App
