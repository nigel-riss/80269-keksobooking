'use strict';

(function () {
  var OFFERS_COUNT = 8;

  var isActivated = false;


  /**
   * Activating the application
   */
  var activate = function () {
    if (!isActivated) {
      isActivated = true;
      window.backend.load(onDataLoadSuccess, )
      window.map.show();
      window.form.activate();
    }
  };


  var onDataLoadSuccess = function (offersData) {
    // var randomOffersData = window.mockup.generateRandomOffers(OFFERS_COUNT);
    window.map.addPins(offersData);
    window.map.addPinsClickListeners();
  };


  var onDataLoadFail = function (errorMessage) {
    console.log(errorMessage);
  };


  // Disabling fieldsets initially
  window.form.setFieldsetsState(false);


  window.main = {
    activate: activate
  };
})();
