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
if !NODE_VER! lss 20 (
    echo Error: Node.js version must be 20 or higher
    echo Current version: v!NODE_VER!
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed or not in PATH
    exit /b 1
)

:: Check if port 3000 is available
netstat -ano | findstr :3000 >nul
if %ERRORLEVEL% equ 0 (
    echo Error: Port 3000 is already in use
    echo Please free up port 3000 and try again
    exit /b 1
)

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
echo Starting Next.js development server...
echo The application will be available at http://localhost:3000
call npm run dev

endlocal 