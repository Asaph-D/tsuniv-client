// Composant SkeletonCard pour l'état de chargement
const SkeletonCardSearch = () => (
    <div className="w-[360px] h-[520px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
        {/* Image + badges */}
        <div className="relative">
            <div className="skeleton w-full h-64" />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                <div className="skeleton w-5 h-5 rounded-full bg-orange-300" />
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
                <div className="skeleton h-5 w-20 rounded-full" />
                <div className="skeleton h-5 w-24 rounded-full" />
            </div>
        </div>

        {/* Infos */}
        <div className="p-4 space-y-4">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />

            <div className="flex justify-between">
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-4 w-16 rounded" />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="skeleton h-6 w-32 rounded" />
                <div className="skeleton h-10 w-28 rounded-xl" />
            </div>
        </div>
    </div>
);

export default SkeletonCardSearch;