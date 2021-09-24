const _subject_ = "ElementDesk";
const greetBy = (function(greeting) {
    return (function(subject) {
      
    return (greeting + " " + subject);
  });
});
const run = (function() {
    return (function() {
      
    let greet = greetBy("Hello and welcome to");
    let textn = document.createTextNode(greet(_subject_));
    return (function() {
          
      return document.body.insertBefore(textn, document.body.firstElementChild);
    })();
  }).call(this);
});
run();