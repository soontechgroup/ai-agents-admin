# AI Agents Admin

This repository contains the admin interface for managing AI agents.

## Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)
- Git

## Environment Setup

Create a `.env.local` file in the root directory with the following content:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Quick Start

### Using Scripts (Recommended)

#### Windows
```powershell
# From the root directory
.\scripts\start-app.ps1
```

#### Linux/Mac
```bash
# From the root directory
chmod +x scripts/start-app.sh
./scripts/start-app.sh
```

### Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Development

The application is built with:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Context API for state management

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run start` - Runs the production build
- `npm run lint` - Runs the linter

## Project Structure

```
ai-agents-admin/
├── app/              # Next.js App Router pages
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   ├── login/       # Login page
│   └── register/    # Register page
├── components/      # React components
│   └── providers/   # Context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and types
└── scripts/         # Startup and utility scripts
```

## Troubleshooting

If you encounter any issues:

1. Make sure you have the correct Node.js version installed
2. Clear your npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then run `npm install` again
4. Check if all required ports are available (default: 3000)
