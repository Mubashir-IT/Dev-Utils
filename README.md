# Dev-Utils

A full-stack developer tools application with a React frontend and Express backend.

## Project Structure

```
Dev-Utils/
├── frontend/          # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/   # UI components (shadcn/ui)
│   │   ├── hooks/       # React hooks
│   │   ├── lib/        # Utilities, API client
│   │   └── pages/      # Route pages & tools
│   └── index.html
│
├── backend/           # Express API server
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API route handlers
│   ├── db.ts          # Database connection (Drizzle)
│   ├── storage.ts     # Data access layer
│   ├── schema.ts      # Drizzle schema
│   └── api.ts         # API route definitions
│
└── migrations/       # Drizzle migrations
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (for `DATABASE_URL`)

### Setup

1. Install dependencies (run in each folder):
   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

2. Create `.env` in **backend/** folder with:
   ```
   DATABASE_URL=postgresql://user:pass@localhost:5432/devutils
   PORT=5000
   ```

3. Push database schema (from backend folder):
   ```bash
   cd backend && npm run db:push
   ```

### Development

```bash
cd backend && npm run dev
```

Starts the API server on port 5000. Run frontend separately:

```bash
cd frontend && npm run dev
```

Frontend runs on port 5173 and calls the API via CORS.

### Production Build

```bash
cd backend && npm run build
cd backend && npm run start
```

Builds backend to `dist/index.cjs`. Build frontend separately: `cd frontend && npm run build`. Deploy each independently.

## Available Tools

- JSON Formatter
- Base64 Converter
- Timestamp Converter
- Password Generator
- Word Counter
- Color Generator
- Age Calculator
- BMI Calculator
