'use strict';

// Title input
var titleInput = document.querySelector('.ad-form input[name="title"]');
console.log(titleInput);

// Address input
var addressInput = document.querySelector('.ad-form input[name="address"]');
addressInput.readOnly = true;

// Type select
var typeSelect = document.querySelector('.ad-form select[name="type"]');
console.log(typeSelect);

// Check-in / Check-out selects
var checkInSelect = document.querySelector('.ad-form select[name="timein"]');
var checkOutSelect = document.querySelector('.ad-form select[name="timeout"]');
console.log(checkInSelect);
console.log(checkOutSelect);

// Rooms and capacity selects
var roomsSelect = document.querySelector('.ad-form select[name="rooms"]');
var capacitySelect = document.querySelector('.ad-form select[name="capacity"]');
console.log(roomsSelect);
console.log(capacitySelect);
