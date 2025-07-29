import { Routes, Route } from 'react-router'
import { lazy } from 'react'
import './App.css'


//Importation des routes protegees.
const Home = lazy(()=>import('@pages/Home'))
const Login = lazy(()=>import('@pages/Login'))


//Importation du Layout de protection
import ProtectedRoute from "@layouts/ProtectedRoute"

function App() {
  return (
    <Routes>
      {/* Routes protegees */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
