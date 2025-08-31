import { Routes, Route } from 'react-router'
import { lazy } from 'react'
import './App.css'


//Importation des routes protegees.
const Home = lazy(() => import('@pages/Home'))
const Login = lazy(() => import('@pages/Login'))
const Registration = lazy(() => import('@pages/RegistrationCopy'))
const SignUp = lazy(() => import('@pages/SignUp')) // Importation de la page SignUp
const Search = lazy(() => import('@pages/student/Search'))

const Test = lazy(() => import('./Test'))


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
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/register" element={<SignUp />} /> {/* Route pour la page SignUp */}
      <Route path="*" element={<Erreur />} />
      <Route path="/test" element={<Test />} />
      {/* Autres routes publiques peuvent etre ajoutees ici */}
    </Routes>
  )
}

export default App
