# push.ps1 - Sube el proyecto a GitHub
Set-Location $PSScriptRoot

Write-Host "=========================================="
Write-Host " Contact List - Push a GitHub"
Write-Host "=========================================="
Write-Host ""

# Eliminar .git roto si existe
if (Test-Path ".git") {
    Write-Host "Eliminando repo git anterior..."
    Remove-Item -Recurse -Force ".git"
}

# Configurar usuario git
git config --global user.name "AvilaCarlosDev"
git config --global user.email "avilavaleriocarlos@gmail.com"

# Inicializar
Write-Host "Inicializando git..."
git init
git branch -M main

# Agregar remote
Write-Host "Configurando remote origin..."
git remote add origin https://github.com/AvilaCarlosDev/contact-list-react-context.git
git remote -v

# Verificar gh CLI
Write-Host ""
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if ($ghInstalled) {
    Write-Host "gh CLI encontrado. Verificando autenticacion..."
    $authStatus = gh auth status 2>&1
    Write-Host $authStatus

    # Intentar crear repo si no existe
    $repoExists = gh repo view AvilaCarlosDev/contact-list-react-context 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Creando repositorio en GitHub..."
        gh repo create AvilaCarlosDev/contact-list-react-context --public
    } else {
        Write-Host "Repositorio ya existe en GitHub."
    }
} else {
    Write-Host "gh CLI no encontrado. Usando credenciales de Windows..."
}

# Agregar archivos y commit
Write-Host ""
Write-Host "Agregando archivos..."
git add .
git status

Write-Host ""
Write-Host "Haciendo commit..."
git commit -m "Complete contact list CRUD with React Context"

Write-Host ""
Write-Host "Subiendo a GitHub..."
git push -u origin main

Write-Host ""
Write-Host "=========================================="
Write-Host " RESULTADO:"
git log --oneline --max-count=3
Write-Host ""
Write-Host "Repo: https://github.com/AvilaCarlosDev/contact-list-react-context"
Write-Host "=========================================="
Write-Host ""
Read-Host "Presiona Enter para cerrar"
