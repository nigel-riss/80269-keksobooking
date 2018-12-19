'use strict';

(function () {
  var isActivated = false;
  // window.message.showSuccess('Всё хорошо прекрасная маркиза');

  /**
   * Activating the application
   */
  var activate = function () {
    if (!isActivated) {
      isActivated = true;
      window.backend.load(onDataLoadSuccess, onDataLoadFail);
      window.map.show();
      window.form.activate();
    }
  };


  /**
   * Adds pins and pin click listeners on successfull data load
   * @param {Object} offersData
   */
  var onDataLoadSuccess = function (offersData) {
    window.map.addPins(offersData);
    window.map.addPinsClickListeners();
  };


  /**
   * Shows an error message on failed data load
   * @param {string} errorMessage
   */
  var onDataLoadFail = function (errorMessage) {
    window.message.showError(errorMessage, 'OK');
  };


  // Disabling fieldsets initially
  window.form.setFieldsetsState(false);


  window.main = {
    activate: activate
  };
})();
