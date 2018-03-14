set myvar="%1build.js"
echo %myvar%;
>%myvar% (for /r %1 %%F in (*.js) do type "%%F")