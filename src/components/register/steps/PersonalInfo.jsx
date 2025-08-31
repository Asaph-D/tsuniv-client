// components/register/steps/PersonalInfo.tsx
import useInscriptionStore from '@stores/studentRegistrationStore';
import PhoneInput from '../../shared/PhoneInput';

const PersonalInfo = () => {
    const formData = useInscriptionStore(s => s.formData);
    const errors = useInscriptionStore(s => s.errors);
    const updateFormData = useInscriptionStore(s => s.updateFormData);

    const handleChange = (field) => (e) => {
        updateFormData(field, e.target.value);
    };

    return (
        <form autoComplete="on" onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {/* Colonne 1 : champs texte */}
            <div className="space-y-4">
                <div className="form-control">
                    <label className="label"><span className="label-text">Nom *</span></label>
                    <input
                        type="text"
                        autoComplete="family-name"
                        value={formData.nom}
                        onChange={handleChange('nom')}
                        className={`input input-bordered w-full ${errors.nom ? 'input-error' : ''}`}
                    />
                    {errors.nom && <span className="label-text-alt text-error">{errors.nom}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Prénom *</span></label>
                    <input
                        type="text"
                        autoComplete="given-name"
                        value={formData.prenom}
                        onChange={handleChange('prenom')}
                        className={`input input-bordered w-full ${errors.prenom ? 'input-error' : ''}`}
                    />
                    {errors.prenom && <span className="label-text-alt text-error">{errors.prenom}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Email *</span></label>
                    <input
                        type="email"
                        autoComplete="username"
                        value={formData.email}
                        onChange={handleChange('email')}
                        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <span className="label-text-alt text-error">{errors.email}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Mot de passe *</span></label>
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={formData.motDePasse}
                        onChange={handleChange('motDePasse')}
                        className={`input input-bordered w-full ${errors.motDePasse ? 'input-error' : ''}`}
                    />
                    {errors.motDePasse && <span className="label-text-alt text-error">{errors.motDePasse}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Confirmer le mot de passe *</span></label>
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={formData.confirmMotDePasse}
                        onChange={handleChange('confirmMotDePasse')}
                        className={`input input-bordered w-full ${errors.confirmMotDePasse ? 'input-error' : ''}`}
                    />
                    {errors.confirmMotDePasse && <span className="label-text-alt text-error">{errors.confirmMotDePasse}</span>}
                </div>
            </div>

            {/* Colonne 2 : téléphone, sexe, date, ville */}
            <div className="space-y-4">
                <div className="form-control">
                    <label className="label"><span className="label-text">Téléphone *</span></label>
                    <PhoneInput autoComplete="tel" />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Sexe *</span></label>
                    <select
                        value={formData.sexe}
                        onChange={handleChange('sexe')}
                        className={`select select-bordered w-full ${errors.sexe ? 'select-error' : ''}`}
                    >
                        <option value="">Sélectionnez</option>
                        <option value="MASCULIN">Masculin</option>
                        <option value="FEMININ">Féminin</option>
                    </select>
                    {errors.sexe && <span className="label-text-alt text-error">{errors.sexe}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Date de naissance *</span></label>
                    <input
                        type="date"
                        autoComplete="bday"
                        value={formData.dateNaissance}
                        onChange={handleChange('dateNaissance')}
                        className={`input input-bordered w-full ${errors.dateNaissance ? 'input-error' : ''}`}
                    />
                    {errors.dateNaissance && <span className="label-text-alt text-error">{errors.dateNaissance}</span>}
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Institut</span></label>
                    <input
                        type="text"
                        autoComplete="address-level2"
                        value={formData.villeEtude}
                        onChange={handleChange('institut')}
                        className={`input input-bordered w-full ${errors.villeEtude ? 'input-error' : ''}`}
                    />
                    {errors.villeEtude && <span className="label-text-alt text-error">{errors.villeEtude}</span>}
                </div>
            </div>

            {/* Champs cachés pour les gestionnaires de mot de passe */}
            <input type="hidden" name="role" value="ETUDIANT" />
            <input type="hidden" name="username" value={formData.email} />
        </form>
    );
};

export default PersonalInfo;
