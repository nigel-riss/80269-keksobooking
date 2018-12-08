'use strict';

var TIME_TO_PRICE_MAP = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

//
// Title input validation
//
var titleInput = document.querySelector('.ad-form input[name="title"]');

/**
 * Handle invalid event for title input
 * @param {Event} evt
 */
var onTitleInputInvalid = function (evt) {
  var target = evt.target;
  if (target.validity.tooShort) {
    target.setCustomValidity('Минимальная длина — 30 символов');
  } else if (target.validity.tooLong) {
    target.setCustomValidity('Максимальная длина — 100 символов');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Необходимо ввести заголовок объявления');
  } else {
    target.setCustomValidity('');
  }
};

/**
 * Handle input for title input
 * @param {InputEvent} evt
 */
var onTitleInputInput = function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Минимальная длина — 30 символов. (Введено '
      + target.value.length + ' символов');
  } else {
    target.setCustomValidity('');
  }
};

titleInput.addEventListener('invalid', onTitleInputInvalid);
titleInput.addEventListener('input', onTitleInputInput);


//
// Address input validation
//
var addressInput = document.querySelector('.ad-form input[name="address"]');
addressInput.readOnly = true;


//
// Type select and price input validation
//
var typeSelect = document.querySelector('.ad-form select[name="type"]');
var priceInput = document.querySelector('.ad-form input[name="price"]');

/**
 * Setup price input min and placeholder according to (type select) value
 * @param {string} type
 */
var setupPriceInput = function (type) {
  priceInput.min = TIME_TO_PRICE_MAP[type];
  priceInput.placeholder = TIME_TO_PRICE_MAP[type];
};

/**
 * Handle input for type select
 */
typeSelect.addEventListener('input', function (evt) {
  var target = evt.target;
  setupPriceInput(target.value);
});

// Setting up price input initial state
var selectedTypeOption = typeSelect.querySelector('option[selected]');
setupPriceInput(selectedTypeOption.value);

/**
 * Handle invalid and input events for price input
 * @param {Event} evt
 */
var onPriceInputInput = function (evt) {
  var target = evt.target;
  if (target.validity.rangeUnderflow) {
    target.setCustomValidity('Минимальная цена — ' + target.min + ' рублей');
  } else if (target.validity.rangeOverflow) {
    target.setCustomValidity('Максимальная цена — ' + target.max + ' рублей');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Необходимо ввести цену');
  } else {
    target.setCustomValidity('');
  }
};

priceInput.addEventListener('invalid', onPriceInputInput);
priceInput.addEventListener('input', onPriceInputInput);


//
// Check-in / Check-out selects
//
var checkInSelect = document.querySelector('.ad-form select[name="timein"]');
var checkOutSelect = document.querySelector('.ad-form select[name="timeout"]');

/**
 * Set (sync) time inputs
 * @param {*} index Index of option to set
 */
var setTimeInputs = function (index) {
  checkInSelect.options.selectedIndex = index;
  checkOutSelect.options.selectedIndex = index;
};

/**
 * Listen to check-in select input
 */
checkInSelect.addEventListener('input', function (evt) {
  var index = evt.target.options.selectedIndex;
  setTimeInputs(index);
});

/**
 * Listen to check-out select input
 */
checkOutSelect.addEventListener('input', function (evt) {
  var index = evt.target.options.selectedIndex;
  setTimeInputs(index);
});

// Setting initial time imputs values
setTimeInputs(0);

//
// Rooms and capacity selects
//
var roomsSelect = document.querySelector('.ad-form select[name="rooms"]');
var capacitySelect = document.querySelector('.ad-form select[name="capacity"]');

/**
 * Listen to rooms select input
 */
roomsSelect.addEventListener('input', function (evt) {
  checkCapacityValidity(evt.target.value, capacitySelect.value);
});

/**
 * Listen to capacity select input
 */
capacitySelect.addEventListener('input', function (evt) {
  checkCapacityValidity(+roomsSelect.value, +evt.target.value);
});

/**
 * Checks if rooms and guests quantities are adequate
 * @param {number} rooms Number of rooms
 * @param {number} guests Number of guests
 */
var checkCapacityValidity = function (rooms, guests) {
  switch (rooms) {
    case 1:
    case 2:
    case 3:
      if (rooms < guests && guests !== 0) {
        capacitySelect.setCustomValidity('Вы не можете поселить ' + guests + ' гостей в ' + rooms + ' комнат');
      } else if (guests === 0) {
        capacitySelect.setCustomValidity('Вы должны поселить до ' + rooms + ' гостей');
      } else {
        capacitySelect.setCustomValidity('');
      }
      break;

    case 100:
      if (guests !== 0) {
        capacitySelect.setCustomValidity('Выберите пункт "Не для гостей" для 100 комнат');
      } else {
        capacitySelect.setCustomValidity('');
      }
      break;

    default:
      break;
  }
};

// Setting initial validity for capacity select
checkCapacityValidity(roomsSelect.value, capacitySelect.value);
