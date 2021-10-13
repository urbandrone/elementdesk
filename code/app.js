(function () {
  'use strict';

  window.onmessage = (function(event) {
      console.log(event);
    return (function() {
      if ((event.source === window && event.data === "mainPort")) {
        return (function(port) {
                
          return port.postMessage({ getWidgets: true });
        })(event.ports[0]);
      }
    }).call(this);
  });

})();
