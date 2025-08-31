import { Rooms } from "@utils/Const";

/**
 * Simule la récupération des données de logements depuis un backend.
 * @returns {Promise<Array>} Une promesse qui résout avec la liste des logements après un délai.
 */
export const fetchRooms = async () => {
  return new Promise((resolve) => {
    // Simule un délai de 1 seconde pour le réseau
    setTimeout(() => {
      resolve(Rooms);
    }, 4000);
  });
};
