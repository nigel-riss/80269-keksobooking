'use strict';

var PIN_X_PADDING = 50;
var MIN_PIN_Y = 130;
var MAX_PIN_Y = 630;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var OFFER_TYPE_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var OFFERS_COUNT = 8;

var ESC_KEY = 27;


/* *************************
** generating mockup data **
************************* */
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
  offer.author = {};
  offer.author.avatar = getAvatarUrl(index + 1);

  var map = document.querySelector('.map');
  offer.location = {};
  offer.location.x = window.utils.getRandomNumber(PIN_X_PADDING, map.clientWidth - PIN_X_PADDING);
  offer.location.y = window.utils.getRandomNumber(MIN_PIN_Y, MAX_PIN_Y);

  offer.offer = {};
  offer.offer.title = OFFER_TITLES[index];
  offer.offer.address = offer.location.x + ', ' + offer.location.y;
  offer.offer.price = window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE);
  offer.offer.type = window.utils.getRandomArrayElement(OFFER_TYPE);
  offer.offer.rooms = window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS);
  offer.offer.guests = window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS);
  offer.offer.checkin = window.utils.getRandomArrayElement(CHECKIN_TIMES);
  offer.offer.checkout = window.utils.getRandomArrayElement(CHECKOUT_TIMES);
  offer.offer.features = window.utils.getRandomElements(OFFER_FEATURES);
  offer.offer.description = '';
  offer.offer.photos = window.utils.getShuffledArray(OFFER_PHOTOS);

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


/**
 * Show the map
 */
var showMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};


/* *********************
** rendering map pins **
********************* */
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * Render a pin
 * @param {Object} pinData
 * @param {number} pinID
 * @return {HTMLElement}
 */
var renderPin = function (pinData, pinID) {
  var pin = pinTemplate.cloneNode(true);
  pin.dataset.pinId = pinID;
  var pinImage = pin.children[0];
  pin.style.left = (pinData.location.x - pin.clientWidth / 2) + 'px';
  pin.style.top = (pinData.location.y - pin.clientHeight) + 'px';
  pinImage.src = pinData.author.avatar;
  pinImage.alt = pinData.offer.title;
  return pin;
};


/**
 * Render document fragment of pins
 * @param {Array} offerData Array of offer data objects
 * @return {DocumentFragment}
 */
var renderPinsFragment = function (offerData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offerData.length; i++) {
    var pin = renderPin(offerData[i], i);
    fragment.appendChild(pin);
  }
  return fragment;
};


/**
 * Render offer card
 * @return {HTMLElement}
 */
var renderCard = function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  return card;
};

var fillInCard = function (card, offerData) {
  // text content
  card.querySelector('.popup__title').textContent = offerData.offer.title;
  card.querySelector('.popup__text--address').textContent = offerData.offer.address;
  card.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = OFFER_TYPE_DICTIONARY[offerData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
  card.querySelector('.popup__description').textContent = offerData.offer.description;

  // features
  var featuresList = card.querySelector('.popup__features');
  while (featuresList.firstChild) { // cleaning features list
    featuresList.removeChild(featuresList.firstChild);
  }
  for (var i = 0; i < offerData.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + offerData.offer.features[i]);
    featuresList.appendChild(feature);
  }

  // photos
  var photos = card.querySelector('.popup__photos');
  var photosTemplate = photos.removeChild(photos.querySelector('img'));
  while (photos.firstChild) { // cleaning photos list
    photos.removeChild(photos.firstChild);
  }
  for (var j = 0; j < offerData.offer.photos.length; j++) {
    var photo = photosTemplate.cloneNode(true);
    photo.src = offerData.offer.photos[j];
    photos.appendChild(photo);
  }

  // avatar
  card.querySelector('.popup__avatar').src = offerData.author.avatar;

  return card;
};


/**
 * Set form fieldsets state
 * @param {boolean} isEnabled
 */
var setFieldsetsState = function (isEnabled) {
  var fieldsets = document.querySelectorAll('.ad-form fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = !isEnabled;
  }
};

/**
 * Activate advertisement form
 */
var activateAdForm = function () {
  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  setFieldsetsState(true);
};

/**
 * Adding random pins on map
 */
var addRandomPins = function () {
  // rendering and showing pins
  var pinsFragment = renderPinsFragment(randomOffers);
  document.querySelector('.map__pins').appendChild(pinsFragment);
};

/**
 * Emulating main pin drag-n-drop
 */
window.activateMap = function () {
  addRandomPins();
  addPinsClickListeners();
  showMap();
  activateAdForm();
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
        fillInCard(popup, randomOffers[pin.dataset.pinId]);
        showPopup();
      }
    });
  }
};

/**
 * Show popup
 */
var map = document.querySelector('.map');
var showPopup = function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  map.insertBefore(popup, filtersContainer);

  var popupCloseBtn = map.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', function () {
    hidePopup();
  });
};

/**
 * Hide popup
 */
var hidePopup = function () {
  map.removeChild(popup);
};

/**
 * Remove popup on ESC
 */
document.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ESC_KEY) {
    hidePopup();
  }
});

// Disabling fieldsets
setFieldsetsState(false);

// Generating random offers
var randomOffers = generateRandomOffers(OFFERS_COUNT);

// Creating popup
var popup = fillInCard(renderCard(), randomOffers[0]);
