// stores/studentRegistrationStore.ts
import { create } from "zustand";

const initialFormData = {
  email: "",
  motDePasse: "",
  confirmMotDePasse: "",
  nom: "",
  prenom: "",
  telephone: "",
  consentementCGU: false,
  sexe: "",
  dateNaissance: "",
  typeDocument: "",
  Institut: "",
  isParentBooking: false,
  nomParent: "",
  lienParente: "",
  telephoneParent: "",
  photoIdentite: null,
  pieceIdentite: null,
};

const useInscriptionStore = create((set) => ({
  currentStep: 1,
  formData: { ...initialFormData },
  errors: {},
  filePreviews: {},

  updateFormData: (field, value) =>
    set((state) => {
      const newErrors = { ...state.errors };
      if (newErrors[field]) delete newErrors[field];
      return {
        formData: { ...state.formData, [field]: value },
        errors: newErrors,
      };
    }),

  setErrors: (errors) => set({ errors }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setFilePreviews: (previews) => set({ filePreviews: previews }),

  resetForm: () =>
    set({
      formData: { ...initialFormData },
      errors: {},
      filePreviews: {},
      currentStep: 1,
    }),
}));

export default useInscriptionStore;
