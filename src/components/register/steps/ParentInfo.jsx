// components/register/steps/ParentInfo.tsx
import { Users } from 'lucide-react';
import useInscriptionStore from '@stores/studentRegistrationStore';

const ParentInfo = () => {
    const formData = useInscriptionStore(s => s.formData);
    const errors = useInscriptionStore(s => s.errors);
    const updateFormData = useInscriptionStore(s => s.updateFormData);

    const handleChange = (field) => (e) => {
        updateFormData(field, e.target.value);
    };

    return (
        <form autoComplete="on" onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="alert alert-info">
                <label className="cursor-pointer label justify-start gap-3">
                    <input
                        type="checkbox"
                        checked={formData.isParentBooking}
                        onChange={(e) => {
                            updateFormData("isParentBooking", e.target.checked);
                            if (!e.target.checked) {
                                updateFormData("nomParent", "");
                                updateFormData("lienParente", "");
                                updateFormData("telephoneParent", "");
                            }
                        }}
                        className="checkbox checkbox-primary"
                    />
                    <div>
                        <span className="label-text font-medium">Un parent/tuteur effectue cette réservation</span>
                        <p className="text-xs opacity-70 mt-1">
                            Cochez si vous êtes un parent qui réserve pour votre enfant.
                        </p>
                    </div>
                </label>
            </div>

            {formData.isParentBooking ? (
                <div className="space-y-4 border-l-4 border-primary pl-4">
                    <h4 className="font-medium text-primary">Informations du parent</h4>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Nom du parent *</span></label>
                        <input
                            type="text"
                            autoComplete="name"
                            value={formData.nomParent}
                            onChange={handleChange("nomParent")}
                            className={`input input-bordered ${errors.nomParent ? "input-error" : ""}`}
                        />
                        {errors.nomParent && <span className="label-text-alt text-error">{errors.nomParent}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Lien de parenté *</span></label>
                        <select
                            value={formData.lienParente}
                            onChange={handleChange("lienParente")}
                            className={`select select-bordered ${errors.lienParente ? "select-error" : ""}`}
                            autoComplete="off"
                        >
                            <option value="">Sélectionnez</option>
                            <option value="PERE">Père</option>
                            <option value="MERE">Mère</option>
                            <option value="TUTEUR">Tuteur légal</option>
                            <option value="AUTRE">Autre</option>
                        </select>
                        {errors.lienParente && <span className="label-text-alt text-error">{errors.lienParente}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Téléphone du parent *</span></label>
                        <input
                            type="tel"
                            autoComplete="tel"
                            value={formData.telephoneParent}
                            onChange={handleChange("telephoneParent")}
                            className={`input input-bordered ${errors.telephoneParent ? "input-error" : ""}`}
                        />
                        {errors.telephoneParent && <span className="label-text-alt text-error">{errors.telephoneParent}</span>}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 opacity-60">
                    <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Les informations parentales ne sont pas requises.</p>
                </div>
            )}
        </form>
    );
};

export default ParentInfo;
