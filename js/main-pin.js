'use strict';

(function () {

  var INITIAL_LEFT = 570;
  var INITIAL_TOP = 375;
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_ARROW_SIZE = 8;

  var pinsContainer = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');
  var startPageCoords = {};
  var startPinCoords = {};
  var shift = {};
  var isDragged = false;

  // Calculating boundaries
  var minPinX = 0;
  var maxPinX = Math.floor(pinsContainer.offsetWidth - MAIN_PIN_SIZE);
  var minPinY = MIN_Y_COORD - MAIN_PIN_SIZE / 2 - MAIN_PIN_ARROW_SIZE;
  var maxPinY = MAX_Y_COORD - MAIN_PIN_ARROW_SIZE;


  /**
   * Set main pin position
   * @param {number} pinX
   * @param {number} pinY
   */
  var setPinPosition = function (pinX, pinY) {
    if (pinX < minPinX) {
      pinX = minPinX;
    } else if (pinX > maxPinX) {
      pinX = maxPinX;
    }

    if (pinY < minPinY) {
      pinY = minPinY;
    } else if (pinY > maxPinY) {
      pinY = maxPinY;
    }

    pin.style.top = (pinY) + 'px';
    pin.style.left = (pinX) + 'px';

    window.form.setAddressField(pin.offsetLeft + MAIN_PIN_SIZE / 2, pin.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_ARROW_SIZE);
  };


  /**
   * Mouse down event handler
   * @param {MouseEvent} evt
   */
  var onMouseDown = function (evt) {
    evt.preventDefault();

    startPageCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    // Using this for more precise positioning and bounds calculation
    // My own way, not as was shown on screencast
    startPinCoords = {
      x: pin.offsetLeft,
      y: pin.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (!window.main.getActiveState()) {
      window.main.activate();
    }
  };


  /**
   * Mouse move event handler
   * @param {MouseEvent} evt
   */
  var onMouseMove = function (evt) {
    evt.preventDefault();

    isDragged = true;

    shift = {
      x: evt.pageX - startPageCoords.x,
      y: evt.pageY - startPageCoords.y
    };

    setPinPosition(shift.x + startPinCoords.x, shift.y + startPinCoords.y);
  };


  /**
   * Mouse up event handler
   * @param {MouseEvent} evt
   */
  var onMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (isDragged) {
      isDragged = false;
    }
  };


  /**
   * Reset main pin
   */
  var reset = function () {
    setPinPosition(INITIAL_LEFT, INITIAL_TOP);

    // Setting initial main pin coordinates with delay
    // Timeout is needed to fire after form clear
    setTimeout(function () {
      window.form.setAddressField(pin.offsetLeft + pin.offsetWidth / 2, pin.offsetTop + pin.offsetHeight / 2);
    }, 100);
  };


  pin.addEventListener('mousedown', onMouseDown);
  reset();

  window.mainPin = {
    reset: reset
  };

})();
