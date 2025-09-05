// Composant réutilisable pour un champ d'information
const InfoField = ({ label, value, type = 'text', icon: Icon }) => {
    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50";
    const inputWithIconClasses = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500";
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />}
                <input
                    type={type}
                    value={value}
                    className={Icon ? inputWithIconClasses : inputClasses}
                    disabled
                />
            </div>
        </div>
    );
};

export default InfoField;