let $chirps = $("#chirps");
let focusedChirp;

$.ajax({
  type: "GET",
  url: "/api/chirps",
  success: function (chirps) {
    $.each(chirps, function (i, chirp) {
      if (chirp.user != undefined) {
        // Conditinal prevents the "nextid" object from outputting --
        $chirps.append(`<li id = "chirp-${i}"><strong>@<span id="user-${i}">${chirp.user}</span> - </strong><span id="msg-${i}">${chirp.msg}</span> - 
        <button onclick="destroyChirp(${i})">X</button><button onclick="openEditor(${i})">Edit</button></li>`);
      }
    });
  },
});

function postNewChirp() {
    // Get Request exists solely for grabbing the nextid value in chirps.json --
  $.ajax({
    type: "GET",
    url: "/api/chirps",
    success: function (chirps) {
      let nextId = chirps.nextid;
      
      let newChirp = {
        user: $("#user").val(),
        msg: $("#msg").val(),
      };
    
      $.ajax({
        type: "POST",
        url: "/api/chirps",
        data: newChirp,
        success: function (newChirp) {
          $chirps.append(`<li id = "chirp-${nextId}"><strong>@<span id="user-${id}">${newChirp.details.user}</span> - </strong>${newChirp.details.msg} - 
            <a href="#" onclick="destroyChirp(${nextId})">X</a></li>`);
        },
      });
    },
  });
}

function destroyChirp(id) {
  $.ajax({
    type: "DELETE",
    url: "/api/chirps/" + id,
    success: function () {
      $("#chirp-" + id).remove();
    },
  });
}

function openEditor(id) {
    $('#edit').css({
        "display": "block"
    });

    $('#edit-user').val($('#user-' + id).text());
    $('#edit-msg').val($('#msg-' + id).text());

    focusedChirp = id;
}

function closeEditor(id) {
    $('#edit').css({
        "display": "none"
    });

    $('#edit-user').val("");
    $('#edit-msg').val("");
}

function editChirp(){
    let id = focusedChirp;
    let editedChirp = {
        user: $("#edit-user").val(),
        msg: $("#edit-msg").val(),
      };

    $.ajax({
        type: "PUT",
        url: "/api/chirps/" + id,
        data: editedChirp,
        success: function (editedChirp) {
          $("#user-" + id).text($("#edit-user").val());
          $("#msg-" + id).text($("#edit-msg").val());
          closeEditor();
        },
      });
}