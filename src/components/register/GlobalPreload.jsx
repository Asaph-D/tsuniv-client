

const GlobalPreload = () => {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center max-w-xs w-full animate-pulse">
            <div className="skeleton h-12 w-12 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-gray-700">Préparation du PDF</h3>
            <p className="text-sm text-gray-500 mt-2">Merci de patienter...</p>
        </div>
    </div>);
}

export default GlobalPreload;