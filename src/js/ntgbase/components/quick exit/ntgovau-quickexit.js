// quickexit.js 1236986 is to be moved to git when ready

function quickExit() {
  // Get away right now
  window.open("https://nt.gov.au", "_newtab");
  // Replace current site with another benign site
  window.location.replace('https://www.google.com');
}

$(function() {

  $("#quickexit").on("click", function(e) {
    quickExit();
  });

  $("#quickexit a").on("click", function(e) {
    // allow the link to work
    e.stopPropagation();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key
      quickExit();
    }
  });

});
 
 
 

