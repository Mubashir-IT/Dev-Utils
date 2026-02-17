import { z } from 'zod';
import { toolStats } from './schema';

export const api = {
  stats: {
    list: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.array(z.object({
          toolId: z.string(),
          name: z.string(),
          views: z.number()
        })),
      },
    },
    track: {
      method: 'POST' as const,
      path: '/api/stats/:toolId/view' as const,
      input: z.object({
        name: z.string() // Send the human-readable name to initialize if missing
      }),
      responses: {
        200: z.object({ success: z.boolean() }),
        404: z.object({ message: z.string() }),
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
