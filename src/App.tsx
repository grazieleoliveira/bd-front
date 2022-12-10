import { useState } from 'react'
import reactLogo from './assets/react.svg'
import bgImg from './assets/images/pokedex-screen-1.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{backgroundImage: `url(${bgImg})` , width: '100vw', height: '100vh', backgroundSize: 'contain'}}>
      <p> g</p>
    </div>
  )
}

export default App
