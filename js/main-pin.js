'use strict';

(function () {
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_ARROW_SIZE = 16;

  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var startPageCoords = {};
  var startPinCoords = {};
  var shift = {};
  var isDragged = false;

  // Calculating boundaries
  var minPinX = 0;
  var maxPinX = Math.floor(pinsContainer.offsetWidth - MAIN_PIN_SIZE);
  var minPinY = MIN_Y_COORD - MAIN_PIN_SIZE - MAIN_PIN_ARROW_SIZE;
  var maxPinY = MAX_Y_COORD - MAIN_PIN_SIZE - MAIN_PIN_ARROW_SIZE;


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

    mainPin.style.top = (pinY) + 'px';
    mainPin.style.left = (pinX) + 'px';

    setAddressField(mainPin.offsetLeft + MAIN_PIN_SIZE / 2, mainPin.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_ARROW_SIZE);
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
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    };

    window.activateMap();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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


  // Setting initial main pin coordinates
  setAddressField(mainPin.offsetLeft + mainPin.offsetWidth / 2, mainPin.offsetTop + mainPin.offsetHeight / 2);

  mainPin.addEventListener('mousedown', onMouseDown);
})();
