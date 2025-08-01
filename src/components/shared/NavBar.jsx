import {Home} from "lucide-react"
import { Link } from "react-router";


const NavBar = () =>{
    return (
           <nav className="relative flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <Home className="w-6 h-6" />
                    <h1 className="text-2xl">TS_Univ</h1>
                </div>

                <ul className="relative flex justify-around min-w-6/12 items-center">
                    <Link className="text-xl" to="/">Accueil</Link>
                    <Link className="text-xl" to={"/about"}>Logements</Link>
                    <Link className="text-xl" to={"/contact"}>Services</Link>
                    <Link className="text-xl" to={"/login"}>Contact</Link>
                </ul>

                <div className="flex space-x-2">
                    <Link className="btn" to={"/login"}>Connexion</Link>
                    <Link className="btn btn-primary rounded" to={"/register"}>S'inscrire</Link>
                </div>
           </nav>
    )
}
export default NavBar;