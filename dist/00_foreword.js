'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('lorgnette');

var lens = _require.lens;

var _require2 = require('lorgnette/dist/lens');

var registerChainable = _require2.registerChainable;

var _require3 = require('./find');

var ArrayFindLens = _require3.ArrayFindLens;


registerChainable('find', function (criteria) {
  return new ArrayFindLens(criteria);
});

var people = [{
  name: 'Vasya Pupkin'
}, {
  name: 'Bill Gates',
  addresses: {
    'Main Office': '500 Fifth Avenue North Seattle, WA 98109',
    'East Coast Office': 'Washington, D.C. 1300 I (Eye) St NW',
    'Europe and Middle East Office': '62 Buckingham Gate London SW1E 6AJ',
    'China Office': '1901 Tower B, Ping An International Financial Center'
  }
}];

function changeAddress(people, name, addressType, address) {
  var newPerson = people.find(function (p) {
    return p.name === name;
  });
  var newAddresses = void 0;

  if (newPerson.addresses) {
    newAddresses = _extends({}, newPerson.addresses, _defineProperty({}, addressType, address));
  } else {
    newAddresses = _defineProperty({}, addressType, address);
  }

  newPerson = _extends({}, newPerson, { addresses: newAddresses });
  var newPeople = people.filter(function (p) {
    return p.name !== name;
  });
  return [].concat(_toConsumableArray(newPeople), [newPerson]);
}

// Bow Down before Mighty Lenses!
function changeAddress2(people, name, addressType, address) {
  return lens.find(function (p) {
    return p.name == name;
  }).prop('addresses', {}).prop(addressType).set(people, address);
}

// Find Lens Test
console.log(lens.find(function (p) {
  return p.name == 'Vasya Pupkin';
}).get(people).getOr());
console.log("\n", "=============", "\n");

// Test
console.log(people);
console.log("\n", "-------------", "\n");
console.log(changeAddress(people, 'Vasya Pupkin', 'Home', 'Glinki, 5'));
console.log("\n", "-------------", "\n");
console.log(changeAddress(people, 'Bill Gates', 'Main Office', 'Вулиця Шолом-Алейхема, 4/26, Дніпропетровськ, Дніпропетровська область, 49000'));

console.log("\n", "=============", "\n");
console.log("Bow Down before Mighty Lenses!");
console.log("\n", "=============", "\n");

console.log(changeAddress2(people, 'Vasya Pupkin', 'Home', 'Glinki, 5'));
console.log("\n", "-------------", "\n");
console.log(changeAddress2(people, 'Bill Gates', 'Main Office', 'Вулиця Шолом-Алейхема, 4/26, Дніпропетровськ, Дніпропетровська область, 49000'));