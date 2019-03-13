$('#form').submit(function (event) {
    event.preventDefault();
    console.log("PRessed");
    var errors = 0;
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();

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
                },
            });
          }
        },

    });







});
