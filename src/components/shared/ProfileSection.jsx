import { itemVariants } from "@utils/Animations";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

// Composant réutilisable pour une section de profil
const ProfileSection = ({ title, icon: Icon, children }) => (
    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            {Icon && <Icon className="h-5 w-5 mr-2 text-blue-600" />}
            {title}
        </h3>
        {children}
    </motion.div>
);

export default ProfileSection;