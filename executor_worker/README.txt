executor_worker README

The executor_worker runs jobs posted to src/rest/executor. For example, some plugins post jobs. Jobs are run by downloading a blob from the WebGME server, then running a command, then uploading some or all of the produced files to the blob store.

The executor_worker may run on a different machine than the WebGME server.


To run the GUI executor worker on Windows:

Download node-webkit (e.g. http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-win-ia32.zip) and unzip into this directory.
  curl -f -O http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-win-ia32.zip
  "c:\Program Files\7-Zip\7z.exe" x node-webkit-v0.9.2-win-ia32.zip
Run:
  npm install
  copy config_example.json config.json
Edit config.json
With WebGME started, run nw.exe


Implementation TODO:
Recover from transient errors
Handle disconnecting/reconnecting of workers more gracefully
Expose REST API for workers
