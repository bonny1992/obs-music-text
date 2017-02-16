@echo off
echo Installing PyWin32 (the x32 version, if you want to change it)
easy_install __files__/pywin32.exe
echo Installing other requirements
pip install -r requirements.txt
echo Now you can close the window pressing a key
pause