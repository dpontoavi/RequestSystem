import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import { HomePage } from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/api/requests" element={<HomePage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
