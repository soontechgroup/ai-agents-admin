#!/usr/bin/env pwsh

Write-Host "Checking prerequisites..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    if (-not $?) {
        throw "Node.js not found"
    }
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check Node.js version
$nodeVersion = node --version
$nodeVersionNumber = $nodeVersion.TrimStart('v').Split('.')[0]
if ([int]$nodeVersionNumber -lt 20) {
    Write-Host "Error: Node.js version must be 20 or higher" -ForegroundColor Red
    Write-Host "Current version: $nodeVersion" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    if (-not $?) {
        throw "npm not found"
    }
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if port 3000 is available
try {
    $portCheck = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($portCheck) {
        Write-Host "Error: Port 3000 is already in use" -ForegroundColor Red
        Write-Host "Please free up port 3000 and try again" -ForegroundColor Yellow
        exit 1
    }
} catch {
    # Port is available
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Dependencies already installed" -ForegroundColor Green
}

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "The application will be available at http://localhost:3000" -ForegroundColor Cyan
npm run dev 