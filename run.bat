@echo off
rem Double-click: chay server chung khong cache cho moi site (<repo>\src) va mo trang muc luc.
rem Dong cua so nay de dung. Chi dung ASCII trong file nay: chu co dau lam cmd doc lech dong.
cd /d "%~dp0"

set "PY=python"
where python >nul 2>nul || set "PY=py"
where %PY% >nul 2>nul || (
  echo Khong tim thay Python. Cai Python 3 tu python.org roi chay lai.
  pause
  exit /b 1
)

%PY% serve.py --open %*
if errorlevel 1 pause
