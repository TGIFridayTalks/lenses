'use strict';

var _require = require('lorgnette');

var nothing = _require.nothing;
var just = _require.just;


just('value').getOr('anotherValue'); // returns 'value'
nothing.getOr('anotherValue'); // returns 'anotherValue'

function appendBang(s) {
  return just(s + '!');
}

nothing.then(appendBang); // returns Nothing
just('value').then(appendBang); // returns Just('value!')
just('value').then(function () {
  return nothing;
}); // returns Nothing

nothing.recover(function () {
  return 42;
}); // returns Just(42)
just('value').recover(function () {
  return 42;
}); // returns just('value')