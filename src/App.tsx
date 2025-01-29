import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login'
import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from './pages/dashboard'
import Pokemons from './pages/pokemons'
import Trainners from './pages/trainners'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pokemons"
            element={
              <PrivateRoute>
                <Pokemons />
              </PrivateRoute>
            }
          />

          <Route
            path="/trainners"
            element={
              <PrivateRoute>
                <Trainners />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
