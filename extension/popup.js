document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('clickIt');
    checkPageButton.addEventListener('click', function() {

      chrome.tabs.getSelected(null, function(tab) {
        alert("Hello..! It's my first chrome extension.");
      });
    }, false);
  }, false);

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var url_div = document.getElementById('url');
    var pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    url_div.innerHTML = host;

});

var email = document.getElementById("email").value;
var password = document.getElementById("password").value;

chrome.runtime.getBackgroundPage(function(bgPage){
    bgPage.performLogin(email,password);
});
