

const Finalize = ({formData, updateFormData, handleFinalize}) => {
    
    return (
        <div>
            <div className="form-control mt-6">
                <label className="cursor-pointer label justify-start gap-3">
                    <input
                        type="checkbox"
                        checked={formData.consentementCGU}
                        onChange={(e) => updateFormData('consentementCGU', e.target.checked)}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">
                        J'accepte les conditions générales d'utilisation et la politique de confidentialité *
                    </span>
                </label>
            </div>

            {
                !formData.consentementCGU && (
                    <div className="alert alert-error">
                        <span>Vous devez accepter les CGU pour continuer</span>
                    </div>
                )
            }

            <input type="hidden" name="username" value={formData.email} />
            <input type="hidden" name="role" value="ETUDIANT" />

            <div className="mt-8 text-right">
                <button
                    type="button"
                    onClick={handleFinalize}
                    disabled={!formData.consentementCGU}
                    className={`btn btn-primary btn-md px-8 font-semibold ${!formData.consentementCGU ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                >
                    Finaliser l'inscription
                </button>
            </div>
        </div>
    );
}


export default Finalize;
