// components/register/steps/Documents.tsx
import FileUploadArea from '../form/FileUploadArea';
import useInscriptionStore from '@stores/studentRegistrationStore';

const Documents = () => {
    const formData = useInscriptionStore(s => s.formData);
    const errors = useInscriptionStore(s => s.errors);
    const updateFormData = useInscriptionStore(s => s.updateFormData);

    return (
        <form autoComplete="on" onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Type de document *</span>
                </label>
                <select
                    value={formData.typeDocument}
                    onChange={(e) => updateFormData("typeDocument", e.target.value)}
                    className={`select select-bordered ${errors.typeDocument ? "select-error" : ""}`}
                    autoComplete="off"
                >
                    <option value="">Sélectionnez</option>
                    <option value="CNI">Carte Nationale d'Identité</option>
                    <option value="PASSEPORT">Passeport</option>
                    <option value="PERMIS_CONDUIRE">Permis de conduire</option>
                </select>
                {errors.typeDocument && (
                    <span className="label-text-alt text-error">{errors.typeDocument}</span>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FileUploadArea field="photoIdentite" label="Photo d'identité *" autoComplete="off" />
                <FileUploadArea field="pieceIdentite" label="Pièce d'identité *" autoComplete="off" />
            </div>

            <input type="hidden" name="username" value={formData.email} />
            <input type="hidden" name="role" value="ETUDIANT" />

            <div className="alert alert-info text-xs">
                <ul className="space-y-1">
                    <li>• Images : JPG, JPEG, PNG (max 5MB)</li>
                    <li>• PDF (max 10MB)</li>
                    <li>• Documents lisibles</li>
                </ul>
            </div>
        </form>
    );
};

export default Documents;
