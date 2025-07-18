#!/bin/bash

echo "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d "v" -f 2 | cut -d "." -f 1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "Error: Node.js version must be 20 or higher"
    echo "Current version: $(node -v)"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

# Check if port 3000 is available
if command -v lsof &> /dev/null; then
    if lsof -i :3000 &> /dev/null; then
        echo "Error: Port 3000 is already in use"
        echo "Please free up port 3000 and try again"
        exit 1
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tuln | grep ":3000" &> /dev/null; then
        echo "Error: Port 3000 is already in use"
        echo "Please free up port 3000 and try again"
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    if ! npm install; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
else
    echo "Dependencies already installed"
fi

# Start the development server
echo "Starting Next.js development server..."
echo "The application will be available at http://localhost:3000"
npm run dev 