@echo off
setlocal enabledelayedexpansion

REM Paths to files
set fichier_csv="C:\Users\thewa\Downloads\EV\REF COMM.csv"
set fichier_compteur="C:\Users\thewa\Downloads\EV\product_counter.txt"
set image_1_carte="C:\Users\thewa\Downloads\EV\One.png"
set image_2_carte="C:\Users\thewa\Downloads\EV\Two.png"
set script_link="C:\Users\thewa\Downloads\EV\launch.bat"

REM Get user initials
set /p initiales=Enter your initials (e.g., DF):

REM Generate serial number (placeholder)
call :generer_numero_serie %initiales%

REM Request reference
set /p reference=Enter the reference:

REM Check if reference exists and get WB value
set "wb_value="
for /f "tokens=1,2 delims=," %%a in ('findstr /i %reference% %fichier_csv%') do (
    if "%%a"=="%reference%" set "wb_value=%%b"
)

if defined wb_value (
    echo WB value for reference %reference% is: %wb_value%
) else (
    echo Reference not found in CSV file.
    goto end
)

pause

REM Simulate button actions
:action_continuer
call :obtenir_compteur_produits
set /a compteur+=1
call :sauvegarder_compteur_produits %compteur%
echo Running command: %script_link% %reference% %numero_serie%
%script_link% %reference% %numero_serie%
echo Result: All good.

:end
echo Exiting...
exit /b

:obtenir_compteur_produits
set "compteur=1"
for /f "tokens=1,2 delims=," %%a in (%fichier_compteur%) do (
    if "%%a"=="%date%" set "compteur=%%b"
)
exit /b

:sauvegarder_compteur_produits
echo %date%,%1 > %fichier_compteur%
exit /b

:generer_numero_serie
REM Placeholder for serial number generation
set "numero_serie=%1_XXXXXX_00_001_001_65_43_21_0"
exit /b
