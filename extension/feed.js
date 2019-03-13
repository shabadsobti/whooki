chrome.storage.local.get('auth_token', function(profileObj) {
  var token = profileObj.auth_token;
  if (typeof token === "undefined") {
    // No profile in storage
    console.log("Not Logged IN");

  } else {
    // Profile exists in storage
    // Here u need to check if auth exists in DB and if it does, get feed. It it doesnt , back to login page

    console.log(token);

  }
});



$('#logout').click( function(e) {

  e.preventDefault();

  chrome.storage.local.remove(["auth_token"],function(){
    window.location.href = "login.html";
   var error = chrome.runtime.lastError;
      if (error) {
          console.error(error);
      }
  })


});
