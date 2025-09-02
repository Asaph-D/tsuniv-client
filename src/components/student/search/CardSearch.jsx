import { Heart, Locate, Users, Shield, Eye } from "lucide-react";
import LazyImage from "@components/shared/LazyImage";
import { motion } from "framer-motion";

const FavoriteButton = () => (
    <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-orange-100 transition z-10">
        <Heart className="w-5 h-5 text-orange-500" />
    </button>
);

const CardSearch = ({ room, onClick }) => {
    const {
        name,
        location,
        image,
        isAvailable,
        isCertified,
        type,
        capacity,
        price,
        currency,
        features = [],
    } = room;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-sm h-[520px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
            {/* Image + badges */}
            <div className="relative">
                <LazyImage
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                />
                <FavoriteButton />

                {/* Badge centré si indisponible */}
                {!isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-4 py-1 text-white text-lg backdrop-brightness-70 font-semibold rounded-full shadow">
                            Indisponible
                        </span>
                    </div>
                )}

                <div className="absolute top-3 left-3 flex gap-2">
                    {isAvailable && (
                        <span className="px-2 py-1 text-xs font-semibold text-white backdrop-brightness-100 rounded-full backdrop-blur">
                            Disponible
                        </span>
                    )}
                    {isCertified && (
                        <span className="flex items-center gap-1 p-1 text-xs font-semibold backdrop-brightness-150 rounded-full text-white bg-orange-500 backdrop-blur">
                            <Shield className="h-4 w-4" />
                            Certifié
                        </span>
                    )}
                </div>
            </div>

            {/* Infos */}
            <div className="p-4 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Locate className="w-4 h-4" />
                    {location}
                </p>

                <div className="text-sm text-gray-600 flex justify-between">
                    <span>Type : {type}</span>
                    <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {capacity}
                    </span>
                </div>

                {/* Équipements */}
                <div className="text-sm text-gray-700 flex flex-wrap gap-2 mt-2">
                    {features.slice(0, 3).map((item, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
                        >
                            {item}
                        </span>
                    ))}
                    {features.length > 3 && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                            +{features.length - 3} autres
                        </span>
                    )}
                </div>

                {/* Prix + bouton */}
                <div className="flex justify-between items-center mt-4">
                    <h3 className="text-xl font-bold text-orange-600">
                        {price.toLocaleString()}{" "}
                        <span className="text-sm font-medium text-gray-500">
                            {currency}/mois
                        </span>
                    </h3>
                    <button
                        onClick={() => isAvailable && onClick(room)}
                        disabled={!isAvailable}
                        className={`flex gap-2 items-center px-4 py-2 rounded-xl font-semibold transition ${isAvailable
                                ? "bg-gradient-to-br from-orange-500 via-orange-400 to-gray-100 text-white hover:from-orange-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                            }`}
                    >
                        Voir
                        <Eye height={22} className="relative top-0.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CardSearch;
