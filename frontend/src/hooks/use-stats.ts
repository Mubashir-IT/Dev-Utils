import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE, api, buildUrl } from "@/lib/api";
import { apiRequest } from "@/lib/queryClient";

export function useStats() {
  return useQuery({
    queryKey: [API_BASE, api.stats.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${api.stats.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.stats.list.responses[200].parse(await res.json());
    },
  });
}

export function useTrackView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ toolId, name }: { toolId: string; name: string }) => {
      const url = `${API_BASE}${buildUrl(api.stats.track.path, { toolId })}`;
      const res = await apiRequest("POST", url, { name });
      return api.stats.track.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_BASE, api.stats.list.path] });
    },
  });
}
