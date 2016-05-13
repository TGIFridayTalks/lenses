const { lens } = require('lorgnette');

let lastCartItem = lens.prop('items', []).last();

let cart = {
  items: [
    'potato',
    'cheese'
  ]
};

lastCartItem.get(cart) // returns Just('cheese')
lastCartItem.set(cart, 'carrot') // returns { items: ['potato', 'cheese', 'carrot'] }
