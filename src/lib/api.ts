import { z } from "zod";

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = {
  stats: {
    list: {
      path: "/api/stats" as const,
      responses: {
        200: z.array(
          z.object({
            toolId: z.string(),
            name: z.string(),
            views: z.number(),
          })
        ),
      },
    },
    track: {
      path: "/api/stats/:toolId/view" as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
