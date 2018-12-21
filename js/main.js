'use strict';

(function () {

  var isActivated = false;


  /**
   * Return active state of application
   * @return {boolean}
   */
  var getActiveState = function () {
    return isActivated;
  };


  /**
   * Activating the application
   */
  var activate = function () {
    if (!isActivated) {
      isActivated = true;
      window.map.activate();
      window.filter.activate();
      window.form.activate();
    }
  };


  /**
   * Reset the application
   */
  var reset = function () {
    isActivated = false;
    window.map.reset();
    window.filter.reset();
    window.form.reset();
    window.mainPin.reset();
    window.card.hide();
  };


  reset();


  window.main = {
    activate: activate,
    reset: reset,
    getActiveState: getActiveState
  };

})();
