'use strict';

(function () {
  var pinsData = [];

  /**
   * Show the map
   */
  var show = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
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
      fragment.appendChild(pin);
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
    document.querySelector('.map__pins').appendChild(pinsFragment);
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
    show: show,
    addPins: addPins,
    addPinsClickListeners: addPinsClickListeners
  };
})();
