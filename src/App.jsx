import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GDevelopEditor from './pages/GDevelopEditor'
import MicroStudio from './pages/MicroStudio'
import VimmVault from './pages/VimmVault'
import GameBuilder from './pages/GameBuilder'
import GDevelopExamples from './pages/GDevelopExamples'
import './styles/index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/gdevelop-editor" element={<GDevelopEditor />} />
      <Route path="/microstudio" element={<MicroStudio />} />
      <Route path="/vimm-vault" element={<VimmVault />} />
      <Route path="/game-builder" element={<GameBuilder />} />
      <Route path="/gdevelop" element={<GDevelopExamples />} />
    </Routes>
  )
}

export default App

