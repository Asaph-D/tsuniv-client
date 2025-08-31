const NotFound = ({ message = "Aucune chambre trouvée." }) => (
    <div className="flex flex-col items-center justify-center py-12">
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">{message}</p>
    </div>
);

export default NotFound;
