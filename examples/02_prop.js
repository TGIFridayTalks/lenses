const { lens } = require('lorgnette');

let age = lens.prop('age'); // create lens to access property age

age.get({name: 'John'}) // returns Nothing

age.get({name: 'John', age: 42}) // returns Just(42)

age.set({name: 'John', age: 42}, 24) // returns {name: 'John', age: 24}

age.update({name: 'John', age: 42}, x => x + 1) // returns {name: 'John', age: 43}
