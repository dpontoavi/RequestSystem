import './App.css'
import { Route, Routes } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import { HomePage } from './pages/Homepage'

function App() {

  return (
    <Routes>
      <Route path="/api/requests" element={<HomePage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
