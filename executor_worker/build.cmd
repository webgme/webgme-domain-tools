cmd /c npm install || exit /b 3
cmd /c npm install webgme || exit /b 4
node node_modules\requirejs\bin\r.js -o rjs_build_node_worker.js
