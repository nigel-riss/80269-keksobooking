'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var pinsData = [];


  /**
   * Activate the map
   */
  var activate = function () {
    window.backend.load(onDataLoadSuccess, onDataLoadFail);
    map.classList.remove('map--faded');
  };


  /**
   * Reset the map
   */
  var reset = function () {
    map.classList.add('map--faded');
    removePins();
    pinsData = [];
  };


  /**
   * Adds pins and pin click listeners on successfull data load
   * @param {Object} offersData
   */
  var onDataLoadSuccess = function (offersData) {
    addPins(offersData);
    addPinsClickListeners();
  };


  /**
   * Shows an error message on failed data load
   * @param {string} errorMessage
   */
  var onDataLoadFail = function (errorMessage) {
    window.message.showError(errorMessage, 'OK');
  };


  /**
   * Render document fragment of pins
   * @param {Array} offerData Array of offer data objects
   * @return {DocumentFragment}
   */
  var renderPinsFragment = function (offerData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerData.length; i++) {
      var pin = window.pin.render(offerData[i], i);
      if (pin) {
        fragment.appendChild(pin);
      }
    }
    return fragment;
  };


  /**
   * Add pins
   * @param {Array} offersData
   */
  var addPins = function (offersData) {
    pinsData = offersData;
    var pinsFragment = renderPinsFragment(offersData);
    mapPinsElement.appendChild(pinsFragment);
  };


  /**
   * Remove all pins but main pin
   */
  var removePins = function () {
    var mapPins = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPinsElement.removeChild(mapPins[i]);
    }
  };


  /**
   * Listen to pin clicks
   */
  var addPinsClickListeners = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        var pin = evt.currentTarget;
        if (pin.dataset.pinId) {
          window.card.show(pinsData[pin.dataset.pinId]);
        }
      });
    }
  };


  window.map = {
    activate: activate,
    reset: reset
  };
})();
