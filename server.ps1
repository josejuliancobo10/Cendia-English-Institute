# Native PowerShell HTTP Static Server for Cendia Website
param(
    [int]$Port = 8080,
    [string]$Path = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$Port/"
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host " CENDIA English Institute - Servidor Local Listo" -ForegroundColor Green
    Write-Host " URL: $url" -ForegroundColor Yellow
    Write-Host " Directorio: $Path" -ForegroundColor Gray
    Write-Host "=================================================" -ForegroundColor Cyan
} catch {
    Write-Error "No se pudo iniciar el servidor en el puerto $Port. Error: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.Url.LocalPath
        if ($rawUrl -eq "/" -or [string]::IsNullOrWhiteSpace($rawUrl)) {
            $rawUrl = "/index.html"
        }

        # Normalize relative path
        $relativeFilePath = $rawUrl.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $localFilePath = [System.IO.Path]::Combine($Path, $relativeFilePath)

        if (Test-Path $localFilePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200] $($request.HttpMethod) $rawUrl ($contentType)" -ForegroundColor Green
        } else {
            # Try index.html as fallback or 404
            $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("<html><body><h1>404 Not Found</h1><p>Archivo no encontrado: $rawUrl</p></body></html>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.StatusCode = 404
            $response.ContentLength64 = $notFoundMsg.Length
            $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
            Write-Host "[404] $($request.HttpMethod) $rawUrl" -ForegroundColor Red
        }

        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
