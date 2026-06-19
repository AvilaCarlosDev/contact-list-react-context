@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo  CONTACT LIST - Push to GitHub
echo ==========================================
echo.

REM Limpiar .git roto si existe
if exist ".git" (
    echo Removiendo repo git anterior...
    rmdir /s /q .git
)

REM Configurar usuario git global si no está
git config --global user.name "AvilaCarlosDev" >nul 2>&1
git config --global user.email "avilavaleriocarlos@gmail.com" >nul 2>&1

REM Inicializar repositorio
echo Inicializando git...
git init
git branch -M main

REM Verificar .gitignore
echo node_modules>> .gitignore.tmp
echo dist>> .gitignore.tmp
echo .env>> .gitignore.tmp
type .gitignore | findstr /v "node_modules" | findstr /v "^dist$" | findstr /v "^.env$" > .gitignore.clean 2>nul
copy /y .gitignore.clean .gitignore >nul 2>nul
del .gitignore.tmp .gitignore.clean >nul 2>nul

REM Verificar si gh CLI está disponible
where gh >nul 2>&1
if %errorlevel% == 0 (
    echo.
    echo GitHub CLI encontrado. Verificando autenticacion...
    gh auth status
    if %errorlevel% == 0 (
        echo.
        echo Creando o verificando repositorio en GitHub...
        gh repo view AvilaCarlosDev/contact-list-react-context >nul 2>&1
        if %errorlevel% neq 0 (
            echo Creando repositorio publico...
            gh repo create AvilaCarlosDev/contact-list-react-context --public --source=. --remote=origin --push
            goto :done
        ) else (
            echo Repositorio ya existe. Configurando remote...
            git remote add origin https://github.com/AvilaCarlosDev/contact-list-react-context.git 2>nul
            git remote set-url origin https://github.com/AvilaCarlosDev/contact-list-react-context.git
        )
    ) else (
        echo.
        echo gh CLI no esta autenticado. Usando HTTPS...
        git remote add origin https://github.com/AvilaCarlosDev/contact-list-react-context.git 2>nul
        git remote set-url origin https://github.com/AvilaCarlosDev/contact-list-react-context.git
    )
) else (
    echo.
    echo gh CLI no encontrado. Usando HTTPS...
    git remote add origin https://github.com/AvilaCarlosDev/contact-list-react-context.git 2>nul
    git remote set-url origin https://github.com/AvilaCarlosDev/contact-list-react-context.git
)

echo.
echo Remote configurado:
git remote -v

echo.
echo Agregando archivos...
git add .
git status

echo.
echo Haciendo commit...
git commit -m "Complete contact list CRUD with React Context"

echo.
echo Subiendo a GitHub...
git push -u origin main

:done
echo.
echo ==========================================
echo  LISTO
echo ==========================================
git log --oneline --max-count=3
echo.
echo Repositorio: https://github.com/AvilaCarlosDev/contact-list-react-context
echo.
pause
