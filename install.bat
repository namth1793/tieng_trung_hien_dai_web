@echo off
echo ============================================
echo  Cai dat Trung Tam Tieng Trung Hiep Lam
echo ============================================
echo.

echo [1/2] Cai dat Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo LOI: Khong the cai dat backend!
    pause
    exit /b 1
)
echo Backend da cai dat thanh cong!
echo.

echo [2/2] Cai dat Frontend...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo LOI: Khong the cai dat frontend!
    pause
    exit /b 1
)
echo Frontend da cai dat thanh cong!
echo.

echo ============================================
echo  Cai dat hoan tat!
echo  Chay start.bat de khoi dong ung dung.
echo ============================================
pause
