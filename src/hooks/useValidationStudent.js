// hooks/useValidationStudent.ts
import useInscriptionStore from "@stores/studentRegistrationStore";

const validateStep1 = (data) => {
  const errors = {};
  if (!data.email) errors.email = "Email requis";
  else if (!data.email.includes("@")) errors.email = "Email invalide";
  if (!data.motDePasse) errors.motDePasse = "Mot de passe requis";
  else if (data.motDePasse.length < 8)
    errors.motDePasse = "8 caractères minimum";
  if (data.motDePasse !== data.confirmMotDePasse)
    errors.confirmMotDePasse = "Les mots de passe ne correspondent pas";
  if (!data.nom) errors.nom = "Nom requis";
  if (!data.prenom) errors.prenom = "Prénom requis";
  if (!data.sexe) errors.sexe = "Sexe requis";
  if (!data.dateNaissance) errors.dateNaissance = "Date de naissance requise";
  if (!data.villeEtude) errors.villeEtude = "La ville d'etude est requise";
  if (!data.Institut) errors.Institut = "L'institut est requis";
  return errors;
};

const validateStep2 = (data) => {
  const errors = {};
  if (!data.typeDocument) errors.typeDocument = "Type de document requis";
  if (!data.photoIdentite) errors.photoIdentite = "Photo d'identité requise";
  if (!data.pieceIdentite) errors.pieceIdentite = "Pièce d'identité requise";
  return errors;
};

const validateStep3 = (data) => {
  const errors = {};
  if (!data.nomParent) errors.nomParent = "Nom du parent requis";
  if (!data.lienParente) errors.lienParente = "Lien de parenté requis";
  if (!data.telephoneParent)
    errors.telephoneParent = "Téléphone du parent requis";
  return errors;
};

const validateStep = (step) => {
  const { formData, setErrors } = useInscriptionStore.getState();
  let errors = {};

  switch (step) {
    case 1:
      errors = validateStep1(formData);
      break;
    case 2:
      errors = validateStep2(formData);
      break;
    case 3:
      if (formData.isParentBooking) errors = validateStep3(formData);
      break;
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export default validateStep;
