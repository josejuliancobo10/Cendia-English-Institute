@echo off
set "PATH=%USERPROFILE%\.gemini\antigravity\scratch\node;%PATH%"
cd /d "%~dp0"
echo ===================================================
echo  Desplegando Cendia English Institute en Vercel
echo ===================================================
call vercel --prod
pause
