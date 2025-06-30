@echo off
setlocal enabledelayedexpansion

echo Checking prerequisites...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

:: Check Node.js version
for /f "tokens=1,2,3 delims=." %%a in ('node -v') do (
    set NODE_VER=%%a
    set NODE_VER=!NODE_VER:~1!
)
if !NODE_VER! lss 18 (
    echo Error: Node.js version must be 18 or higher
    echo Current version: !NODE_VER!
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed or not in PATH
    exit /b 1
)

:: Check if port 5173 is available
netstat -ano | findstr :5173 >nul
if %ERRORLEVEL% equ 0 (
    echo Error: Port 5173 is already in use
    echo Please free up port 5173 and try again
    exit /b 1
)

:: Navigate to frontend directory
cd frontend

:: Check if node_modules exists
if not exist node_modules\ (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Error: Failed to install dependencies
        exit /b 1
    )
) else (
    echo Dependencies already installed
)

:: Start the development server
echo Starting development server...
call npm run dev

endlocal 