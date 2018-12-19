'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Render a pin
   * @param {Object} pinData
   * @param {number} pinID
   * @return {HTMLElement}
   */
  var render = function (pinData, pinID) {
    if (!pinData.offer) {
      return null;
    } else {
      var pin = pinTemplate.cloneNode(true);
      pin.dataset.pinId = pinID;
      var pinImage = pin.children[0];
      pin.style.left = (pinData.location.x - pin.clientWidth / 2) + 'px';
      pin.style.top = (pinData.location.y - pin.clientHeight) + 'px';
      pinImage.src = pinData.author.avatar;
      pinImage.alt = pinData.offer.title;
      return pin;
    }
  };


  window.pin = {
    render: render
  };
})();
