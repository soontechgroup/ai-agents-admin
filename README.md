# AI Agents Admin

This repository contains the admin interface for managing AI agents.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Quick Start

### Using Scripts (Recommended)

#### Windows
```bash
# From the root directory
scripts/start-app.bat
```

#### Linux/Mac
```bash
# From the root directory
chmod +x scripts/start-app.sh
./scripts/start-app.sh
```

### Manual Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Development

The frontend is built with:
- React 18
- TypeScript
- Vite
- Context API for state management

### Available Scripts

In the frontend directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter
- `npm run preview` - Preview the production build locally

## Project Structure

```
ai-agents-admin/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── assets/   # Static assets
│   │   ├── context/  # React Context providers
│   │   ├── pages/    # Page components
│   │   └── ...
│   └── ...
└── scripts/          # Startup and utility scripts
```

## Troubleshooting

If you encounter any issues:

1. Make sure you have the correct Node.js version installed
2. Clear your npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then run `npm install` again
4. Check if all required ports are available (default: 5173)
