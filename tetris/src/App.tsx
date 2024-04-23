import './index.scss'
import Controller from './components/Controller'
import Gamewin from './components/Gamewin'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

function App() {
  return (
    <>
      <div className="game">
        <Gamewin></Gamewin>
        <Controller ></Controller>
      </div>
    </>
  )
}

export default App
