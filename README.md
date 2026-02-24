# Frontend

React SPA built with Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Structure

- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks (useStats, useToast, etc.)
- `src/lib/` - Utilities, API client, tools config
- `src/pages/` - Route pages and tool implementations

## Path Aliases

- `@/*` → `src/*`
- API config in `src/lib/api.ts` (paths, base URL)

## Development

Run from project root: `npm run dev`

The frontend is served by the backend's Vite middleware in development.
