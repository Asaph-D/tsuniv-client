import { Routes, Route } from "react-router";
import { lazy } from "react";
import "./App.css";

const LandingPage = lazy(() => import("@pages/LandingPage"));
const Login = lazy(() => import("@pages/Login"));
const SignUp = lazy(() => import("@pages/SignUp"));
const Search = lazy(() => import("@pages/student/Search"));
const Profile = lazy(() => import("@pages/student/Profile"));
const Test = lazy(() => import("./Test"));
const Erreur = lazy(() => import("@pages/Erreur"));
import NavBar from './components/shared/NavBar'
import ProtectedRoute from "@layouts/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Routes protégées */}
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Routes publiques */}
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}

export default App;
