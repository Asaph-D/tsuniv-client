import { Navigate } from "react-router";
import NavBar from "@components/student/search/NavBar";
import AnimatedPage from "@layouts/AnimatedPage";

const ProtectedRoute = ({ children }) => {
    const isAuth = localStorage.getItem("isAuth") === "true";

    return isAuth ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
            <NavBar />
            <AnimatedPage>{children}</AnimatedPage>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
