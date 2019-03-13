// document.addEventListener('DOMContentLoaded', function() {
//     var checkPageButton = document.getElementById('clickIt');
//     checkPageButton.addEventListener('click', function() {
//
//       chrome.tabs.getSelected(null, function(tab) {
//         alert("Hello..! It's my first chrome extension.");
//       });
//     }, false);
//   }, false);

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var url_div = document.getElementById('url');
    var pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    // url_div.innerHTML = host;
});


$('#form').submit(function (event) {
    event.preventDefault();
    console.log("PRessed");
    $("#password-error").html('');
    $("#username-error").html('');
    var errors = 0;
    var username = $('#username').val();
    var password = $('#password').val();
    if (password == ""){
      errors = errors+1;
        $("#password-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
    }

    if (username == ""){
      errors = errors+1;
      console.log("Username is empty")
        $("#username-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
    }

    if (errors == 0){
      $.ajax({
          type : 'POST',
          url : 'http://localhost:8000/users/login',
          data : {
              username: username,
              password: password,
          },
          dataType: "json",
          success: function (msg) {
            console.log(msg)
            var newData = JSON.stringify(msg)
            var obj = jQuery.parseJSON(newData);
            if(obj.message == "Login Success"){
              $("#message").html('').html('<p> Login Success </p> ');
              chrome.storage.local.set({auth_token: obj.token}, function() {
                console.log('Value is set to ' + obj.token);
                window.location.href = "feed.html";
              });
            }
            else{
              $("#message").html('').html('<p> Login Error! Please check your credentials. </p> ');
            }


            // "You have been registered"
          },
      });

    }
});
