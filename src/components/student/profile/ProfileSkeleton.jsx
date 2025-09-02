// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProfileSkeleton = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
        {/* Section Profil */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center">
                    <div className="skeleton w-32 h-32 rounded-full mb-4" />
                    <div className="skeleton h-6 w-24 rounded" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="skeleton h-5 w-48 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="skeleton h-10 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Section Académique */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="skeleton h-5 w-48 mb-4 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="skeleton h-10 w-full rounded-xl" />
                <div className="skeleton h-10 w-full rounded-xl" />
            </div>
        </div>

        {/* Section Documents */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="skeleton h-5 w-48 mb-4 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="skeleton h-32 w-full rounded-xl" />
                <div className="skeleton h-32 w-full rounded-xl" />
            </div>
            <div className="skeleton mt-6 h-16 w-full rounded-xl" />
        </div>

        {/* Section Notifications */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="skeleton h-5 w-48 mb-6 rounded" />
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full rounded-xl" />
                ))}
            </div>
        </div>

        {/* Section Statistiques */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="skeleton h-5 w-48 mb-6 rounded" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-24 w-full rounded-xl" />
                ))}
            </div>
        </div>

        {/* Section Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
            <div className="skeleton h-5 w-48 mb-6 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full rounded-xl" />
                ))}
            </div>
        </div>
    </motion.div>
);

export default ProfileSkeleton;
