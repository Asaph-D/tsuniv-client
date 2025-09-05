import { useState } from "react";
import {  Bell } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ThemeToggle from "@layouts/ThemeToggle";
import { Link } from "react-router";
import Notifications from "../Notifications";
import LazyImage from '../../shared/LazyImage'
import { useProfileStudentQuery } from '@services/fetchProfileData';

const NavBar = () => {
const [activeTab, setActiveTab] = useState (false);
    const { data, isPending } = useProfileStudentQuery()
    const photo = isPending ?null : data.studentDocuments.identityPhotoUrl 
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
                <Link to={"/search"} className="btn btn-ghost text-3xl font-bold text-orange-500">TSUniv</Link>
            </div>

            {/* Fin du Navbar : Icônes de notification et d'avatar */}
            <div className="navbar-end space-x-4 md:space-x-8">
                <div onClick={() => setActiveTab(!activeTab)} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator" >
                        <Bell className="text-gray-600" />
                        <span className="badge badge-sm indicator-item bg-orange-500 text-white">8</span>
                    </div>
                </div>
                <ThemeToggle/>
                {/* Icône de l'avatar (optionnelle si vous avez déjà un menu sur grands écrans) */}
                <div>
                    <div role="button" className="btn btn-ghost btn-circle avatar">
                        <Link to={'/profile'}>
                            <LazyImage
                                alt="User avatar"
                                src={photo}
                                className="w-10 rounded-full"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    {activeTab && <Notifications/>}
    </motion.div>
    )
};

export default NavBar;