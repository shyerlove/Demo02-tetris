import './index.scss'
import Controller from './components/Controller'
import Gamewin from './components/Gamewin'
import { useEffect, useRef, createContext, useState } from 'react'

function App() {

  return (
    <>
      <div className="game">
        <Gamewin ></Gamewin>
        <Controller></Controller>
      </div>
    </>
  )
}
export default App
