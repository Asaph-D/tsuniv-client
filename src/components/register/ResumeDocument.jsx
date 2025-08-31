import { X } from "lucide-react";
import PdfPreview from '@components/shared/PdfPreview';
const ResumeDocument = ({ formData, filePreviews }) => {
    return (
        <div>
            <h4 className="font-semibold text-blue-600 mb-3">Documents téléchargés</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { field: 'photoIdentite', label: "Photo d'identité" },
                    { field: 'pieceIdentite', label: 'Pièce d’identité' },
                ].map(({ field, label }) => {
                    const file = formData[field];
                    const preview = filePreviews[field];
                    const isImage = file && file.type?.startsWith('image/');
                    return (
                        <div key={field} className="card bg-gray-50 shadow-sm p-3 rounded">
                            <div className="text-sm font-medium mb-2">{label}</div>
                            {file ? (
                                <div className="space-y-2">
                                    {isImage && preview ? (
                                        <img src={preview} alt={file.name} className="w-full object-contain rounded border" />
                                    ) : file.type === 'application/pdf' ? (
                                        <PdfPreview file={preview} />
                                    ) : (
                                        <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded border border-dashed">
                                            <span className="text-xs text-gray-500">Aperçu non disponible</span>
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500 truncate">{file.name}</div>
                                    <div className="badge badge-success badge-sm">✓ Téléchargé</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="w-full h-24 bg-red-100 flex items-center justify-center rounded border border-dashed">
                                        <X className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="badge badge-error badge-sm mt-2">✗ Manquant</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 text-xs text-gray-600">
                Type de document : <span className="font-medium">{formData.typeDocument}</span>
            </div>
        </div>
    );
};
export default ResumeDocument;