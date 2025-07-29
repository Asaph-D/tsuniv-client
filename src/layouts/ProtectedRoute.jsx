import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;