import axiosInstance from "@services/axiosInstance";


export const fetchProfileData = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

// @hooks/useProfileQuery.js
import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from "@stores/studentProfileStore";

export const useProfileStudentQuery = () => {
  const { profile, setProfile } = useProfileStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Si Zustand a déjà les données, on les renvoie directement
      if (profile) return profile;

      // Sinon, on fetch et on synchronise
      const data = await fetchProfileData();
      setProfile(data);
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
