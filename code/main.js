'use strict';

var electron = require("electron"),
    path = require("path");
var be = require("./backend");
var __app = electron.app;
var __com = electron.MessageChannelMain;
var __bw = electron.BrowserWindow;
var __opt = {
  width: 800,
  height: 600,
  webPreferences: { preload: path.join(__dirname, "preload.js") }
};
var makeWindow = (function() {
    return (function(mainWindow) {
      
    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();
    return (function() {
          
      var ports$1 = (new __com());
      var portR$1 = ports$1.port1;
      var portM$1 = ports$1.port2;
      return (function() {
              
        portM$1.on("message", (function(event$1) {
                  
          return (function() {
            switch(event$1.data.type) {
            case "getWidgets":
              return (function() {
                              
                return be.getWidgets().runTask((function(err) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgets",
                    type: "error",
                    payload: err
                  });
                }), (function(data) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgets",
                    type: "ok",
                    payload: data
                  });
                }));
              })();
            
            case "getWidgetsByTags":
              return (function(tags) {
                              
                return be.getWidgetsByTags(tags).runTask((function(err) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetsByTags",
                    type: "error",
                    payload: err
                  });
                }), (function(data) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetsByTags",
                    type: "ok",
                    payload: data
                  });
                }));
              })(event$1.data.payload);
            
            case "getWidgetById":
              return (function(id) {
                              
                return be.getWidgetById(id).runTask((function(err) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetById",
                    type: "error",
                    payload: err
                  });
                }), (function(data) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetById",
                    type: "ok",
                    payload: data
                  });
                }));
              })(event$1.data.payload);
            
            case "getWidgetByName":
              return (function(name) {
                              
                return be.getWidgetByName(name).runTask((function(err) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetByName",
                    type: "error",
                    payload: err
                  });
                }), (function(data) {
                                  
                  return portM$1.postMessage({
                    topic: "getWidgetByName",
                    type: "ok",
                    payload: data
                  });
                }));
              })(event$1.data.payload);
            
            default:
              return null;
            }
          }).call(this);
        }));
        portM$1.start();
        return mainWindow.webContents.postMessage("sendPort", null, [ portR$1 ]);
      })();
    }).call(this);
  })((new __bw(__opt)));
});
var initWindow = (function() {
    makeWindow();
  return __app.on("activate", onActivate);
});
var onActivate = (function() {
    return (function() {
    if (0 === __bw.getAllWindows().length) {
      return makeWindow();
    }
  }).call(this);
});
var onClosed = (function() {
    return (function() {
    if (!("darwin" === process.platform)) {
      return __app.quit();
    }
  }).call(this);
});
__app.whenReady().then(initWindow);
__app.on("window-all-closed", onClosed);
