'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Render a pin
   * @param {Object} pinData
   * @return {HTMLElement}
   */
  var render = function (pinData) {
    if (!pinData.offer) {
      return null;
    } else {
      var pin = pinTemplate.cloneNode(true);
      pin.dataset.pinId = pinData.id;
      var pinImage = pin.children[0];
      pin.style.left = (pinData.location.x - pin.clientWidth / 2) + 'px';
      pin.style.top = (pinData.location.y - pin.clientHeight) + 'px';
      pinImage.src = pinData.author.avatar;
      pinImage.alt = pinData.offer.title;
      return pin;
    }
  };


  /**
   * Set pin active style
   * @param {HTMLElement} pinElement
   */
  var activate = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };


  /**
   * Remove pin active style
   * @param {HTMLElement} pinElement
   */
  var reset = function (pinElement) {
    pinElement.classList.remove('map__pin--active');
  };


  window.pin = {
    render: render,
    activate: activate,
    reset: reset
  };
})();
