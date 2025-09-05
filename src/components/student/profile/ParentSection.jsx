import ProfileSection from '../../shared/ProfileSection'
import { Users, Phone, Mail } from 'lucide-react';

// Nouveau composant pour les informations des parents
const ParentInfoSection = ({ parents }) => {
    // Affiche la section uniquement si des données de parents sont présentes
    if (!parents || parents.length === 0) {
        return null;
    }

    return (
        <ProfileSection title="Informations des parents" icon={Users}>
            {parents.map((parent, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <h4 className="md:col-span-2 text-md font-bold text-gray-800">
                        Parent {index + 1}
                    </h4>
                    <InfoField label="Nom" value={parent.lastName} />
                    <InfoField label="Prénom" value={parent.firstName} />
                    <InfoField label="Téléphone" value={parent.phone} icon={Phone} />
                    <InfoField label="Email" value={parent.email} type="email" icon={Mail} />
                </div>
            ))}
        </ProfileSection>
    );
};


export default ParentInfoSection;