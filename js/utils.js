'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DEBOUNCE_TIMEOUT = 500; // milliseconds

  /**
   * Check if Esc key is pressed
   * @param {KeyboardEvent} evt
   * @return {boolean}
   */
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };


  /**
   * Create closure around callback function and call
   * it if callback function was not called again
   * in DEBOUNCE_TIMEOUT timeout
   * @param {Function} callback
   * @return {Function}
   */
  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_TIMEOUT);
    };
  };


  window.utils = {
    isEscEvent: isEscEvent,
    debounce: debounce
  };

})();
