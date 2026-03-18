@echo off
echo ============================================
echo  Khoi dong Trung Tam Tieng Trung Hiep Lam
echo ============================================
echo.
echo Backend : http://localhost:5006
echo Frontend: http://localhost:3000
echo.

start cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 2 /nobreak >nul
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo Ung dung dang khoi dong...
echo Mo trinh duyet tai: http://localhost:3000
timeout /t 3 /nobreak >nul
start http://localhost:3000
