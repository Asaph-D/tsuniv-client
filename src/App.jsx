import { Routes, Route } from 'react-router'
import { lazy } from 'react'
import './App.css'


//Importation des routes protegees.
const Home = lazy(()=>import('@pages/Home'))
const Login = lazy(()=>import('@pages/Login'))


//Importation du Layout de protection
import ProtectedRoute from "@layouts/ProtectedRoute"


//Importation des routes publiques.
const Erreur = lazy(() => import('@pages/Erreur'))

function App() {
  return (
    <Routes>
      {/* Routes protegees */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Erreur />} />
      {/* Autres routes publiques peuvent etre ajoutees ici */} 
    </Routes>
  )
}

export default App
