'use strict';

(function () {
  var ESC_KEYCODE = 27;

  /**
   * Check if Esc key is pressed
   * @param {KeyboardEvent} evt
   * @return {boolean}
   */
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };


  window.utils = {
    isEscEvent: isEscEvent
  };
})();

