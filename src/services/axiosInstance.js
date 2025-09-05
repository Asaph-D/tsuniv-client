// @services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});

// Interceptor de réponse
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirection vers /login si non authentifié
      localStorage.clear()
      window.location.href = "/login";
    }

    // Tu peux gérer d'autres cas ici
    if (error.response?.status === 403) {
      console.warn("Accès interdit");
      localStorage.clear()
    }

    if (error.response?.status >= 500) {
      console.error("Erreur serveur");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
