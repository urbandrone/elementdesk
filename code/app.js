(function () {
  'use strict';

  window.onmessage = (function(eventWin$1) {
      return (function() {
      if ((eventWin$1.source === window && eventWin$1.data === "mainPort")) {
        return (function(port$1) {
                
          window.mainPort = port$1;
          return port$1.onmessage((function(eventPort$1) {
                    
            return (function() {
              switch(eventPort$1.data.topic) {
              case "getWidgets":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widgets) {
                                        
                      return console.log(widgets);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log(exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              default:
                return null;
              }
            }).call(this);
          }));
        })(eventWin$1.ports[0]);
      }
    }).call(this);
  });
  (function() {
      return (window.mainPort && window.mainPort.postMessage({
      type: "getWidgets",
      payload: null
    }));
  }).call(undefined);

})();
