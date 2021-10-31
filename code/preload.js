'use strict';

var electron = require("electron");
var __ipc = electron.ipcRenderer;
(function(onLoad) {
    return __ipc.on("sendPort", (function(event) {
      
    return onLoad.then((function() {
          
      return window.postMessage("mainPort", "*", event.ports);
    }));
  }));
})((new Promise((function(ok) {
    return window.onload = ok;
}))));
