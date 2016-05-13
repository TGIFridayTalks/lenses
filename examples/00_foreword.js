const { lens } = require('lorgnette');
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
  let newPerson = people.filter(p => p.name === name);
  let newAddresses;

  if (newPerson.addresses) {
    newAddresses = {...newPerson.addresses, [addressType]: address}
  } else {
    newAddresses = {[addressType]: address}
  }

  newPerson.addresses = newAddresses;
  let newPeople = people.filter(p => p.name !== name);
  return [newPeople, newPerson];
}

function changeAddress2(people, name, addressType, address) {
  const addressLens = lens.byName(name).prop('addresses').prop(addressType)
  return addressLens.set(people, address);
}
