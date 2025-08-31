import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Les données sont considérées comme "fraîches" pendant 5 minutes
      refetchOnWindowFocus: false, // Désactive le re-fetching automatique lorsque la fenêtre retrouve le focus
    },
  },
});
