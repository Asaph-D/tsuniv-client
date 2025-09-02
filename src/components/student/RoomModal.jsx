import {
    Locate,
    ShieldCheck,
    Wifi,
    Utensils,
    ParkingCircle,
    Shield,
    Mail,
    Phone,
    Users,
    Ruler,
    Euro,
    Footprints,
    Car,
    X, // Ajout de l'icône de fermeture
} from "lucide-react";
import LazyImage from "@components/shared/LazyImage";
import { motion, AnimatePresence } from "framer-motion"; // Importation de motion et AnimatePresence

const featureIcons = {
    "wifi": Wifi,
    "cuisine": Utensils,
    "parking": ParkingCircle,
    "sécurité": Shield,
    "lit": Users,
    "bureau": Ruler,
    "douche": Utensils,
    "balcon": Locate,
    "climatisation": Car,
    "jardin": ShieldCheck,
};

const RoomModal = ({ room, onClose }) => {
    // Affiche la modale uniquement si une chambre est passée en prop
    if (!room) {
        return null;
    }

    const getFeatureIcon = (feature) => {
        const iconName = feature.toLowerCase();
        for (const key in featureIcons) {
            if (iconName.includes(key)) {
                return featureIcons[key];
            }
        }
        return null;
    };

    // Définition des animations pour la modale
    const backdropVariants = {
        visible: { opacity: 1, backdropFilter: "blur(8px)" },
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    };

    const modalVariants = {
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        hidden: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <AnimatePresence>
            {room && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" // Utilisation de fixed et fond sombre
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose} // Fermeture en cliquant en dehors de la modale
                >
                    <motion.div
                        className="relative max-w-2xl w-11/12 max-h-[90vh] p-6 rounded-lg shadow-xl overflow-y-auto bg-white" // Changement de couleurs
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture de la modale
                    >
                        {/* Bouton de fermeture en fixed */}
                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 text-gray-700 bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-6">
                            <LazyImage
                                src={room.image}
                                alt={room.name}
                                className="w-full h-80 object-cover rounded-md"
                            />

                            <h1 className="text-2xl font-bold text-gray-900">
                                {room.name}
                            </h1>

                            {/* Cartes d'information dynamiques */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {room.capacity && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm">
                                        <Users className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-semibold">{room.capacity}</p>
                                            <span className="text-xs text-gray-500">Capacité</span>
                                        </div>
                                    </div>
                                )}
                                {room.surface && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm">
                                        <Ruler className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-semibold">{room.surface}</p>
                                            <span className="text-xs text-gray-500">Surface</span>
                                        </div>
                                    </div>
                                )}
                                {room.price && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm">
                                        <Euro className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-semibold">{room.price.toLocaleString()} {room.currency}</p>
                                            <span className="text-xs text-gray-500">Par mois</span>
                                        </div>
                                    </div>
                                )}
                                {room.walkTime && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm">
                                        <Footprints className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-semibold">{room.walkTime}</p>
                                            <span className="text-xs text-gray-500">À pied</span>
                                        </div>
                                    </div>
                                )}
                                {room.carTime && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm">
                                        <Car className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-semibold">{room.carTime}</p>
                                            <span className="text-xs text-gray-500">En véhicule</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Adresse dynamique */}
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-lg text-gray-600">
                                    <Locate className="w-5 h-5 text-gray-500" />
                                    {room.location}
                                </p>
                            </div>

                            {/* Équipements dynamiques */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Équipements</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {room.features && room.features.map((feature, index) => {
                                        const Icon = getFeatureIcon(feature);
                                        return (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-orange-400 to-gray-400 text-white rounded-full text-sm font-medium"
                                            >
                                                {Icon && <Icon className="w-4 h-4" />} {feature}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Certifications dynamiques */}
                            <div className="space-y-1 p-4 bg-base-100">
                                <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                                {room.isCertified ? (
                                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                                        <ShieldCheck className="w-7 h-7 text-orange-500" />
                                        Ce logement a été vérifié et certifié selon nos standards de qualité.
                                    </p>
                                ) : (
                                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                                        <Shield className="w-5 h-5 text-gray-500" />
                                        Ce logement n'a pas encore été certifié.
                                    </p>
                                )}
                            </div>

                            {/* Contact dynamique */}
                            <div className="space-y-1 p-4 bg-base-100">
                                <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                                {room.contactPhone && (
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-4 h-4 text-orange-500" /> {room.contactPhone}
                                    </p>
                                )}
                                {room.contactEmail && (
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4 text-orange-500" /> {room.contactEmail}
                                    </p>
                                )}
                            </div>

                            {/* Bouton de contact */}
                            <div className="pt-2">
                                <button className="btn w-full bg-gradient-to-br from-orange-500 via-orange-400 to-gray-100 text-white hover:from-orange-600 hover:to-gray-200 rounded-md font-semibold transition-colors duration-200">
                                    Contacter
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoomModal;