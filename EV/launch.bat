@echo off
:: Check if the first argument is provided, set refProd accordingly
if not "%~1"=="" (
  set "refProd=%~1"
) else (
  set "refProd=NEW_REFERENCE"
)

:: Check if the second argument is provided, set datamatrix accordingly
if not "%~2"=="" (
  set "datamatrix=%~2"
) else (
  set "datamatrix=NEW_DATAMATRIX"
)

:: Output the values of the variables
echo refProd: %refProd%
echo datamatrix: %datamatrix%
