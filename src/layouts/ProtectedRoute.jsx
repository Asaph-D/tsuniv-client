import { Outlet, Navigate } from "react-router";

import NavBar from "@components/shared/NavBar";

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
    return isAuth ? (
        <div>
            <NavBar />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default ProtectedRoute;