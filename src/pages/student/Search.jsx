import {
    Search,
    FilterIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import CustomSelect from "@components/student/search/CustomSelect";
import BudgetSlider from "@components/student/search/BudgetSlider";
import ToggleSwitch from "@components/student/search/Toggle";
import LazyImage from "@components/shared/LazyImage";
import Carosel from "@components/student/search/Carossel";
import Fond from "../../assets/images/Fond.png";
import "./style.css";
import { useStudentSearchStore } from "@stores/studentSearchStore";
import { fetchRooms } from "@services/fetchRooms";
import SkeletonCardSearch from "@components/student/search/SkeletonCardSearch";

// Fonction de filtrage des données
const filterRooms = (rooms, filters) => {
    const { searchText, roomType, priceRange, isCertified, sortOption } = filters;
    const [minPrice, maxPrice] = priceRange;

    let filtered = [...rooms].filter((room) => {
        const matchesSearch =
            room.name.toLowerCase().includes(searchText.toLowerCase()) ||
            room.location.toLowerCase().includes(searchText.toLowerCase());

        // CORRECTION ICI : Utilisation de .includes() pour une correspondance partielle
        const matchesRoomType = roomType === "Tous les types" || room.type.toLowerCase().includes(roomType.toLowerCase());

        const matchesPrice = room.price >= minPrice && room.price <= maxPrice;
        const matchesCertified = !isCertified || room.isCertified;
        return matchesSearch && matchesRoomType && matchesPrice && matchesCertified;
    });

    // Logique de tri
    if (sortOption === "Prix croissant") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Prix décroissant") {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
};

const SearchPage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

    // On récupère les états et actions depuis le store
    const {
        searchText,
        roomType,
        priceRange,
        isCertified,
        sortOption,
        currentPage,
        itemsPerPage,
        setSearchText,
        setCurrentPage,
    } = useStudentSearchStore();

    const { data: rooms, isLoading, isError } = useQuery({
        queryKey: ["rooms"],
        queryFn: fetchRooms,
    });

    const filteredAndSortedRooms = useMemo(() => {
        if (!rooms) return [];
        return filterRooms(rooms, { searchText, roomType, priceRange, isCertified, sortOption });
    }, [rooms, searchText, roomType, priceRange, isCertified, sortOption]);

    const totalPages = Math.ceil(filteredAndSortedRooms.length / itemsPerPage);
    const paginatedRooms = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedRooms.slice(startIndex, endIndex);
    }, [filteredAndSortedRooms, currentPage, itemsPerPage]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1); // Réinitialise la page pour une nouvelle recherche
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderResults = () => {
        if (isLoading) {
            return (
                <div className="carousel w-full flex flex-wrap justify-center gap-6 overflow-hidden h-[600px] md:h-auto md:justify-start">
                    {/* Skeleton pour mobile (1) */}
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 flex justify-center">
                        <SkeletonCardSearch />
                    </div>
                    {/* Skeletons pour tablette et plus (2 et 3) */}
                    <div className="hidden md:flex w-1/3 justify-center">
                        <SkeletonCardSearch />
                    </div>
                    <div className="hidden lg:flex w-1/3 justify-center">
                        <SkeletonCardSearch />
                    </div>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="flex justify-center items-center w-full h-64 text-primary-content text-lg font-semibold">
                    Erreur lors du chargement des données.
                </div>
            );
        }

        if (filteredAndSortedRooms.length === 0) {
            return (
                <div className="flex justify-center items-center w-full h-64 text-gray-500 text-lg font-semibold">
                    Aucun logement trouvé correspondant à votre recherche.
                </div>
            );
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Carosel cards={paginatedRooms} />
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="bg-base-100 min-h-screen font-sans p-4 md:p-8 flex flex-col items-center">
            <motion.div style={{ scale }} className="relative w-9/12 mt-24 max-w-6xl h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <LazyImage src={Fond} alt="Fond d'écran" className="absolute inset-0 w-full h-full object-cover z-0 grayscale-25" />
                <div className="absolute inset-0 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                        Rechercher un Logement
                    </h1>
                    <p className="text-md text-gray-100 mt-2 font-medium">
                        Trouvez le logement parfait pour vos études
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border border-[var(--color-base-300)] rounded-2xl bg-[var(--color-base-100)] shadow-xl p-6 mt-8 space-y-6 w-full max-w-4xl"
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Rechercher par le nom de la localisation..."
                        className="input w-full rounded-full pl-12 pr-4 bg-[var(--color-base-200)] border-[var(--color-base-300)] focus:outline-none focus:border-[var(--color-warning)] focus:ring-1 focus:ring-[var(--color-warning)] transition-all"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--color-neutral-content)]"
                    >
                        <Search className="w-5 h-5" />
                    </motion.span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex justify-center items-center w-full border border-[var(--color-base-300)] p-3 rounded-full hover:bg-[var(--color-base-200)] transition-colors duration-300 text-[var(--color-base-content)] font-semibold"
                    >
                        <FilterIcon className="w-5 h-5 mr-2 text-[var(--color-neutral-content)]" />
                        <span className="text-[var(--color-base-content)]">Filtres</span>
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="divider text-[var(--color-neutral-content)]">
                                Options de filtrage
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <CustomSelect
                                        options={["Tous les types", "Appartement", "Chambre", "Studio", "Maison"]}
                                        type="roomType"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <BudgetSlider />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                >
                                    <CustomSelect
                                        options={["Prix croissant", "Prix décroissant"]}
                                        type="sortOption"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="flex items-center justify-between"
                                >
                                    <p className="text-sm font-semibold text-[var(--color-neutral-content)] mr-4">
                                        Logements certifiés
                                    </p>
                                    <ToggleSwitch />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>


            <div className="flex flex-col w-full max-w-6xl mt-10 px-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="text-2xl font-bold text-gray-800">
                        Résultats de la recherche
                    </motion.h2>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-4">
                        <span className="text-sm font-bold text-primary">
                            {filteredAndSortedRooms.length} logements trouvés
                        </span>
                    </motion.div>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-6xl mt-4 px-4">
                {renderResults()}
            </motion.div>

            {totalPages > 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex justify-center mt-8 w-full px-4">
                    <div className="join shadow-md flex-wrap">
                        <button
                            className="join-item btn bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`join-item btn ${currentPage === index + 1 ? "bg-orange-500 text-white font-semibold hover:bg-orange-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"} transition-colors`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="join-item btn bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SearchPage;