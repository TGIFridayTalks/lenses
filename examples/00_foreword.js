const { lens } = require('lorgnette');
const { registerChainable } = require('lorgnette/dist/lens');
const { ArrayFindLens } = require('./find');

registerChainable('find', (criteria) => new ArrayFindLens(criteria));

const people = [
  {
    name: 'Vasya Pupkin'
  },
  {
    name: 'Bill Gates',
    addresses: {
      'Main Office': '500 Fifth Avenue North Seattle, WA 98109',
      'East Coast Office': 'Washington, D.C. 1300 I (Eye) St NW',
      'Europe and Middle East Office': '62 Buckingham Gate London SW1E 6AJ',
      'China Office': '1901 Tower B, Ping An International Financial Center'
    }
  }
];

function changeAddress(people, name, addressType, address) {
  let newPerson = people.find(p => p.name === name);
  let newAddresses;

  if (newPerson.addresses) {
    newAddresses = {...newPerson.addresses, [addressType]: address}
  } else {
    newAddresses = {[addressType]: address}
  }

  newPerson = {...newPerson, addresses: newAddresses }
  let newPeople = people.filter(p => p.name !== name);
  return [...newPeople, newPerson];
}

// Bow Down before Mighty Lenses!
function changeAddress2(people, name, addressType, address) {
  return lens
    .find(p => p.name == name)
    .prop('addresses', {})
    .prop(addressType)
    .set(people, address);
}

// Find Lens Test
console.log(lens.find(p => p.name == 'Vasya Pupkin').get(people).getOr())
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
