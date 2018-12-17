'use strict';

(function () {
  var ESC_KEY = 27;

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var instance = cardTemplate.cloneNode(true);


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
    instance.querySelector('.popup__type').textContent = window.data.OFFER_TYPE_DICTIONARY[offerData.offer.type];
    instance.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    instance.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
    instance.querySelector('.popup__description').textContent = offerData.offer.description;

    // features
    var featuresList = instance.querySelector('.popup__features');
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
    var photos = instance.querySelector('.popup__photos');
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

    var popupCloseBtn = map.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', function () {
      hide();
    });
  };


  /**
   * Hide popup
   */
  var hide = function () {
    map.removeChild(instance);
  };

  /**
   * Remove popup on ESC
   */
  document.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ESC_KEY) {
      hide();
    }
  });


  window.card = {
    show: show,
    hide: hide
  };
})();
