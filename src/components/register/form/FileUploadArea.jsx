import { useState } from 'react';
import useInscriptionStore from '@stores/studentRegistrationStore';
import { Upload, X } from 'lucide-react';
import Toast from '@utils/Toast';

import PdfPreview from '../../shared/PdfPreview';
import ImagePreview from '../ImagePreview';

import ConfigurePdfWorker from '@utils/ConfiigPdfWorker';
ConfigurePdfWorker();

const FileUploadArea = ({ field, label }) => {
    const { formData, updateFormData, errors, setFilePreviews, filePreviews } = useInscriptionStore();
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (field, file) => {
        if (!file) {
            updateFormData(field, null);
            setFilePreviews({ ...filePreviews, [field]: null });
            return;
        }

        const rules = {
            photoIdentite: { extensions: ['jpg', 'jpeg', 'png'], maxSize: 5 * 1024 * 1024, name: "Photo d'identité" },
            pieceIdentite: { extensions: ['txt','pdf'], maxSize: 10 * 1024 * 1024, name: 'Pièce d’identité' },
        };

        const rule = rules[field];
        const ext = file.name.split('.').pop().toLowerCase();
        const size = file.size;

        if (!rule.extensions.includes(ext)) {
            Toast(`❌ ${rule.name} : Extension .${ext} non autorisée`, "error");
            return;
        }

        if (size > rule.maxSize) {
            Toast(`❌ ${rule.name} : Fichier trop volumineux (${(size / 1024 / 1024).toFixed(2)} Mo)`, "error");
            return;
        }

        updateFormData(field, file);
        setLoading(true);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreviews({ ...filePreviews, [field]: e.target.result });
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            setFilePreviews({ ...filePreviews, [field]: file });
            setLoading(false);
        } else {
            setFilePreviews({ ...filePreviews, [field]: null });
            setLoading(false);
        }
    };

    const removeFile = () => handleFileUpload(field, null);
    const file = formData[field];
    const preview = filePreviews[field];

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text font-medium">{label}</span>
            </label>
            <div className={`border-2 border-dashed rounded-lg ${errors[field] ? 'border-error' : 'border-base-300'} ${file ? 'p-4' : 'p-6'} transition-colors hover:border-orange-600 hover:bg-base-200`}>
                {file ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="text-sm font-medium truncate max-w-xs">{file.name}</div>
                                <div className="text-xs opacity-60">({(file.size / 1024 / 1024).toFixed(2)} MB)</div>
                            </div>
                            <button onClick={removeFile} className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error hover:text-error-content">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {loading ? (
                            <div className="skeleton h-32 w-full rounded-lg"></div>
                        ) : preview && file.type.startsWith('image/') ? (
                            <ImagePreview src={preview} />
                        ) : preview && file.type === 'application/pdf' ? (
                            <PdfPreview file={preview} />
                        ) : null}

                        <button onClick={() => document.getElementById(field)?.click()} className="btn btn-outline btn-sm w-full">
                            Remplacer
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 opacity-60 mb-2" />
                        <div className="text-sm opacity-60 mb-2">Glissez ou cliquez pour sélectionner</div>
                        <button onClick={() => document.getElementById(field)?.click()} className="btn btn-outline btn-sm">
                            Choisir un fichier
                        </button>
                    </div>
                )}

                <input
                    type="file"
                    accept={field === 'photoIdentite' ? 'image/jpeg,image/png' : field === 'pieceIdentite' ? 'image/jpeg,image/png,application/pdf' : 'image/*,.pdf'}
                    onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
                    className="hidden"
                    id={field}
                />
            </div>
            {errors[field] && (
                <label className="label">
                    <span className="label-text-alt text-error">{errors[field]}</span>
                </label>
            )}
        </div>
    );
};

export default FileUploadArea;
