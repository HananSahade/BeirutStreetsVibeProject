$(document).ready(function () {

  $("#contactForm").submit(function (frm) {
    frm.preventDefault();

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let story = $("#story").val().trim();

    if (!emailPattern.test(email)) {
      $("#message").text("Please enter a valid email.");
      return;
    }
    let msg = "Thanks " + name + "! Your story was submitted.";
    $("#message").text(msg);

    $("#contactForm").trigger("reset");
  });

  let btn = $("#scrollTopBtn");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.show();
    } else {
      btn.hide();
    }
  });

  btn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

});
