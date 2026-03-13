@echo off
:loop
cd /d "C:\Users\Shaik Mohammad Ajhaj\OneDrive\Desktop\super hopper"
git add .
git commit -m "auto-commit: %date% %time%"
git push origin main
timeout /t 2700 /nobreak
goto loop