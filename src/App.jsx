import Register from './pages/register'
import Login from './pages/login'
import Messenger from './pages/messenger'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing'

function App() {

  return (
    <Router>
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Messenger />} />
      </Routes>
    </Router>
  )
}

export default App
