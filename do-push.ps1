# do-push.ps1 - Solo commit y push (repo ya creado en GitHub)
Set-Location $PSScriptRoot

Write-Host "=== GIT STATUS ===" -ForegroundColor Cyan
git status

Write-Host "`n=== CONFIGURANDO REMOTE ===" -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/AvilaCarlosDev/contact-list-react-context.git
git remote -v

Write-Host "`n=== GIT ADD ===" -ForegroundColor Cyan
git add .

Write-Host "`n=== GIT COMMIT ===" -ForegroundColor Cyan
$commitResult = git commit -m "Complete contact list CRUD with React Context" 2>&1
Write-Host $commitResult

Write-Host "`n=== GIT PUSH ===" -ForegroundColor Cyan
git push -u origin main 2>&1

Write-Host "`n=== RESULTADO ===" -ForegroundColor Green
git log --oneline --max-count=3
Write-Host ""
Write-Host "Repo: https://github.com/AvilaCarlosDev/contact-list-react-context" -ForegroundColor Green
Write-Host ""
Read-Host "Presiona Enter para cerrar"
