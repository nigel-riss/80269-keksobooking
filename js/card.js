'use strict';

(function () {

  var offerTypeMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var instance = cardTemplate.cloneNode(true);
  var isShown = false;


  /**
   * Fills in card
   * @param {Object} offerData
   * @return {HTMLElement}
   */
  var fillIn = function (offerData) {
    // text content
    instance.querySelector('.popup__title').textContent = offerData.offer.title;
    instance.querySelector('.popup__text--address').textContent = offerData.offer.address;
    instance.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
    instance.querySelector('.popup__type').textContent = offerTypeMap[offerData.offer.type];
    instance.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    instance.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
    instance.querySelector('.popup__description').textContent = offerData.offer.description;

    // features
    var featuresList = instance.querySelector('.popup__features');
    // cleaning features list
    while (featuresList.firstChild) {
      featuresList.removeChild(featuresList.firstChild);
    }
    // adding new features
    offerData.offer.features.forEach(function (featureValue) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + featureValue);
      featuresList.appendChild(feature);
    });

    // photos
    var photos = instance.querySelector('.popup__photos');
    // cleaning photos list
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }
    // adding new photos
    offerData.offer.photos.forEach(function (photoSource) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.setAttribute('width', '45');
      photo.setAttribute('height', '40');
      photo.setAttribute('alt', 'Фотография жилья');
      photo.src = photoSource;
      photos.appendChild(photo);
    });

    // avatar
    instance.querySelector('.popup__avatar').src = offerData.author.avatar;

    return instance;
  };


  /**
   * Show popup
   * @param {Object} offerData
   */
  var show = function (offerData) {
    fillIn(offerData);
    var filtersContainer = document.querySelector('.map__filters-container');
    map.insertBefore(instance, filtersContainer);
    isShown = true;

    var popupCloseBtn = map.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', function () {
      hide();
    });

    document.addEventListener('keydown', onKeyDown);
  };


  /**
   * Hide popup
   */
  var hide = function () {
    if (isShown) {
      map.removeChild(instance);
      document.removeEventListener('keydown', onKeyDown);
      isShown = false;
    }
  };


  /**
   * Remove popup on ESC
   * @param {KeyboardEvent} evt
   */
  var onKeyDown = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      hide();
    }
  };

  window.card = {
    show: show,
    hide: hide
  };

})();
