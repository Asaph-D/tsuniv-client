import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { Link } from "react-router"
import axiosInstance from "@services/axiosInstance"
import { CheckCircle } from "lucide-react"
import SuccessStep from "@components/shared/SucessStep"
import GlobalPreload from "@components/register/GlobalPreload"

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Envoi direct d'un objet JSON, plus approprié que FormData
      const response = await axiosInstance.post('/auth/login', {
        authBody: {
          phone: phoneNumber,
          password: password
        }
      })

      console.log("Connexion réussie:", response.data)
      localStorage.setItem("isAuth",true)
      setSuccess("Connexion réussie ! Redirection en cours...")
      // Gérer la redirection ou le stockage du token ici

    } catch (err) {
      console.error("Échec de la connexion:", err)
      setError(err.response?.data?.message || "Échec de la connexion. Veuillez vérifier vos identifiants.")
    } finally { 
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Connexion avec Google")
  }
  if (success) {
    return (
      <SuccessStep
        title="Inscription finalisée !"
        message="Votre dossier a été enregistré avec succès. Vous serez redirigé vers l'accueil."
        icon={CheckCircle}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden flex items-center justify-center p-4">

      {/* Carte de connexion */}
      <div className="card w-full max-w-md bg-card shadow-2xl relative z-10 border border-border">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-card-foreground mb-2">Connexion</h1>
            <p className="text-muted-foreground">Connectez-vous à votre compte</p>
          </div>

          {/* Affichage des messages d'erreur/succès */}
          {error && <div className="text-sm text-center p-3 bg-red-100 text-red-700 rounded-lg mb-4">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-card-foreground font-medium">Numéro de téléphone</span>
              </label>
              <input
                type="tel"
                placeholder="Entrez votre numéro"
                className="input input-bordered w-full bg-input border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="billing tel"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-card-foreground font-medium">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                className="input input-bordered w-full bg-input border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-primary">
                  Mot de passe oublié ?
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary hover:bg-primary/90 text-primary-foreground border-none transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="divider text-muted-foreground">OU</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full border-border hover:bg-muted hover:border-primary text-card-foreground transition-all duration-200 transform hover:scale-[1.02]"
          >
            {/* Icône Google */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuer avec Google
          </button>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link to={'/register'} className="link link-hover text-primary font-medium">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isLoading && <GlobalPreload message={"Votre identite est en cours de verification."} />}
    </div>
  )
}

export default LoginPage;
