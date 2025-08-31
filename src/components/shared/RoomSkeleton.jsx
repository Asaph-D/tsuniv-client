const RoomSkeleton = () => (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
        <div className="h-64 bg-gray-200 w-full" />
        <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-8 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-20 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export default RoomSkeleton;
