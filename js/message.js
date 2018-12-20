'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successWindow;
  var errorWindow;
  var mainElement = document.querySelector('main');

  /**
   * Show success window
   * @param {string} message
   */
  var showSuccess = function (message) {
    // Create
    successWindow = successTemplate.cloneNode(true);

    // Fill in
    successWindow.querySelector('.success__message').textContent = message;

    // Add listeners
    successWindow.addEventListener('click', hideSuccess);
    document.addEventListener('keydown', onSuccessEscPress);

    // Append
    mainElement.appendChild(successWindow);
  };


  /**
   * Remove success message on Esc press
   * @param {KeyboardEvent} evt
   */
  var onSuccessEscPress = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      successWindow.removeEventListener('click', hideSuccess);
      document.removeEventListener('keydown', onSuccessEscPress);
      hideSuccess();
    }
  };


  /**
   * Hide success window
   */
  var hideSuccess = function () {
    mainElement.removeChild(successWindow);
  };


  /**
   * Show error window
   * @param {string} message
   * @param {string} buttonText
   */
  var showError = function (message, buttonText) {
    // Create
    errorWindow = errorTemplate.cloneNode(true);

    // Fill in
    errorWindow.querySelector('.error__message').textContent = message;
    var errorWindowButton = errorWindow.querySelector('.error__button');
    errorWindowButton.textContent = buttonText;

    // Add listeners
    errorWindow.addEventListener('click', hideError);
    document.addEventListener('keydown', onErrorEscPress);
    errorWindowButton.addEventListener('click', onErrorButtonClick);

    // Append
    mainElement.appendChild(errorWindow);
  };


  /**
   * Remove success message on Esc press
   * @param {KeyboardEvent} evt
   */
  var onErrorEscPress = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      hideError();
    }
  };


  /**
   * Handle error window button click
   */
  var onErrorButtonClick = function () {
    hideError();
  };


  /**
   * Hide error window
   */
  var hideError = function () {
    errorWindow.removeEventListener('click', hideError);
    document.removeEventListener('keydown', onErrorEscPress);
    mainElement.removeChild(errorWindow);
  };


  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };

})();
