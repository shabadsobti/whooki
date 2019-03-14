chrome.storage.local.get('auth_token', function(profileObj) {
  var token = profileObj.auth_token;
  if (typeof token === "undefined") {
    // No profile in storage
    console.log("Not Logged IN");
    window.location.href = "login.html";

  } else {
    // Profile exists in storage
    // Here u need to check if auth exists in DB and if it does, get feed. It it doesnt , back to login page

    console.log(token);

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      var url_div = document.getElementById('url');
      var pathArray = url.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      console.log(host);

      $.ajax({
          type : 'POST',
          url : 'http://localhost:8000/posts/get',
          data : {
              auth_token: token,
              website: host,
          },
          dataType: "json",
          success: function (msg) {
            console.log(msg)
            var newData = JSON.stringify(msg)
            var obj = jQuery.parseJSON(newData);
            if(obj.message == "User could not be authenticated"){
              window.location.href = "login.html";
            }

            jQuery.each(msg, function(index, item) {
              $( "#posts" ).append( "<div class='post_content'> <div class='post_header'>" + item.user_id + "</div> <div class='post_text'>"  + item.text + "</div> </div>" );
                console.log(item.user_id)

            });

          },
      });

  });
  }
});



// Still // TODO: Finish this part

$('#form').submit(function (event) {
    event.preventDefault();
    var text = $('#text').val();
    var website = ""

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var url_div = document.getElementById('url');
    var pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    website = host;
    console.log(host);
  });


    chrome.storage.local.get('auth_token', function(profileObj) {
      var token = profileObj.auth_token;
      if (typeof token === "undefined") {
        // No profile in storage
        console.log("Not Logged IN");
        window.location.href = "login.html";

      } else {
        if(text != ""){
          $.ajax({
              type : 'POST',
              url : 'http://localhost:8000/posts/add',
              data : {
                  text: text,
                  website: website,
                  auth_token: token,
              },
              dataType: "json",
              success: function (msg) {
                console.log(msg)
                var newData = JSON.stringify(msg)
                var obj = jQuery.parseJSON(newData);
                if(obj.message == "Post has been added"){
                  console.log("Post has been added");
                }
                else{
                  console.log("Not Logged IN");
                  window.location.href = "login.html";
                }

              },
          });
        }


        }

      });

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
