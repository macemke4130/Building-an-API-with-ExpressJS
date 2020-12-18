let $chirps = $("#chirps");
let focusedChirp;

$.ajax({
  type: "GET",
  url: "/api/chirps",
  success: function (chirps) {
    $.each(chirps, function (i, chirp) {
      if (chirp.user != undefined) {
        // Conditinal prevents the "nextid" object from outputting --
        script(i, chirp.user, chirp.msg);
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
          script(nextId, newChirp.details.user, newChirp.details.msg);
          $("#user").val("");
          $("#msg").val("");
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
  $("#edit").css({
    display: "flex",
  });

  $("#edit-user").val($("#user-" + id).text());
  $("#edit-msg").val($("#msg-" + id).text());

  focusedChirp = id;
}

function closeEditor(id) {
  $("#edit").css({
    display: "none",
  });

  $("#edit-user").val("");
  $("#edit-msg").val("");
}

function script(id, user, msg) {
  return $chirps.append(
    `<div id="chirp-${id}" class="chirp">
            <div class="content">
                <div class="user">
                    @<span id="user-${id}">${user}</span>
                </div>
                <div class="msg">
                    <span id="msg-${id}">${msg}</span>
                </div>
            </div>
            <div class="controls">
                <button onclick="destroyChirp(${id})">X</button>
                <button onclick="openEditor(${id})">Edit</button>
            </div>
        </div>
            `
  );
}

function editChirp() {
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
