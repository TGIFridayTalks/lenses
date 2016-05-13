const {nothing, just} = require('lorgnette');

just('value').getOr('anotherValue');     // returns 'value'
nothing.getOr('anotherValue');           // returns 'anotherValue'

function appendBang(s) {
  return just(s + '!');
}

nothing.then(appendBang);                // returns Nothing
just('value').then(appendBang);          // returns Just('value!')
just('value').then(() => nothing);      // returns Nothing

nothing.recover(() => 42);               // returns Just(42)
just('value').recover(() => 42);         // returns just('value')
