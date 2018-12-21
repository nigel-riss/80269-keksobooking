'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  // console.dir(adForm);

  /**
   * Set form fieldsets state
   * @param {boolean} isEnabled
   */
  var setFieldsetsState = function (isEnabled) {
    var fieldsets = document.querySelectorAll('.ad-form fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = !isEnabled;
    }
  };


  /**
   * Activate advertisement form
   */
  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    setFieldsetsState(true);
  };


  /**
   * Reset advertisement form
   */
  var reset = function () {
    // adForm.reset();
    adForm.classList.add('ad-form--disabled');
    setFieldsetsState(false);
  };


  /**
   * Setting Address Field
   * @param {number} x the X coordinate of main pin
   * @param {number} y the Y coordinate of main pin
   */
  var setAddressField = function (x, y) {
    var addressInput = document.querySelector('.ad-form input[name="address"]');
    x = Math.round(x);
    y = Math.round(y);
    addressInput.value = x + ', ' + y;
  };


  /**
   * Handle success on form save
   */
  var onFormSaveSuccess = function () {
    window.main.reset();
    window.message.showSuccess('Ваше объявление успешно отправлено.');
  };


  /**
   * Handle error on form save
   * @param {string} errorMessage
   */
  var onFormSaveError = function (errorMessage) {
    window.message.showError(errorMessage, 'OK');
  };


  /**
   * Handle form submit event
   * @param {Event} evt
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onFormSaveSuccess, onFormSaveError);
  };


  /**
   * Handle form reset
   */
  var onFormReset = function () {
    window.main.reset();
  };


  adForm.addEventListener('submit', onFormSubmit);
  adForm.addEventListener('reset', onFormReset);


  window.form = {
    activate: activate,
    reset: reset,
    setAddressField: setAddressField
  };

})();
