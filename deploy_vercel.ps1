# Despliegue en Vercel usando Vercel CLI
$env:PATH = "$HOME\.gemini\antigravity\scratch\node;$env:PATH"
Set-Location $PSScriptRoot

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " Desplegando Cendia English Institute en Vercel" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan

& vercel --prod
