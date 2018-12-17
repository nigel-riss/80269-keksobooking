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
      var randomOffersData = window.mockup.generateRandomOffers(OFFERS_COUNT);
      window.map.addPins(randomOffersData);
      window.map.addPinsClickListeners();
      window.map.show();
      window.form.activate();
    }
  };


  // Disabling fieldsets initially
  window.form.setFieldsetsState(false);


  window.main = {
    activate: activate
  };
})();
