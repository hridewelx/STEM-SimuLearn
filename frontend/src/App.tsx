import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SimulationsPage from './pages/SimulationsPage'
import CategoryPage from './pages/CategoryPage'
import SimulationDetailPage from './pages/SimulationDetailPage'
import SimulationRunnerPage from './pages/SimulationRunnerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simulations" element={<SimulationsPage />} />
        <Route path="/simulations/:category" element={<CategoryPage />} />
        <Route path="/simulations/:category/:simulationId" element={<SimulationDetailPage />} />
        <Route path="/simulations/:category/:simulationId/simulation" element={<SimulationRunnerPage />} />
      </Routes>
    </Router>
  )
}

export default App
