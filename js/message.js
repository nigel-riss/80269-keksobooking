'use strict';

(function () {

  var showSuccess = function (message) {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successWindow = successTemplate.cloneNode(true);

    // fill in
    successWindow.querySelector('.success__message').textContent = message;

    document.body.appendChild(successWindow);

    setTimeout(function () {
      hideSuccess(successWindow);
    }, 2000);
  };


  var hideSuccess = function (successWindow) {
    document.body.removeChild(successWindow);
  };


  var showError = function (message, buttonText, callback) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorWindow = errorTemplate.cloneNode(true);

    // fill in
    errorWindow.querySelector('.error__message').textContent = message;
    var errorWindowButton = errorWindow.querySelector('.error__button');
    errorWindowButton.textContent = buttonText;

    // add listeners
    errorWindowButton.addEventListener('click', function () {
      hideError(callback, errorWindow);
    });

    document.body.appendChild(errorWindow);
  };


  var hideError = function (callback, errorWindow) {
    if (callback) {
      callback();
    }
    document.body.removeChild(errorWindow);
  };


  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };

})();
