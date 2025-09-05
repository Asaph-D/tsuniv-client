// Composant pour les préférences de notification
const NotificationToggle = ({ label, description, icon: Icon, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
            {Icon && <Icon className="h-5 w-5 text-gray-600 mr-3" />}
            <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
        <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={checked}
            onChange={onChange}
        />
    </div>
);

export default NotificationToggle;