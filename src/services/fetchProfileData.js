import { mockProfileData } from "@utils/Const";


// Fonction de simulation de requête (TanStack Query)
export const fetchProfileData = async () => {
  // Simuler un délai de 5 secondes pour le chargement
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockProfileData;
};
