import { User, Settings, LogOut, Bell } from "lucide-react";
import { motion } from "framer-motion";

const NavBar = () => {

    return (<motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-2 left-1/2 -translate-x-1/2 
        w-[95%] sm:w-[90%] md:w-[80%] max-w-4xl z-50 rounded-2xl 
         bg-white/70 backdrop-blur-md shadow-xl border border-gray-200"
    >
        <div className="navbar bg-transparent">

            {/* Début du Navbar : Logo et Menu pour les petits écrans */}
            <div className="navbar-start">
                <a className="btn btn-ghost text-3xl font-bold text-orange-500">TSUniv</a>
            </div>

            {/* Centre du Navbar : Liens pour les grands écrans */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    <li><a className="text-gray-700 hover:text-orange-500 transition-colors duration-200"><User className="w-4 h-4 mr-2" />Profile</a></li>
                    <li><a className="text-gray-700 hover:text-orange-500 transition-colors duration-200"><Settings className="w-4 h-4 mr-2" />Settings</a></li>
                    <li><a className="text-gray-700 hover:text-orange-500 transition-colors duration-200"><LogOut className="w-4 h-4 mr-2" />Logout</a></li>
                </ul>
            </div>

            {/* Fin du Navbar : Icônes de notification et d'avatar */}
            <div className="navbar-end space-x-4">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Bell className="text-gray-600" />
                        <span className="badge badge-sm indicator-item bg-orange-500 text-white">8</span>
                    </div>
                </div>
                {/* Icône de l'avatar (optionnelle si vous avez déjà un menu sur grands écrans) */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a className="justify-between text-sm text-gray-700">Profile <User className="w-4 h-4" /></a></li>
                        <li><a className="justify-between text-sm text-gray-700">Settings <Settings className="w-4 h-4" /></a></li>
                        <li><a className="justify-between text-sm text-gray-700">Logout <LogOut className="w-4 h-4" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </motion.div>
    )
};

export default NavBar;