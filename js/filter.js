'use strict';

(function () {
  var TYPE_FILTER = 0;
  var PRICE_FILTER = 1;
  var ROOMS_FILTER = 2;
  var GUESTS_FILTER = 3;
  var FEATURES_FILTER = 4;

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var filterFunctions = [];


  /**
   * Activate filters form
   */
  var activate = function () {
    for (var i = 0; i < filtersForm.elements.length; i++) {
      filtersForm.elements[i].disabled = false;
    }
  };


  /**
   * Reset filters form
   */
  var reset = function () {
    filtersForm.reset();
    for (var i = 0; i < filtersForm.elements.length; i++) {
      filtersForm.elements[i].disabled = true;
    }
  };


  /**
   * Handle form input
   */
  var onFormInput = function () {
    window.card.hide();
    window.map.showFilteredPins();
  };


  var filter = function (offersData) {
    // Run throught all offers
    var filteredOffers = offersData.filter(function (offerData) {
      // Run an offer through all filter functions
      return filterFunctions.reduce(function (state, filterFunction) {
        state = state && filterFunction(offerData);
        return state;
      }, true);
    });

    return filteredOffers;
  };


  /**
   * Filter offer type
   * @param {Array} offerData
   * @return {boolean}
   */
  var filterType = function (offerData) {
    if (filtersForm.elements[TYPE_FILTER].value === 'any') {
      return true;
    }
    return offerData.offer.type === filtersForm.elements[TYPE_FILTER].value;
  };
  filterFunctions.push(filterType);


  /**
   * Filter offer price
   * @param {Array} offerData
   * @return {boolean}
   */
  var filterPrice = function (offerData) {
    var priceValue = filtersForm.elements[PRICE_FILTER].value;
    switch (priceValue) {
      case 'low':
        return offerData.offer.price < LOW_PRICE;

      case 'middle':
        if (offerData.offer.price >= LOW_PRICE && offerData.offer.price <= HIGH_PRICE) {
          return true;
        } else {
          return false;
        }

      case 'high':
        return offerData.offer.price > HIGH_PRICE;

      default:
        return true;
    }
  };
  filterFunctions.push(filterPrice);


  /**
   * Filter offer rooms count
   * @param {Array} offerData
   * @return {boolean}
   */
  var filterRooms = function (offerData) {
    if (filtersForm.elements[ROOMS_FILTER].value === 'any') {
      return true;
    }
    return offerData.offer.rooms === parseInt(filtersForm.elements[ROOMS_FILTER].value, 10);
  };
  filterFunctions.push(filterRooms);


  /**
   * Filter offer features
   * @param {Array} offerData
   * @return {boolean}
   */
  var filterFeatures = function (offerData) {
    var state = true;

    var featuresFilters = filtersForm.elements[FEATURES_FILTER].elements;
    for (var i = 0; i < featuresFilters.length; i++) {
      var isFilterChecked = featuresFilters[i].checked;
      var filterValue = featuresFilters[i].value;
      if (isFilterChecked && offerData.offer.features.indexOf(filterValue) < 0) {
        state = false;
      }
    }

    return state;
  };
  filterFunctions.push(filterFeatures);


  /**
   * Filter offer guests count
   * @param {Array} offerData
   * @return {boolean}
   */
  var filterGuests = function (offerData) {
    if (filtersForm.elements[GUESTS_FILTER].value === 'any') {
      return true;
    }
    return offerData.offer.guests === parseInt(filtersForm.elements[GUESTS_FILTER].value, 10);
  };
  filterFunctions.push(filterGuests);


  filtersForm.addEventListener('input', onFormInput);

  window.filter = {
    activate: activate,
    reset: reset,
    filter: filter
  };

})();
