'use strict';

(function () {

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
    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');
    setFieldsetsState(true);
  };


  /**
   * Setting Address Field
   * @param {number} x the X coord of main pin
   * @param {number} y the Y coord of main pin
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

  }


  /**
   * Harle error on form save
   */
  var onFormSaveError = function () {

  }


  /**
   * Hadle form submit event
   * @param {Event} evt
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.message.showSuccess('try submition neww');
    // window.backend.save(new FormData(form), )
  }


  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', onFormSubmit);


  window.form = {
    setFieldsetsState: setFieldsetsState,
    activate: activate,
    setAddressField: setAddressField
  };
})();
