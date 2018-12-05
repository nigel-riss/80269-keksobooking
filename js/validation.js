'use strict';

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
  switch (type) {
    case 'bungalo':
      priceInput.min = '0';
      priceInput.placeholder = '0';
      break;

    case 'flat':
      priceInput.min = '1000';
      priceInput.placeholder = '1000';
      break;

    case 'house':
      priceInput.min = '5000';
      priceInput.placeholder = '5000';
      break;

    case 'palace':
      priceInput.min = '10000';
      priceInput.placeholder = '10000';
      break;

    default:
      break;
  }
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
console.log(roomsSelect);
console.log(capacitySelect);
