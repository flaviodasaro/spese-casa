@echo off
cd %~dp0
set /p _folderName="Enter Folder Name: "
cd ..
mkdir %_folderName%
cd %_folderName%

echo. 2>actions.js
echo. 2>actionTypes.js
echo. 2>reducer.js
echo. 2>selectors.js

echo:created empty files

set "line1=const initialState = {};"
set "line2=export const %_folderName%Reducer = (state = initialState, action^) =^> {"
set "line3=switch(action.type^){"
set "line4=default: {"
set "line5=return state; "
set "line6=}"
set "line7=}}"

::echo %line1%
::echo %line2%
::echo %lineA%
::echo %line4%
::echo %line5%
::echo %line6%
::echo %line7%

set /p pressAny2="Press any key and press enter to exit"

(echo %line1%) 1>>reducer.js
(echo %line2%) 1>>reducer.js
(echo %line3%) 1>>reducer.js
(echo %line4%) 1>>reducer.js
(echo %line5%) 1>>reducer.js
(echo %line6%) 1>>reducer.js
(echo %line7%) 1>>reducer.js

set /p pressAny3="Press any key and press enter to exit"


exit
