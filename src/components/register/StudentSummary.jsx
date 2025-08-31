// components/shared/StudentSummary.tsx

const StudentSummary = ({ formData }) => {
    return (
        <div className="flex flex-wrap gap-6">
            {/* Informations personnelles */}
            <div className="min-w-[280px] flex-1">
                <h4 className="font-semibold text-blue-600 mb-2">Informations personnelles</h4>
                <div className="space-y-1 text-sm text-gray-800">
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Nom:</strong> {formData.nom}</p>
                    <p><strong>Prénom:</strong> {formData.prenom}</p>
                    <p><strong>Téléphone:</strong> {formData.telephone || "Non renseigné"}</p>
                    <p><strong>Sexe:</strong> {formData.sexe}</p>
                    <p><strong>Date de naissance:</strong> {formData.dateNaissance}</p>
                </div>
            </div>

            {/* Informations académiques */}
            <div className="min-w-[280px] flex-1">
                <h4 className="font-semibold text-blue-600 mb-2">Informations académiques</h4>
                <div className="space-y-1 text-sm text-gray-800">
                    <p><strong>Niveau d'étude:</strong> {formData.niveauEtude}</p>
                    <p><strong>Institut:</strong> {formData.institut}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentSummary;
