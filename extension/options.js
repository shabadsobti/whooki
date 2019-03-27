chrome.storage.local.get('auth_token', function(profileObj) {
  var token = profileObj.auth_token;
  if (typeof token === "undefined") {
    // No profile in storage
    console.log("Not Logged IN");
    window.location.href = "login-options.html";

  } else {

  }
});
