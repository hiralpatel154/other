$(document).ready(function () {
  $(window).on("load", function () {
    // show active page
    $(".sub-list.active").closest(".title").addClass("active-parent");
    $(".sub-list.active").parent(".list").show();
  });
  // Sidebar with Submenu
  $(".title ul").hide();
  $(".title a").click(function (e) {
    $(this).parent(".title").children("ul").slideToggle("100");
    $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
  });
  $(".title .list .sub-list a").click(function (e) {
    $(this).parent(".sub-list").children("ul").slideToggle("100");
  });
  $(document).bind("click", function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("drop-down"))
      $(".breadcrumb-item .language .drop-down .options ul").hide();
  });

  $("#register-form").validate({
    rules: {
      username: {
        required: true,
        maxlength: 100,
      },
      email: {
        required: true,
        email: true,
        // accept: "[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}",
      },
      phone: {
        required: true,
        minlength: 10,
        maxlength: 20,
        digits: true,
      },
    },
    messages: {
      username: {
        required: "Username is required",
      },
      email: {
        required: "Email is required",
        // email: "Invalid Email",
      },
      phone: {
        required: "Phone Number is required",
        // minlength: "this field must contain at least {10} digits",
        // digits: "this field can only contain numbers",
      },
    },
  });

  // AJAX Check email already existed
  $("#email_address").on("change", function (e) {
    var email_id = $("#email_address").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email_id)) {
      return false;
    }
    $.ajax({
      type: "POST",
      url: "./ajax/check_email.php",
      data: { email: email_id },
      dataType: "json",
      success: function (response) {
        if (response.status == "False") {
          $(".email-error").text(response.message);
          $("#email_address").val("");
        } else {
          $(".email-error").text("");
        }
      },
    });
  });

  //  Check phone validation
  $("#contact_number").on("change", function () {
    var contact_num = $("#contact_number").val();
    var regex = /^[0-9]{10}/;
    if (!regex.test(contact_num)) {
      $(".contact-error").text(" only numbers & at least {10} digits");
      return false;
    }
    $.ajax({
      type: "POST",
      url: "./ajax/check_contact.php",
      data: { contact: contact_num },
      dataType: "json",
      success: function (response) {
        if (response.status == "False") {
          $(".contact-error").text(response.message);
          $("#contact_number").val("");
        } else {
          $(".contact-error").text("");
        }
      },
    });
  });

  // AJAX Country City Dropdown
  $("#country").on("change", function () {
    var countryId = $(this).val();
    console.log(countryId);
    
    $("#state").empty();
    $("#state").append(`<option value="other">Other</option>`);
    $.ajax({
      type: "POST",
      url: "./ajax/ajax.php",
      dataType: "json",
      data: { id: countryId },
      success: function (response) {
        //console.log(response);
        $.each(response, function (k, v) {
          //console.log(k);
          //console.log(v);
          // $("#state").empty();
          $("#state").append('<option value="' + k + '">' + v + "</option>");
        });
      },
      error: function (response) {
        console.log(response);
      },
    });
  });

  $("#state").on("change", function () {
    var stateId = $(this).val();
    
   
    if ((stateId == "other")) {
      console.log(stateId);
      $("#exampleModal").modal("show");
    }

    $("#city").empty();
    $.ajax({
      type: "POST",
      url: "./ajax/ajax.php",
      dataType: "json",
      data: { stateId: stateId },
      success: function (response) {
        $.each(response, function (k, v) {
          $("#city").append('<option value="' + k + '">' + v + "</option>");
        });
      },
      error: function (response) {
        console.log(response);
      },
    });
  });
});
