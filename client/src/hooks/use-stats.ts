import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";

export function useStats() {
  return useQuery({
    queryKey: [api.stats.list.path],
    queryFn: async () => {
      const res = await fetch(api.stats.list.path);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.stats.list.responses[200].parse(await res.json());
    },
  });
}

export function useTrackView() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ toolId, name }: { toolId: string; name: string }) => {
      const url = buildUrl(api.stats.track.path, { toolId });
      const res = await apiRequest("POST", url, { name });
      return api.stats.track.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate stats to show updated view counts if visible
      queryClient.invalidateQueries({ queryKey: [api.stats.list.path] });
    },
  });
}
