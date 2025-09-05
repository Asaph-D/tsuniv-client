import { CheckCircle, X } from "lucide-react";
// Composant réutilisable pour afficher le statut de vérification d'un document
const DocumentVerificationStatus = ({ isVerified, title, documentUrl }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">{title}</label>
        {isVerified ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-green-600 font-medium mb-1">Document vérifié</p>
                <p className="text-xs text-gray-500">{documentUrl?.split('/').pop()}</p>
            </div>
        ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-sm text-orange-600 font-medium mb-1">Document non vérifié</p>
            </div>
        )}
    </div>
);

export default DocumentVerificationStatus;