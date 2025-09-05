// Composant pour les cartes de statistiques
const StatsCard = ({ value, label, color }) => (
    <div className={`text-center p-4 bg-${color}-50 rounded-lg`}>
        <div className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

export default StatsCard;