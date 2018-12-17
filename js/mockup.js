'use strict';

(function () {
  /**
   * Generate avatar url.
   * @param  {number} index id of avatar
   * @return {string} Avatar url
   */
  var getAvatarUrl = function (index) {
    return 'img/avatars/user0' + index + '.png';
  };


  /**
   * Generate random offer
   * @param {number} index
   * @return {Object}
   */
  var generateRandomOffer = function (index) {
    var offer = {};
    // offer.author
    offer.author = {};
    offer.author.avatar = getAvatarUrl(index + 1);
    // offer.location
    var map = document.querySelector('.map');
    offer.location = {};
    offer.location.x = window.utils.getRandomNumber(window.data.PIN_X_PADDING, map.clientWidth - window.data.PIN_X_PADDING);
    offer.location.y = window.utils.getRandomNumber(window.data.MIN_PIN_Y, window.data.MAX_PIN_Y);
    // offer.offer
    offer.offer = {};
    offer.offer.title = window.data.OFFER_TITLES[index];
    offer.offer.address = offer.location.x + ', ' + offer.location.y;
    offer.offer.price = window.utils.getRandomNumber(window.data.MIN_PRICE, window.data.MAX_PRICE);
    offer.offer.type = window.utils.getRandomArrayElement(window.data.OFFER_TYPE);
    offer.offer.rooms = window.utils.getRandomNumber(window.data.MIN_ROOMS, window.data.MAX_ROOMS);
    offer.offer.guests = window.utils.getRandomNumber(window.data.MIN_GUESTS, window.data.MAX_GUESTS);
    offer.offer.checkin = window.utils.getRandomArrayElement(window.data.CHECKIN_TIMES);
    offer.offer.checkout = window.utils.getRandomArrayElement(window.data.CHECKOUT_TIMES);
    offer.offer.features = window.utils.getRandomElements(window.data.OFFER_FEATURES);
    offer.offer.description = '';
    offer.offer.photos = window.utils.getShuffledArray(window.data.OFFER_PHOTOS);

    return offer;
  };


  /**
   * Generate an array of random offers
   * @param {number} num Number of offers
   * @return {Array}
   */
  var generateRandomOffers = function (num) {
    var offers = [];
    for (var i = 0; i < num; i++) {
      offers.push(generateRandomOffer(i));
    }
    return offers;
  };

  window.mockup = {
    generateRandomOffers: generateRandomOffers
  };
})();
