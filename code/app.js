(function () {
  'use strict';

  window.onmessage = (function(eventWin$1) {
      return (function() {
      if ((eventWin$1.source === window && eventWin$1.data === "mainPort")) {
        return (function(port$1) {
                
          window.mainPort = port$1;
          port$1.onmessage = (function(eventPort$1) {
                    
            return (function() {
              switch(eventPort$1.data.topic) {
              case "getWidgets":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widgets) {
                                        
                      return console.log("all", widgets);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("all", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetsByTags":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widgets) {
                                        
                      return console.log("byTags", widgets);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byTags", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetByName":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widget) {
                                        
                      return console.log("byName", widget);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byName", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              case "getWidgetById":
                return (function() {
                  switch(eventPort$1.data.type) {
                  case "ok":
                    return (function(widget) {
                                        
                      return console.log("byId", widget);
                    })(eventPort$1.data.payload);
                  
                  case "error":
                    return (function(exc) {
                                        
                      return console.log("byId", exc);
                    })(eventPort$1.data.payload);
                  
                  default:
                    return null;
                  }
                }).call(this);
              
              default:
                return null;
              }
            }).call(this);
          });
          return window.dispatchEvent((new CustomEvent("edPortSetup")));
        })(eventWin$1.ports[0]);
      }
    }).call(this);
  });
  window.addEventListener("edPortSetup", (function() {
      return (function(btnAll, btnTags, btnName, btnId) {
        
      var onClickAll = (function() {
            
        return (function() {
                
          return (function() {
            if (!(window.mainPort == null)) {
              return window.mainPort.postMessage({
                type: "getWidgets",
                payload: null
              });
            }
          }).call(this);
        }).call(this);
      });
      var onClickTags = (function() {
            
        return (function() {
                
          return (function() {
            if (!(window.mainPort == null)) {
              return window.mainPort.postMessage({
                type: "getWidgetsByTags",
                payload: "interactive"
              });
            }
          }).call(this);
        }).call(this);
      });
      var onClickName = (function() {
            
        return (function() {
                
          return (function() {
            if (!(window.mainPort == null)) {
              return window.mainPort.postMessage({
                type: "getWidgetByName",
                payload: "Accordion"
              });
            }
          }).call(this);
        }).call(this);
      });
      var onClickId = (function() {
            
        return (function() {
                
          return (function() {
            if (!(window.mainPort == null)) {
              return window.mainPort.postMessage({
                type: "getWidgetById",
                payload: 1
              });
            }
          }).call(this);
        }).call(this);
      });
      btnAll.addEventListener("click", onClickAll);
      btnTags.addEventListener("click", onClickTags);
      btnName.addEventListener("click", onClickName);
      return btnId.addEventListener("click", onClickId);
    })(document.querySelector(".all"), document.querySelector(".by-tags"), document.querySelector(".by-name"), document.querySelector(".by-id"));
  }));

})();
