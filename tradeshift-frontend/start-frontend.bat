@echo off
title 🌐 TradeShift Frontend

echo ============================================
echo       Starting TradeShift React Frontend
echo ============================================

REM ✅ Kill any old Node.js process
taskkill /IM node.exe /F >nul 2>&1

REM ✅ Start Frontend
cd /d C:\Users\Asus\OneDrive\Desktop\Tradeshift\tradeshift-frontend
echo 🌍 Starting React app...
npm start -- --no-open

REM ✅ Wait and open browser once
timeout /t 10 >nul
start "" "http://localhost:3000"

pause
exit
