'use strict';

(function () {
  /**
   * Utility function.
   * Return random integer number in range from <min> to <max>.
   * @param {number} min Min number
   * @param {number} max Max number
   * @return {number}
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


  /**
   * Utility function.
   * Return random element form an array.
   * @param {Array} array
   * @return {*} Random array element
   */
  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };


  /**
   * Utility function.
   * Return an array of random elements from another array
   * @param {Array} array
   * @return {Array}
   */
  var getRandomElements = function (array) {
    var elements = [];
    for (var i = 0; i < array.length; i++) {
      if (!getRandomNumber(0, 1)) { // just flipping the coin here
        elements.push(array[i]);
      }
    }
    return elements;
  };


  /**
   * Utility function.
   * Return an array of shuffled elements from another array
   * (Using Knuth-Fisher-Yates shuffle algorithm)/.
   * @param {Array} array
   * @return {Array}
   */
  var getShuffledArray = function (array) {
    var shuffledArr = array.slice(0); // cloning an array
    for (var i = shuffledArr.length - 1; i > 0; i--) {
      var index = window.utils.getRandomNumber(0, i);
      var temp = shuffledArr[index];
      shuffledArr[index] = shuffledArr[i];
      shuffledArr[i] = temp;
    }
    return shuffledArr;
  };


  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getRandomElements: getRandomElements,
    getShuffledArray: getShuffledArray
  };
})();

