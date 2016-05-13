'use strict';

var _require = require('lorgnette');

var lens = _require.lens;


var age = lens.prop('age', 18); // create lens to access property age

age.get({ name: 'John' }); // returns Just(18)

age.get({ name: 'John', age: 42 }); // returns Just(42)