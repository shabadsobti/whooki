$('#form').submit(function (event) {
    event.preventDefault();
    console.log("PRessed");
    $("#password-error").html('');
    $("#username-error").html('');
    $("#email-error").html('');

    var errors = 0;
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();
    if (email == ""){
      errors = errors+1;
      console.log("Email is empty")
      $("#email-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
    }

    if (password == ""){
      errors = errors+1;
        $("#password-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
    }

    if (username == ""){
      errors = errors+1;
      console.log("Username is empty")
        $("#username-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
    }


    $.ajax({
        type : 'GET',
        url : 'http://localhost:8000/users/username/' + username,
        dataType: "json",
        success: function (msg) {
          var newData = JSON.stringify(msg)
          var obj = jQuery.parseJSON(newData);
          if(obj.message == "Username is taken, try something else."){
            errors = errors + 1;
            console.log("Username is taken")
            $("#username-error").html('').html('<i class="fas fa-exclamation-circle"></i> ');
          }
          if (errors == 0){
            $.ajax({
                type : 'POST',
                url : 'http://localhost:8000/users/register',
                data : {
                    username: username,
                    email: email,
                    password: password,
                },
                dataType: "json",
                success: function (msg) {
                  console.log(msg)
                  var newData = JSON.stringify(msg)
                  var obj = jQuery.parseJSON(newData);
                  if(obj.message == "You have been registered"){
                    document.getElementById("register").disabled = true;
                    document.getElementById("register").value = "Done!";
                    $("#message").html('').html('<p> You have been registered! </p> ');
                  }
                  else{
                    $("#message").html('').html('<p> There was an error! </p> ');
                  }


                  // "You have been registered"
                },
            });
          }
        },

    });







});
