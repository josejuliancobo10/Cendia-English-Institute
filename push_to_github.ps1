# Script para subir cambios al repositorio de GitHub
param(
    [string]$GitHubToken = ""
)

$git = "$HOME\.gemini\antigravity\scratch\mingit\cmd\git.exe"

if (-not (Test-Path $git)) {
    Write-Error "Git no se encontró en la ruta esperada."
    exit 1
}

if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host " Subir a GitHub: Cendia-English-Institute" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host "Para autenticarte con GitHub necesitas un Personal Access Token (PAT)." -ForegroundColor Yellow
    Write-Host "Puedes generar uno en: https://github.com/settings/tokens (Permiso: repo)" -ForegroundColor Gray
    Write-Host ""
    $GitHubToken = Read-Host "Ingresa tu GitHub Personal Access Token"
}

if ([string]::IsNullOrWhiteSpace($GitHubToken)) {
    Write-Error "No se proporcionó ningún token."
    exit 1
}

$remoteUrl = "https://${GitHubToken}@github.com/josejuliancobo10/Cendia-English-Institute.git"

Write-Host "Actualizando remote origin y subiendo rama main..." -ForegroundColor Cyan
& $git remote set-url origin $remoteUrl
& $git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host " ¡Archivos subidos exitosamente a GitHub!" -ForegroundColor Green
    Write-Host " Repositorio: https://github.com/josejuliancobo10/Cendia-English-Institute" -ForegroundColor Cyan
    Write-Host ""
    Write-Host " Para publicar en Vercel:" -ForegroundColor Yellow
    Write-Host " 1. Abre https://vercel.com/new" -ForegroundColor White
    Write-Host " 2. Inicia sesión con GitHub e importa 'Cendia-English-Institute'" -ForegroundColor White
    Write-Host " 3. Haz clic en 'Deploy' (¡Se publicará en segundos con URL pública gratuita y HTTPS!)" -ForegroundColor White
    Write-Host "=================================================" -ForegroundColor Cyan
    
    # Clean token from git config url for security
    & $git remote set-url origin "https://github.com/josejuliancobo10/Cendia-English-Institute.git"
} else {
    Write-Error "Hubo un problema al hacer push. Verifica que el token tenga permisos 'repo'."
    & $git remote set-url origin "https://github.com/josejuliancobo10/Cendia-English-Institute.git"
}
