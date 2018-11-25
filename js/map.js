'use strict';

/* *************************
** generating mockup data **
************************* */

// creating a closure to get unique random avatar url
var createAvatarPool = function () {
  var urlPreset = 'img/avatars/user';
  var urls = [];
  for (var i = 1; i < 9; i++) {
    urls.push(urlPreset + '0' + i + '.png');
  }

  return function () {
    // pull and return random url from urls array
    return urls.splice(Math.floor(Math.random() * urls.length), 1)[0];
  };
};

var getAvatarUrl = createAvatarPool();

// creating a closure to get unique offer text
var createOfferTitlesPool = function () {
  var offerTitles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  return function () {
    // pull and return random title from offerTitles array
    return offerTitles.splice(Math.floor(Math.random() * offerTitles.length), 1)[0];
  };
};

var getOfferTitle = createOfferTitlesPool();

// getting random integer number from min to max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// getting random element form an array
var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// generating random user data
var generateUser = function () {
  var user = {};
  user.author = {};
  user.author.avatar = getAvatarUrl();

  var map = document.querySelector('.map');
  user.location = {};
  user.location.x = getRandomNumber(1, map.clientWidth);
  user.location.y = getRandomNumber(130, 630);

  user.offer = {};
  user.offer.title = getOfferTitle();
  user.offer.address = user.location.x + ', ' + user.location.y;
  user.offer.price = getRandomNumber(1000, 1000000);
  user.offer.type = getRandomArrayElement([
    'palace',
    'flat',
    'house',
    'bungalo'
  ]);
  user.offer.rooms = getRandomNumber(1, 5);
  user.offer.guests = getRandomNumber(1, 5);
  user.offer.checkin = getRandomArrayElement(['12:00', '13:00', '14:00']);
  user.offer.checkout = getRandomArrayElement(['12:00', '13:00', '14:00']);
  // user.offer.features = getRandomFeatures();
  user.offer.description = '';
  // user.offer.photos =

  return user;
};

// generating users array
var generateUsers = function () {
  var users = [];
  for (var i = 0; i < 8; i++) {
    users.push(generateUser());
  }

  return users;
};


/* **************
** showing map **
************** */
var showMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};


/* *********************
** rendering map pins **
********************* */
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// rendering one pin
var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.children[0];
  pin.style.left = (pinData.location.x - pin.clientWidth / 2) + 'px';
  pin.style.top = (pinData.location.y - pin.clientHeight) + 'px';
  pinImage.src = pinData.author.avatar;
  pinImage.alt = pinData.offer.title;
  return pin;
};

// rendering 8 pins into a fragment
var renderPinsFragment = function (userData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var pin = renderPin(userData[i]);
    fragment.appendChild(pin);
  }
  return fragment;
};

var pinsFragment = renderPinsFragment(generateUsers());

document.querySelector('.map__pins').appendChild(pinsFragment);

console.log(renderPin(generateUser()));

console.log(pinTemplate);

showMap();
